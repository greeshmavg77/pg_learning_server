
const config = require('../config/config');
const express = require('express');

var arryEmpty = [];
var ObjectID = require("mongodb").ObjectID;
module.exports = {

    //This function listing details from service form.
    funGetAllServiceDetails: GetAllServiceDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                var arrayAllObjData = [];
                var query = { strStatus: "N" };
                var query1 = {};

                if (obj.serviceName)
                    query.serviceName = obj.serviceName

                if (obj.arabicName)
                    query.arabicName = obj.arabicName

                if (obj.sortNo)
                    query.sortNo = obj.sortNo

                var intSkipCount = 0;
                var intPageLimit = 0;
                if (obj.intSkipCount)
                    intSkipCount = parseInt(obj.intSkipCount);
                if (obj.intPageLimit)
                    intPageLimit = parseInt(obj.intPageLimit);

                var Project = {
                    $project: {
                        _id: "$_id",
                        serviceName: "$serviceName",
                        sortNo: "$sortNo",
                        logoUrl: "$logoUrl",
                        iconName: "$iconName",
                        arabicName: "$arabicName",
                    }
                };

                db.collection(config.SERVICES_COLLECTION).aggregate([{
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
                            db.collection(config.SERVICES_COLLECTION).aggregate([{
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
                        } else {
                            resolve({ success: false, message: ' No Data Found', data: arryEmpty });
                        }
                    })

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    //This function listing by service id form.
    funGetByServiceIdDetails: GetByServiceIdDetails = (obj, db) => {
        console.log("dfisnc ====", obj)
        return new Promise((resolve, reject) => {
            try {
                var arrayAllObjData = [];
                var query = { strStatus: 'N' };

                var intSkipCount = 0;
                var intPageLimit = 0;
                if (obj.intSkipCount)
                    intSkipCount = parseInt(obj.intSkipCount);
                if (obj.intPageLimit)
                    intPageLimit = parseInt(obj.intPageLimit);

                var Project = {
                    $project: {
                        _id: "$_id",
                        serviceName: "$serviceName",
                        sortNo: "$sortNo",
                        logoUrl: "$logoUrl",
                        iconName: "$iconName",
                        arabicName: "$arabicName",
                    }
                };

                db.collection(config.SERVICES_COLLECTION).find(query).count()
                    .then((totalPageCount) => {
                        if (totalPageCount) {
                            if (!intPageLimit)
                                intPageLimit = parseInt(totalPageCount);
                            db.collection(config.SERVICES_COLLECTION).aggregate([{ $match: query },
                            { $sort: { datCreateDateAndTime: -1 } },
                            { "$skip": intSkipCount }, { "$limit": intPageLimit },
                                Project
                            ]).toArray((err, doc) => {
                                if (err) throw err;
                                if (doc) {

                                    resolve({ success: true, message: 'Successfully.', data: arrayAllObjData[0] });
                                }

                            });
                        } else {
                            resolve({ success: false, message: ' No Data Found', data: arryEmpty });
                        }
                    })

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    // funGetSubjectListDetails: GetSubjectListDetails = (obj, db) => {
    //     console.log("dfisnc ====", obj)
    //     return new Promise((resolve, reject) => {
    //         try {
    //             var arrayAllObjData = [];
    //             var query = { strStatus: 'N' };

    //             var intSkipCount = 0;
    //             var intPageLimit = 0;
    //             if (obj.intSkipCount)
    //                 intSkipCount = parseInt(obj.intSkipCount);
    //             if (obj.intPageLimit)
    //                 intPageLimit = parseInt(obj.intPageLimit);

    //             var Project = {
    //                 $project: {
    //                     _id: "$_id",
    //                     semester:"$semester",
    //                 }
    //             };

    //             db.collection(config.ITEM_COLLECTION).find(query).count()
    //                 .then((totalPageCount) => {
    //                     if (totalPageCount) {
    //                         if (!intPageLimit)
    //                             intPageLimit = parseInt(totalPageCount);
    //                         db.collection(config.ITEM_COLLECTION).aggregate([{ $match: query },
    //                         { $sort: { datCreateDateAndTime: -1 } },
    //                         { "$skip": intSkipCount }, { "$limit": intPageLimit },
    //                             Project
    //                         ]).toArray((err, doc) => {
    //                             if (err) throw err;
    //                             if (doc) {

    //                                 resolve({ success: true, message: 'Successfully.', data: arrayAllObjData[0] });
    //                             }

    //                         });
    //                     } else {
    //                         resolve({ success: false, message: ' No Data Found', data: arryEmpty });
    //                     }
    //                 })

    //         } catch (e) {
    //             throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
    //         }
    //     });

    // },

    
}
