'use strict';

const { Wallets, InMemoryWallet } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, enrollAdmin } = require('./utils/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const adminUserId = 'admin';
const adminUserPasswd = 'adminpw';

async function registerUser (caClient, wallet, orgMspId, userId, affiliation){
try {
  // Check to see if we've already enrolled the user
  const userIdentity = await wallet.get(userId);
  if (userIdentity) {
    console.log(`An identity for the user ${userId} already exists in the wallet`);
    return;
  }

  // Must use an admin to register a new user
  const adminIdentity = await wallet.get(adminUserId);
  if (!adminIdentity) {
    console.log('An identity for the admin user does not exist in the wallet');
    console.log('Enroll the admin user before retrying');
    return;
  }

  // build a user object for authenticating with the CA
  const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
  const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

  // Register the user, enroll the user, and import the new identity into the wallet.
  // if affiliation is specified by client, the affiliation value must be configured in CA
  const secret = await caClient.register({
    affiliation: affiliation,
    enrollmentID: userId,
    role: 'client'
  }, adminUser);
  const enrollment = await caClient.enroll({
    enrollmentID: userId,
    enrollmentSecret: secret
  });
  const x509Identity = {
    credentials: {
      certificate: enrollment.certificate,
      privateKey: enrollment.key.toBytes(),
    },
    mspId: orgMspId,
    type: 'X.509',
  };
  await wallet.put(userId, x509Identity);
  console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
} catch (error) {
  console.error(`Failed to register user : ${error}`);
}
}
const registerUserApi = async (req, res) => {
  const userID  = req.body.UUID;
  const userName = req.body.name;
  // Example usage
  const ccp = buildCCPOrg1();
  const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  // Register a new patient
  // const patientID = 'patient2'; // Replace with actual patient ID
  try{
  await registerUser(caClient, wallet, mspOrg1, userID, 'org1.department1');
  res.json({ message: 'User enrolled successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to enroll user' + userName });
  }


  // Register a new doctor
  // const doctorID = 'doctor1'; // Replace with actual doctor ID
  // await registerUser(caClient, wallet, mspOrg1, doctorID, 'org1.department2');
}

//main();
module.exports = {registerUserApi};
