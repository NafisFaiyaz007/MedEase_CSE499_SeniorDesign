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
           await enrollHospitalAdmin(caClient, wallet, mspOrg1, hospitalUUID, 'hospitaladmin');
           console.log('Hospital enrolled successfully');
       } else {
           console.log('Hospital identity already exists in the wallet');
       }

    //    return ('Hospital enrolled successfully');
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

const enrollHospitalAdmin = async (caClient, wallet, orgMspId, hospitalUUID, role) => {
	try {
        // Check if the role is 'superadmin' or 'hospitaladmin'
        if (role !== 'superadmin' && role !== 'hospitaladmin') {
            throw new Error('Invalid admin role specified');
        }

        // Check if the user is already enrolled
        const identity = await wallet.get(hospitalUUID);
        if (identity) {
            console.log('An identity for the admin already exists in the wallet');
            return;
        }

        // Enroll admin based on the specified role
        const enrollment = await caClient.enroll({
            enrollmentID: `admin`,
            enrollmentSecret: 'adminpw',
            role: role, // Pass the role to the CA server during enrollment
        });

        // Create a new identity
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: 'X.509',
        };

        // Import the new identity into the wallet
        await wallet.put(hospitalUUID, x509Identity);
        console.log('Successfully enrolled hospital admin');

    } catch (error) {
        console.error(`Failed to enroll hospital admin: ${error}`);
        throw error;
    }
};
// Call the main function
module.exports = {registerHospital};