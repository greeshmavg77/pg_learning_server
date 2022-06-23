
const config = require('../config/config');
const express = require('express');

var arryEmpty = [];
var ObjectID = require("mongodb").ObjectID;
module.exports = {

  
       //This function listing details from booking form.
    funGetAllBookingDetails: GetAllBookingDetails=(obj,db)=> {
        return new Promise((resolve, reject) => {
            try{
                var arrayAllObjData =[];
                var query= { strStatus: "N" }
                
                var intSkipCount =0;
                var intPageLimit =0;
                if(obj.intSkipCount)
                    intSkipCount = parseInt(obj.intSkipCount);
                if(obj.intPageLimit)
                    intPageLimit = parseInt(obj.intPageLimit);

                var lookupService = {
                    $lookup: {
                        from: config.SERVICES_COLLECTION,
                        let: {intUserIds: "$fkIntServiceId", strStatus: "N"},
                        pipeline: [
                            {$match: {$expr: {$and:
                                            [
                                                {$eq: ["$strStatus", "$$strStatus"]},
                                                {$eq: ["$_id", "$$intUserIds"]},
                                            ]}}},
                            { $project: {serviceName: 1, _id: 1} }
                        ],
                        as: "arrayOfService"
                    }
                };
                var unwindarrayOfService = {$unwind: "$arrayOfService"};

                var lookupUser = {
                    $lookup: {
                        from: config.USER_COLLECTION,
                        let: {intUserIds: "$fkIntCreateUserId", strStatus: "N"},
                        pipeline: [
                            {$match: {$expr: {$and:
                                            [
                                                {$eq: ["$strStatus", "$$strStatus"]},
                                                {$eq: ["$_id", "$$intUserIds"]},
                                            ]}}},
                            { $project: {userName: 1, _id: 1,mobile:1} }
                        ],
                        as: "arrayOfUser"
                    }
                };
                var unwindarrayOfService = {$unwind: "$arrayOfService"};
                var unwindarrayOfUser = {$unwind: "$arrayOfUser"};


                var Project = { $project : {
                    _id:"$_id",
                    time: "$time",
                    date:"$date", 
                    status:"$bookingStatus", 
                    "objService":"$arrayOfService", 
                    "objUser":"$arrayOfUser", 
                    
                }};
    
                db.collection(config.BOOKING_COLLECTION).find(query).count()
                    .then((totalPageCount) => {
                        if(totalPageCount){
                            if(!intPageLimit)
                                intPageLimit =parseInt(totalPageCount);
                            db.collection(config.BOOKING_COLLECTION).aggregate([{$match:query},
                                {$sort:{date:-1}},
                                { "$skip": intSkipCount }, { "$limit": intPageLimit },
                                lookupService,unwindarrayOfService,lookupUser,unwindarrayOfUser,
                                Project
                            ]).toArray( (err,doc) => {
                                if (err) throw err;
                                if(doc){
                                    var objTotal ={intTotalCount :totalPageCount};
                                    arrayAllObjData.push(doc);
                                    arrayAllObjData.push(objTotal);
                                    resolve({success: true,message: 'Successfully.', data: arrayAllObjData});
                                }
        
                            });
                        } else {
                            resolve({success: false, message: ' No Data Found', data: arryEmpty});
                        }
                    })
        
            } catch (e) {
                throw resolve( { success: false, message: 'System '+e, data: arryEmpty });
            }
        });
    
    },

       //This function listing by booking id form.
    funGetByBookingIdDetails: GetByBookingIdDetails=(obj,db)=> {
        return new Promise((resolve, reject) => {
            try{
                var arrayAllObjData =[];
                var query= { _id: ObjectID(obj.id) , strStatus: "N" }
                
                var intSkipCount =0;
                var intPageLimit =0;
                if(obj.intSkipCount)
                    intSkipCount = parseInt(obj.intSkipCount);
                if(obj.intPageLimit)
                    intPageLimit = parseInt(obj.intPageLimit);

                var lookupService = {
                    $lookup: {
                        from: config.SERVICES_COLLECTION,
                        let: {intUserIds: "$fkIntServiceId", strStatus: "N"},
                        pipeline: [
                            {$match: {$expr: {$and:
                                            [
                                                {$eq: ["$strStatus", "$$strStatus"]},
                                                {$eq: ["$_id", "$$intUserIds"]},
                                            ]}}},
                            { $project: {serviceName: 1, _id: 1} }
                        ],
                        as: "arrayOfService"
                    }
                };
                var unwindarrayOfService = {$unwind: "$arrayOfService"};

                var lookupUser = {
                    $lookup: {
                        from: config.USER_COLLECTION,
                        let: {intUserIds: "$fkIntCreateUserId", strStatus: "N"},
                        pipeline: [
                            {$match: {$expr: {$and:
                                            [
                                                {$eq: ["$strStatus", "$$strStatus"]},
                                                {$eq: ["$_id", "$$intUserIds"]},
                                            ]}}},
                            { $project: {userName: 1, _id: 1,mobile:1} }
                        ],
                        as: "arrayOfUser"
                    }
                };
                var unwindarrayOfService = {$unwind: "$arrayOfService"};
                var unwindarrayOfUser = {$unwind: "$arrayOfUser"};


                var Project = { $project : {
                    _id:"$_id",
                    time: "$time",
                    date:"$date", 
                    status:"$bookingStatus", 
                    address:"$address", 
                    "objService":"$arrayOfService", 
                    "objUser":"$arrayOfUser"
                }};
    
                db.collection(config.BOOKING_COLLECTION).find(query).count()
                    .then((totalPageCount) => {
                        if(totalPageCount){
                            if(!intPageLimit)
                                intPageLimit =parseInt(totalPageCount);
                            db.collection(config.BOOKING_COLLECTION).aggregate([{$match:query},
                                {$sort:{date:-1}},
                                { "$skip": intSkipCount }, { "$limit": intPageLimit },
                                lookupService,unwindarrayOfService,lookupUser,unwindarrayOfUser,
                                Project
                            ]).toArray( (err,doc) => {
                                if (err) throw err;
                                if(doc){
                                    var objTotal ={intTotalCount :totalPageCount};
                                    arrayAllObjData.push(doc);
                                    arrayAllObjData.push(objTotal);
                                    resolve({success: true,message: 'Successfully.', data: arrayAllObjData[0]});
                                }
        
                            });
                        } else {
                            resolve({success: false, message: ' No Data Found', data: arryEmpty});
                        }
                    })
        
            } catch (e) {
                throw resolve( { success: false, message: 'System '+e, data: arryEmpty });
            }
        });
    
    },
    
     
}