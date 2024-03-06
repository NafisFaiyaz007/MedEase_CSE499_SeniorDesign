/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');
            // {
            //     // ID:,
            //     // fileName:,
            //     // fileHash:,
            //     // fileType:,
            //     // fileSize:,
            //     // ownerID:,
            //     // uploaded:,
            //     // accessList: [],

    
            // },
class MedicalRecords extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: '001_record1',
                fileName: "no name",
                fileHash: "hash2j092jd",
                fileType: 'pdf',
                fileSize: '3.7',
                ownerID: '001',
                uploaded: 'today',
                accessList: ['doc1', 'doc2'],
            },
             {
                ID: '002_record2',
                fileName: "no name2s",
                fileHash: "hash2jsd092jd",
                fileType: 'pdf',
                fileSize: '4.7',
                ownerID: '002',
                uploaded: 'today',
                accessList: ['doc1', 'doc5'],
             },
             {
                ID: '001_record3',
                fileName: "no name23s",
                fileHash: "hash2jsd092jd",
                fileType: 'pdf',
                fileSize: '4.7',
                ownerID: '001',
                uploaded: 'yesterday',
                accessList: ['doc1', "hospital2"],
             },
        ];

        for (const asset of assets) {
            asset.docType = 'medicalRecord';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateRecord(ctx, fileName, fileHash, ownerID, date, doctorList) {
        // async CreateRecord(ctx, fileName, fileHash, fileType, fileSize, ownerID, date, doctorList) {
        let id = ownerID + "_" + crypto.createHash('sha256').update(`${fileName}-${fileHash}`).digest('hex');
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }
        
        const asset = {
            ID: id,
            fileName: fileName,
            fileHash: fileHash,
            // fileType: fileType,
            // fileSize: fileSize,
            ownerID: ownerID,
            uploaded: date,
            accessList: doctorList.split(','),
            uploadedBy: ownerID,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        return JSON.stringify(asset);
        
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadDocument(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateRecord(ctx, id, fileName, hash, owner, date, accessList) {
        //async UpdateRecord(ctx, id, fileName, hash, owner, type, size, date, accessList) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            fileName: fileName,
            fileHash: hash,
            // fileType: type,
            // fileSize: size,
            ownerID: owner,
            uploaded: date,
            accessList: accessList,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteRecord(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    // async TransferAsset(ctx, id, newOwner) {
    //     const assetString = await this.ReadAsset(ctx, id);
    //     const asset = JSON.parse(assetString);
    //     const oldOwner = asset.Owner;
    //     asset.Owner = newOwner;
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    //     return oldOwner;
    // }

    async grantPermission(ctx, id, doctorID){
        let document = await this.ReadDocument(ctx, id);
        document = JSON.parse(document);
        if (document.accessList.includes(doctorID)) {
            throw new Error(`The doctor already has permission to view record ${id}`);
        }
        document.accessList.push(doctorID);
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(document)));
    }
    async revokePermission(ctx, id, doctorID){
        let document = await this.ReadDocument(ctx, id);
        document = JSON.parse(document);
        if (!document.accessList.includes(doctorID)) {
            throw new Error(`The doctor did not have permission to view record ${id}`);
        }
        document.accessList.pop(doctorID);
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(document)));
    }
    
    // GetAllAssets returns all assets found in the world state.
    async getRecordsByOwner(ctx, ownerID) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange(ownerID + "_", '');
        let result = await iterator.next();
        while (!result.done) {
            const key = result.value.key;
            let record;
            if (key.startsWith(ownerID + "_")) {
                try {
                    record = JSON.parse(Buffer.from(result.value.value.toString()).toString('utf8'));
                    allResults.push(record);
                }
            catch (err) {
                console.log(err);
            }
        }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllDocuments(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async hasPermission(ctx, id, viewerID){
        let document = await this.ReadDocument(ctx, id);
        document = JSON.parse(document);
        if (document.ownerID === doctorID || document.accessList.includes(viewerID)) {
            return true;
        }
    return false;
    }

    // CreateAsset issues a new asset to the world state with given details.
    async DoctorCreateRecord(ctx, fileName, fileHash, ownerID, date, doctorID) {
        // async CreateRecord(ctx, fileName, fileHash, fileType, fileSize, ownerID, date, doctorList) {
        let id = ownerID + "_" + crypto.createHash('sha256').update(`${fileName}-${fileHash}`).digest('hex');
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            ID: id,
            fileName: fileName,
            fileHash: fileHash,
            ownerID: ownerID,
            uploaded: date,
            accessList: [doctorID],
            uploadedBy: doctorID,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        return JSON.stringify(asset);

    }

    // ReadAsset returns the asset stored in the world state with given id.
    async DoctorReadDocument(ctx, id, viewerID) {
        const hasPermission = this.hasPermission(ctx, id, viewerID);
        if (hasPermission){
            const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
            if (!assetJSON || assetJSON.length === 0) {
                throw new Error(`The asset ${id} does not exist`);
            }
            return assetJSON.toString();
        }
        throw new Error("You donot have permission to view the document");
    }
    
    async DoctorViewDoumentList(ctx, ownerID) {
        const selectedResults = [];
    
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange(ownerID + "_", '');
    
        let result = await iterator.next();
        while (!result.done) {
            const key = result.value.key;
    
            if (key.startsWith(ownerID + "_")) {
                try {
                    const record = JSON.parse(Buffer.from(result.value.value.toString()).toString('utf8'));
    
                    // Extract only the required fields (e.g., owner and fileName)
                    const selectedDetails = {
                        ownerID: record.ownerID,
                        fileName: record.fileName,
                        ID: record.ID,
                        uploaded: record.uploaded,
                        uploadedBy: record.uploadedBy
                    };
    
                    selectedResults.push(selectedDetails);
                } catch (err) {
                    console.log(err);
                }
            }
    
            result = await iterator.next();
        }
    
        return JSON.stringify(selectedResults);
    }
    
}


module.exports = MedicalRecords;