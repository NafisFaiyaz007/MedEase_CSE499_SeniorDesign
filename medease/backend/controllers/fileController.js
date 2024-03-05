let hashMap = new Map();
//Next week: what features will be implemented?
async function createNode() {
  const { createHelia } = await import('helia');
  const { unixfs } = await import('@helia/unixfs');
  const helia = await createHelia();
  const fs = unixfs(helia);
  return fs;
}

const uploadFile = async (req, res) => {
    try {
        const fs = await createNode();
        const data = req.file.buffer;
        const cid = await fs.addBytes(data);
        hashMap.set(req.file.originalname, cid);
        res.status(201).send('Your file has been uploaded');
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading the file');
      }
};


const getFile = async (req, res) => {
    try {
      const filename = req.body.filename;
      // const cid = hashMap.get(filename);
      const cid = req.body.fileHash;
  
      if (!cid) {
        res.status(404).send('File not found');
        return;
      }
  
      const fs = await createNode();
      const decoder = new TextDecoder();
      let text = '';
  
      for await (const chunks of fs.cat(cid)) {
        text += decoder.decode(chunks, { stream: true });
      }
  
      res.status(200).send(text);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while retrieving the file');
    }
  };

module.exports = {
    uploadFile, getFile
}