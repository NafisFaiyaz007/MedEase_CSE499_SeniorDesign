const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./utils/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');
const crypto = require('crypto');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';


const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'doctor1';

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}
// async function createNode() {
//     const { createHelia } = await import('helia');
//     const { unixfs } = await import('@helia/unixfs');
//     const helia = await createHelia();
//     const fs = unixfs(helia);
//     return fs;
// }
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


const doctorUploadFile = async (req, res) => {
    const ownerID = req.body.patientUUID;
    const uploader = req.session.user.UUID;//req.body.UUID
    const fileName = req.file.originalname;

    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        //const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: uploader,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        let cid = "";
        try {
            try {
                const fs = await createNode();
                const data = req.file.buffer;
                cid = await fs.addBytes(data);
                res.status(201).send('Your file has been uploaded');
            }
            catch (e) {
                console.log(e);
                res.status(500).send('An error occurred while uploading the file');

            }
            let fileHash = cid;
            console.log('\n--> Submit Transaction: DoctorCreateRecord, creates new asset with ID, name, hash, ownerID, date, doctorID arguments');
            result = await contract.submitTransaction('DoctorCreateRecord', fileName, fileHash, ownerID, new Date().toISOString(), uploader);
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

const doctorGetSingleFile = async (req, res) => {
    const id = req.body.fileID;
    // const ownerID = req.body.patientUUID;
    const viewer = req.session.user.UUID;
    console.log("viewer: "+ viewer);
    console.log("fileID: "+ id);
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: viewer,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        try {
            result = await contract.evaluateTransaction('DoctorReadDocument', id, viewer);
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            //const cid = req.body.fileHash;
            const cid = JSON.parse(result.toString()).fileHash;
            // console.log(cid)

            // if (!cid) {
            //     res.status(404).send('File not found');
            //     return;
            // }
            if (!cid) {
                res.status(404).send('File not found');
                return;
            }

            const fs = await createNode();
            let data = [];
            const decoder = new TextDecoder();
            let text = "";

            try {
            //     for await (const chunk of fs.cat(cid)) {
            //         // text += decoder.decode(chunk, { stream: true });
            //         data.push(chunk);
            //     }
            //     const buffer = Buffer.concat(data);

            //     console.log(buffer)
            //     res.status(200).send(buffer);
            // } catch (error) {
            //     console.log(`Error retrieving data for CID "${cid}":`, error);
            //     res.status(500).send("Error retrieving data");
            // }
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
        catch (error){
            // res.status(500).json({ error: 'File does not exist' });
            // console.error("Error::: ", error.message)
            res.status(500).send({ error: error.message });            
            // res.status(500).send('An error occurred while retrieving the file');

        }
    }
    finally {
        gateway.disconnect();
    }
}

const doctorGetAllFiles = async (req, res) => {
    const ownerID = req.body.patientUUID;
    const viewer = req.session.user.UUID//req.body.UUID;
    console.log(req.body)
    // console.log(viewer)
    const gateway = new Gateway();
    try {
        const ccp = buildCCPOrg1();
        const wallet = await buildWallet(Wallets, walletPath);

        await gateway.connect(ccp, {
            wallet,
            identity: viewer,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('\n--> Evaluate Transaction: DoctorViewDoumentList, function returns all the current assets of specific owner on the ledger');
        result = await contract.evaluateTransaction('DoctorViewDoumentList', ownerID);
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
        res.send(result);
    } catch {
        res.status(500).json({ error: 'Cannot retrieve all files' });
    } finally {
        gateway.disconnect();
    }
}

module.exports = { doctorUploadFile, doctorGetAllFiles, doctorGetSingleFile };
// ./network.sh deployCC -ccn basic -ccp mychaincode -ccl javascript