const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];

var upperCase = require('upper-case');


module.exports = {

        //This function listing details from user form.
    funGetAllUserDetails: GetAllUserDetails=(obj,db)=> {
        console.log("agtt ----",obj)
        return new Promise((resolve, reject) => {
            try{
                var arrayAllObjData =[];
                var query= {strStatus:'N'};
                var query1= {};
              
                if(obj.userName)
                    query.userName =obj.userName
  
                if(obj.mobile)
                    query.mobile =obj.mobile
      
                if(obj.email)
                    query.email =obj.email
                
                var intSkipCount =0;
                var intPageLimit =0;
                if(obj.intSkipCount)
                    intSkipCount = parseInt(obj.intSkipCount);
                if(obj.intPageLimit)
                    intPageLimit = parseInt(obj.intPageLimit);

                var Project = { $project : {
                    _id:"$_id",
                    email: "$email",
                    userName:"$userName", 
                    mobile:"$mobile", 
                    userType:"$userType", 
                }};
            
    
                db.collection(config.USER_COLLECTION).aggregate([{
                    $match: {
                        $and: [ query, query1]
                    }
                }, 
                {
                    $count: "intTotalCount"
                }]).toArray()
                .then((arraytotalPageCount) => {
                    
                        if(arraytotalPageCount && arraytotalPageCount.length){
                            totalPageCount =arraytotalPageCount[0].intTotalCount;
                            if(!intPageLimit)
                                intPageLimit =parseInt(totalPageCount);
                            db.collection(config.USER_COLLECTION).aggregate([{ $match: {
                                $and: [query, query1]
                            }},
                            {$sort:{datCreateDateAndTime:-1}},
                                { "$skip": intSkipCount }, { "$limit": intPageLimit }, 
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
      //This function listing details from service form.
      funGetUserList: GetUserList = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                var arrayAllObjData = [];
                var query = { strStatus: "N" };
                var query1 = {};

                if (obj.userName)
                    query.userName = obj.userName

                if (obj.mobile)
                    query.mobile = obj.mobile

                if (obj.email)
                    query.email = obj.email

                var intSkipCount = 0;
                var intPageLimit = 0;
                if (obj.intSkipCount)
                    intSkipCount = parseInt(obj.intSkipCount);
                if (obj.intPageLimit)
                    intPageLimit = parseInt(obj.intPageLimit);

                var Project = {
                    $project: {
                        _id: "$_id",
                        mobile: "$mobile",
                        userName: "$userName",
                        email: "$email",
                      
                    }
                };

                db.collection(config.USER_COLLECTION).aggregate([{
                    $match: {
                        $and: [query, query1]
                    }
                },
                {
                    $count: "intTotalCount"
                }]).toArray()
                    .then((arraytotalPageCount) => {
                        if (arraytotalPageCount && arraytotalPageCount.length) {
                            totalPageCount = arraytotalPageCount[0].intTotalCount;
                            if (!intPageLimit)
                                intPageLimit = parseInt(totalPageCount);
                            db.collection(config.USER_COLLECTION).aggregate([{
                                $match: {
                                    $and: [query, query1]
                                }
                            },
                            { $sort: { sortNo: 1 } },
                            { "$skip": intSkipCount }, { "$limit": intPageLimit },
                                Project
                            ]).toArray((err, doc) => {
                                if (err) throw err;
                                if (doc) {
                                    var objTotal = { intTotalCount: totalPageCount };
                                    arrayAllObjData.push(doc);
                                    arrayAllObjData.push(objTotal);
                                    resolve({ success: true, message: 'Successfully.', data: arrayAllObjData });
                                }

                            });
                        }
                         else {
                            resolve({ success: false, message: ' No Data Found', data: arryEmpty });
                        }
                    })

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },


}