const { create } = require("ipfs-http-client");

async function ipfsClient(){
    const ipfs= await create()(
        {
            host:"ipfs.infura.io",
            port:5001,
            protocol:"https"
        }
    );
    return ipfs
}

async function saveText(){
    let ipfs= await ipfsClient();
    let result=await ipfs.add("hello") //pass what data to be passed in the ipfs node

    console.log(result);

}
saveText();