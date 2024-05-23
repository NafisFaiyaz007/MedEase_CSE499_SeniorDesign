const registerUser = require('../fabric/registerUser');
//Function to enroll doctor/patient manually

const uuid = '' ;//'6afaa917-d1b3-4869-a6ba-15dfbad762af';
const name = '';//"Dr Mizanur Rahman";
const adminUUID =''; //"2a273dfe-f23b-4379-a849-bfbe2621a6ab";
async function main(){
await registerUser.registerUserFunction(uuid, name, adminUUID);
}
main()
