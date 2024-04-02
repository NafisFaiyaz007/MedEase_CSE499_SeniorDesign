'use strict';
const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./utils/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');

const registerHospital = async (hospitalUUID) => {
    try {
        // Build an in-memory object with the network configuration (also known as a connection profile)
        const ccp = buildCCPOrg1();

        // Build an instance of the fabric CA services client based on
        // the information in the network configuration
        let caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com'); //'ca-super-admin.org1.example.com');

        // Setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(Wallets, walletPath);

       // Check if super admin identity already exists in the wallet
       const superAdminIdentity = await wallet.get(hospitalUUID);
       if (!superAdminIdentity) {
           // Enroll super admin
           caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
           //-hospital-admin.org1.example.com');
           await enrollAdmin(caClient, wallet, mspOrg1, 'hospitaladmin');
           console.log('Hospital enrolled successfully');
       } else {
           console.log('Hospital identity already exists in the wallet');
       }

       return ('Hospital enrolled successfully');
       // Check if hospital admin identity already exists in the wallet
    //    const hospitalAdminIdentity = await wallet.get(hospitalAdminID);
    //    if (!hospitalAdminIdentity) {
    //        // Enroll hospital admin
    //        await enrollAdmin(caClient, wallet, mspOrg1, hospitalAdminRole);
    //        console.log('Hospital admin enrolled successfully');
    //    } else {
    //        console.log('Hospital admin identity already exists in the wallet');
    //    }

   } catch (error) {
       console.error(`Error in main: ${error}`);
       console.error("Error stack trace:", error.stack);
       return { error: 'Failed to enroll admin' };
   }
}
// Call the main function
//main();
module.exports = {registerHospital};