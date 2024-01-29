import { create} from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const handleUploadFile = async (file) => {
  try {
    // Read the file content
    const fileBuffer = await file.arrayBuffer();

    // Upload file to IPFS
    const result = await ipfs.add({ content: fileBuffer });
    const ipfsHash = result.cid.toString();

    console.log("File uploaded to IPFS. IPFS Hash:", ipfsHash);

    // Update state with the IPFS hash or perform further actions
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      { name: file.name, ipfsHash },
    ]);
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
  }
};

export const handleDownloadFile = async (file) => {
  try {
    // Fetch file from IPFS using its hash
    const fileContent = await ipfs.cat(file.ipfsHash);

    // Convert file content to a Blob
    const blob = new Blob([fileContent], { type: "application/octet-stream" });

    // Create a download link and trigger a click event to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
  } catch (error) {
    console.error("Error downloading file from IPFS:", error);
  }
};
