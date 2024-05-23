const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./utils/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');
const crypto = require('crypto');
const connection = require('../db');


const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

let hashMap = new Map();

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'doctor1';

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}
const init = async (req, res) => {
    const ownerID = req.body.UUID;
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        await contract.submitTransaction('InitLedger');

        res.send("Submitted");
    } catch {
        res.status(500).json({ error: 'Cannot retrieve all files' });
    } finally {
        gateway.disconnect();
    }
}
async function createNode() {
    try {
        const { createHelia } = await import('helia');
        const { unixfs } = await import('@helia/unixfs');
        const { FsBlockstore } = await import("blockstore-fs");

        const blockstore = new FsBlockstore("../files");
        const heliaPromise = createHelia({ blockstore });

        return unixfs(await heliaPromise);
    } catch (error) {
        console.error("Error creating node:", error);
        throw error; // Rethrow the error or handle it accordingly
    }
}


const uploadFile = async (req, res) => {
    const ownerID = req.session.user.UUID;
    //console.log( "Filename;; == "+req.file.originalname)
    const fileName = req.file.originalname;
    // const type = req.body.fileType;
    // const size = req.body.fileSize;
    const accessList = req.body.accessList//req.body.doctorList;

    console.log(req.body.accessList)


    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        //const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
        const wallet = await buildWallet(Wallets, walletPath);
        try {
            await gateway.connect(ccp, {
                wallet,
                identity: ownerID,
                discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
            });
        } catch (e) {
            res.status(500).json({ error: 'You are not registered in the blockchain' });
            return
        }
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        let cid = "";
        try {
            try {
                // Create the node
                const fs = await createNode();
                const data = req.file.buffer;
                const key = crypto.createHash('sha256').update(ownerID).digest();
                const iv = Buffer.alloc(16, 0);
                const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        
                let encrypted = cipher.update(data);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                const encryptedContent = Buffer.concat([iv, encrypted]);


                //console.log(req.file)
                // Add content to IPFS
                // const bytes = Buffer.from(encrypted, "utf-8");
                cid = await fs.addFile({ path: req.file.originalname, content: encryptedContent,
                    mimeType: 'application/octet-stream' })
                console.log(cid);

                // res.json({ cid: cid.toString() });
                // res.status(201).send('Your file has been uploaded');
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: 'An error occurred while uploading the file' });
                return;
            }
            let fileHash = cid;
            console.log('\n--> Submit Transaction: CreateRecord, creates new asset with ID, name, hash, type, size, ownerID, and accessList[] arguments');
            result = await contract.submitTransaction('CreateRecord', fileName, fileHash, ownerID, new Date().toISOString(), accessList);
            console.log('*** Result: committed');
            if (`${result}` !== '') {
                console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            }
            res.status(201).json({ message: 'Your file has been uploaded to ledger' });
            return;
        }
        catch (e) {
            console.log("asset already exists");
            console.log(e);
            // res.status(500).send('An error occurred while uploading the file');
        }
    } finally {
        // Disconnect from the gateway when the application is closing
        // This will close all connections to the network
        gateway.disconnect();
        return;
    }
}

const getSingleFile = async (req, res) => {
    const id = req.body.fileID;
    const ownerID = req.session.user.UUID//req.body.patientUUID;
    console.log(req.body)
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        try {
            console.log('\n--> Evaluate Transaction: ReadDocument, function returns an asset with a given assetID: ' + id);
            result = await contract.evaluateTransaction('ReadDocument', id);
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            //res.send(result);
            //const filename = req.body.filename;
            const cid = JSON.parse(result.toString()).fileHash;
            //result.fileHash;
            // console.log("filehash == "+ cid)

            if (!cid) {
                res.status(404).send('File not found');
                return;
            }

            const fs = await createNode();
            let data = [];
            const decoder = new TextDecoder();
            let text = "";

            try {
                for await (const chunk of fs.cat(cid)) {
                    // text += decoder.decode(chunk, { stream: true });
                    console.log('Received chunk of data');

                    data.push(chunk);
                }
                // fs.close()
                console.log('All chunks received, processing data...');

                // const buffer = Buffer.concat(data);
                const encryptedContent = Buffer.concat(data);
                const iv = encryptedContent.slice(0, 16);
                const encryptedData = encryptedContent.slice(16);
            
                console.log('Starting decryption...');

                const key = crypto.createHash('sha256').update(ownerID).digest();
                const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
                let decrypted = decipher.update(encryptedData);
                decrypted = Buffer.concat([decrypted, decipher.final()]);
            
                console.log('Decryption complete, sending data...');

                // Set response content type to octet-stream
                res.set('Content-Type', 'application/octet-stream');
                res.send(decrypted); 
                return;
            } catch (error) {
                console.error('Error processing data:', error);
                console.log(`Error retrieving data for CID "${cid}":`, error);
                res.status(500).send("Error retrieving data");
            }
            // finally {
            //     // Ensure all streams are closed, even if an error occurred
            //     await  fs.close(); // Assuming 'fs' has a close method relevant to how you opened it
            // }
        }
        catch {
            //res.status(500).json({ error: 'File does not exist' });
            res.status(500).send('An error occurred while retrieving the file');

        }
    } finally {
        gateway.disconnect();
        console.log("disconnecting")
        return;
    }
}

