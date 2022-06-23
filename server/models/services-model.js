
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

        //This fucntion validate details from service form.
    funServiceValidateDetails: ValidateDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
            try {

                var obj = req.body;
                console.log("sadihd ---=",obj)
                let serviceName = obj.serviceName;
                let sortNo = obj.sortNo;
                let arabicName = obj.arabicName;
                let logoUrl = obj.logoUrl;
                let IntServiceId = obj.IntServiceId;
                let fkIntLoginUserId = obj.intLoginUserId;
                let iconName = obj.iconName;

                serviceName = (serviceName && typeof serviceName === 'string') ? serviceName.trim() : null;
                logoUrl = (logoUrl && typeof logoUrl === 'string') ? logoUrl.trim() : null;
                arabicName = (arabicName && typeof arabicName === 'string') ? arabicName.trim() : null;
                iconName = (iconName && typeof iconName === 'string') ? iconName.trim() : null;
                sortNo = (sortNo && typeof sortNo === 'number') ? sortNo : 0;
                fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ? ObjectID(fkIntLoginUserId.trim()) : null;
                IntServiceId = (IntServiceId && typeof IntServiceId === 'string') ? ObjectID(IntServiceId.trim()) : null;

                if (IntServiceId || strActionType === 'SAVE') {
                    if (serviceName) {
                        if(sortNo){
                            if (fkIntLoginUserId) {
                                var match = {$match: {_id:ObjectID(fkIntLoginUserId)}};
                                db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                                    if(response.length){
                                        resolve({
                                            success: true,
                                            message: 'Pass validate',
                                            data: arryEmpty
                                        });
                                    }else{
                                        resolve({success: false, message: 'User not found', data: arryEmpty});
                                    } 
                                });
                            } else {
                                resolve({success: false, message: 'Invalid User', data: arryEmpty});
                            }
                        } else {
                            resolve({success: false, message: 'Sort Number is not found', data: arryEmpty});
                        }   
                    } else {
                        resolve({success: false, message: 'Service Name is not found', data: arryEmpty});
                    }
                } else {
                    resolve({success: false, message: 'IntServiceId is not found', data: arryEmpty});
                }
                
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },

        //This fucntion insert service details.
    funSaveServiceDetails: InsertServiceDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                const newObject = {
                    pkIntServiceId:ObjectID(),
                    serviceName:obj.serviceName,
                    arabicName: obj.arabicName,
                    sortNo:parseInt(obj.sortNo),
                    logoUrl: obj.logoUrl,
                    iconName : obj.iconName,
                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'
                    
                };

                db.collection(config.SERVICES_COLLECTION).insert(newObject, (err, doc) => {
                    if (err)resolve({success: false, message: 'Service Creation Failed.', arryEmpty});
                        else if(doc && doc.ops && doc.ops.length === true) {
                    }
                    else{
                        resolve({success: true, message: 'Service saved successfully', data: [doc.ops[0]]});
                    };
                });

            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

       //This function update service details form.
    funUpdateServiceDetails: UpdateServiceDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                  
                let IntServiceId = obj.IntServiceId;
                let IntLastModifiedId = obj.intLoginUserId;

                var match = {$match: {_id: ObjectID(IntServiceId)}};
                db.collection(config.SERVICES_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                           
                            serviceName:(obj.serviceName),
                            arabicName: (obj.arabicName),
                            sortNo:parseInt(obj.sortNo),
                            logoUrl: (obj.logoUrl),
                            iconName : obj.iconName,
                            datLastModifiedDateTime: new Date(),
                            fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                           
                        };
                        var query = {_id: ObjectID(IntServiceId)};
                        db.collection(config.SERVICES_COLLECTION).updateOne(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Service Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Service updated successfully', data: [doc]});
                            }

                        })

                    } else {
                        resolve({success: false, message: 'No category found', data: arryEmpty});
                    }
                });
       
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

        //This fucntion validate details from service delete form.
    funServiceValidateDeleteDetails: ServiceValidateDeleteDetails = (strActionType, req, db) => {
        console.log("enter in ValidateDetails",req.body )
        return new Promise((resolve, reject) => {
            var obj = req.body;

            try {                  
                let fkIntLoginUserId = obj.intLoginUserId;
                let IntServiceId =obj.intServiceId;
          
                fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ?ObjectID( fkIntLoginUserId.trim()) : null;
                IntServiceId = (IntServiceId && typeof IntServiceId === 'string') ? ObjectID(IntServiceId.trim()) : null;
                
                console.log("IntServiceId==--- ",IntServiceId)
                
                if (IntServiceId || strActionType === 'SAVE') { 
                    if (fkIntLoginUserId) {
                        var match = {$match: {_id:ObjectID(fkIntLoginUserId)}};
                        db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                            if(response.length){
                                resolve({
                                    success: true,
                                    message: 'Pass validate',
                                    data: arryEmpty
                                });
                            }else{
                                resolve({success: false, message: ' User not found', data: arryEmpty});
                            }
                        });
                    } else {
                        resolve({success: false, message: 'IntLoginUserId Invalid', data: arryEmpty});
                    }
                } else {
                    resolve({success: false, message: 'IntServiceId Invalid', data: arryEmpty});
                }
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });
    },

       //This function delete details from service form.
    funDeleteServiceDetails: DeleteServiceDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              
                let IntServiceId = obj.intServiceId;
                let IntLastModifiedId = obj.intLoginUserId;
  
                var match = {$match: {_id: ObjectID(IntServiceId)}};
                db.collection(config.SERVICES_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            datLastModifiedDateTime : new Date(),
                            fkIntLastModifiedId: ObjectID(IntLastModifiedId),
                            strStatus: 'D',
                        };
                        var query = {_id: ObjectID(IntServiceId)};
                        db.collection(config.SERVICES_COLLECTION).updateOne(query, {$set: newObject}, (err) => {
                            if (err) throw err
                            
                            resolve({success: true, message: 'Service deleted successfully.', data: [newObject]});
                        })
                    } else {
                        resolve({success: false, message: 'Service not found', data: arryEmpty});
                    }
                });
          
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },
    

 
}


