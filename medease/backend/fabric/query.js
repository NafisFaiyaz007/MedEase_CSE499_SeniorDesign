const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./utils/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');
const crypto = require('crypto');

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
        res.status(500).json({ error: 'Cannot retrieve all fiels' });
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

        await gateway.connect(ccp, {
            wallet,
            identity: ownerID,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        let cid = "";
        try {
            try {
                // Create the node
                const fs = await createNode();
                const data = req.file.buffer;
                //console.log(req.file)
                // Add content to IPFS
                const bytes = Buffer.from(data, "utf-8");
                cid = await fs.addFile({path: req.file.originalname, content: bytes})
                console.log(cid);

                // res.json({ cid: cid.toString() });
                // res.status(201).send('Your file has been uploaded');
            }
            catch(e){
                console.log(e);
                res.status(500).send('An error occurred while uploading the file');
                return;
            }
            let fileHash = cid;
            console.log('\n--> Submit Transaction: CreateRecord, creates new asset with ID, name, hash, type, size, ownerID, and accessList[] arguments');
            result = await contract.submitTransaction('CreateRecord', fileName, fileHash, ownerID, new Date().toISOString(), accessList);
            console.log('*** Result: committed');
            if (`${result}` !== '') {
                console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            }
            res.status(201).send('Your file has been uploaded to ledger');
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
    }
}

const getSingleFile = async (req, res) => {
    const id = req.body.fileID;
    const ownerID = req.body.patientUUID;
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
                data.push(chunk);
              }
              const buffer = Buffer.concat(data);

              res.send(buffer);
            } catch (error) {
              console.log(`Error retrieving data for CID "${cid}":`, error);
              res.status(500).send("Error retrieving data");
            }
          }
        catch {
            //res.status(500).json({ error: 'File does not exist' });
            res.status(500).send('An error occurred while retrieving the file');

        }
    } finally {
        gateway.disconnect();
    }
}

const getAllDocuments = async (req, res) => {
    const id = req.body.fileID;
    const fileName = req.body.fileName;
    const fileHash = req.body.fileHash;
    const ownerID = req.body.UUID;
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
        res.status(500).json({ error: 'Cannot retrieve all fiels' });
    } finally {
        gateway.disconnect();
    }
}

const grantPermission = async (req, res) => {
    const id = req.body.fileID;
    const ownerID = req.session.user.UUID;
    const grantTo = req.body.doctorUUID;
    
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
            res.json("Access Granted to Doctor");
        } catch (error) {
            console.error("Grant failed:", error);
            if (error.message.includes("already has permission")) {
                res.status(400).json({ error: 'Doctor already has permission to view the record' });
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
module.exports = { init, uploadFile, getSingleFile, deleteFile, getAllFiles, getAllDocuments, grantPermission, revokePermission };
// ./network.sh deployCC -ccn basic -ccp mychaincode -ccl javascript