const getAllDocuments = async (req, res) => {
    const id = req.body.fileID;
    const fileName = req.body.fileName;
    const fileHash = req.body.fileHash;
    const ownerID = req.session.user.UUID//req.body.UUID;
    // const type = req.body.type;
    // const size = req.body.size;
    const accessList = req.body.doctorList;

    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('\n--> Evaluate Transaction: GetAllDocuments, function returns all the current assets on the ledger');
        result = await contract.evaluateTransaction('GetAllDocuments');
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        res.send(result);
    } catch {
        res.status(500).json({ error: 'Cannot retrieve files' });
    } finally {
        gateway.disconnect();
    }
}
const deleteFile = async (req, res) => {
    const id = req.body.fileID;
    const ownerID = req.session.user.UUID;

    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);


        try {
            console.log('\n--> Submit Transaction: DeleteFile');
            await contract.submitTransaction('DeleteRecord', id);
            console.log('*** Result: committed');
            res.send("File deleted");
        }
        catch (error) {
            console.log("Failed to delete file");
            res.status(500).json({ error: 'Failed to delete file' });
        }
    } finally {
        // Disconnect from the gateway when the application is closing
        // This will close all connections to the network
        gateway.disconnect();
    }
}
const getAllFiles = async (req, res) => {
    const ownerID = req.session.user.UUID;
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('\n--> Evaluate Transaction: getRecordsByOwner, function returns all the current assets of specific ownernon the ledger');
        result = await contract.evaluateTransaction('getRecordsByOwner', ownerID);
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        res.send(result);
    } catch {
        res.status(500).json({ error: 'You are not registered in the blockchain' });
    } finally {
        gateway.disconnect();
    }
}

const grantPermission = async (req, res) => {
    const id = req.body.fileID;
    const ownerID = req.session.user.UUID;
    const grantTo = req.body.doctorUUID;
    const doctorID = req.body.doctorID;
    const fileName = req.body.fileName;
    const ownerName = req.session.user.name;
    console.log(req.body)

    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true }
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        try {
            console.log('\n--> Submit Transaction: grantPermission');
            await contract.submitTransaction('grantPermission', id, grantTo);
            console.log('*** Result: committed');
            const message = `${ownerName} has shared file ${fileName} with you`;
            connection.execute("INSERT INTO `Notifications`(`user_id`, `message`, `is_read`, `created_at`) VALUES (?, ?, FALSE, NOW())", [doctorID, message]);
            res.json("Access Granted to Doctor");
        } catch (error) {
            console.error("Grant failed:", error);
            if (error.message.includes("already has permission")) {
                res.status(500).json({ error: 'Doctor already has permission to view the record' });
            } else {
                res.status(500).json({ error: 'Grant failed' });
            }
        }
    } catch (error) {
        console.error("Error in grantPermission:", error);
        res.status(500).json({ error: 'Grant failed' });
    } finally {
        gateway.disconnect();
    }
}

const revokePermission = async (req, res) => {
    const id = req.body.fileID;
    const ownerID = req.session.user.UUID;
    const revokeDoctor = req.body.doctorUUID;
console.log(revokeDoctor)
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        try {
            console.log('\n--> Submit Transaction: revokePermission');
            await contract.submitTransaction('revokePermission', id, revokeDoctor);
            console.log('*** Result: committed');
            res.json("Access removed");
        }
        catch (error) {
            console.error("Grant failed:", error);
            if (error.message.includes("The doctor did not have permission to view record")) {
                res.status(400).json({ error: 'The doctor did not have permission to view record' });
            } else {
                res.status(500).json({ error: 'Grant failed' });
            }
        }
    } catch (error) {
        console.log("Revoke failed");
        res.status(500).json({ error: 'Revoke Failed' });
    }
    finally {
        // Disconnect from the gateway when the application is closing
        // This will close all connections to the network
        gateway.disconnect();
    }
}
const isRegistered = async (req, res) => {
    const ownerID = req.session.user.UUID;

    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        //const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
        const wallet = await buildWallet(Wallets, walletPath);
        try {
            await gateway.connect(ccp, {
                wallet,
                identity: ownerID,
                discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
            });
            res.send(true);
        } catch (e) {
            // res.status(500).json({ error: 'You are not registered in the blockchain' });
            res.status(500).json({error: false});
        }
    } finally {
        gateway.disconnect();
    }
}
const downloadFile = async (req, res) => {
    const id = req.body.fileID;
    console.log(id)
    const ownerID = req.session.user.UUID; // or req.body.patientUUID;
    const gateway = new Gateway();

    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, { wallet, identity: ownerID, discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('\n--> Evaluate Transaction: ReadDocument, function returns an asset with a given assetID: ' + id);
        const result = await contract.evaluateTransaction('ReadDocument', id);
        const cid = JSON.parse(result.toString()).fileHash;

        if (!cid) {
            res.status(404).send('File not found');
            return;
        }

        const fs = await createNode();
        let data = [];
        try {
            for await (const chunk of fs.cat(cid)) {
                data.push(chunk);
            }
            const encryptedContent = Buffer.concat(data);
            const iv = encryptedContent.slice(0, 16);
            const encryptedData = encryptedContent.slice(16);
            const key = crypto.createHash('sha256').update(ownerID).digest();
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(encryptedData);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            const filename = 'downloaded-file'; // You could use a dynamic name based on the request or file metadata

            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send(decrypted);
        } catch (error) {
            console.error('Error processing data:', error);
            res.status(500).send("Error retrieving data");
        }
    } finally {
        gateway.disconnect();
        return;
    }
}

module.exports = { init, uploadFile, getSingleFile, deleteFile, getAllFiles, getAllDocuments, grantPermission, revokePermission , isRegistered, downloadFile};
// ./network.sh deployCC -ccn basic -ccp mychaincode -ccl javascript