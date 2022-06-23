const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 } } };


const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();
const common = require('../globel/common');
var arryEmpty = [];
const jwt = require('jsonwebtoken');
var upperCase = require('upper-case');
const randomstring = require('randomstring')

module.exports = {

    //This fucntion to register user details.
    funRegisterUserDetails: InsertUserDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                var checkQuery = ({ $or: [{ email: obj.email }, { userName: obj.userName }] });
                db.collection(config.USER_COLLECTION).find(checkQuery).toArray((err, user) => {
                    if (user && user.length) {
                        resolve({ success: false, message: 'Email or User Name Already Exists', data: [] });
                    } else {
                        var passObj = common.setPassword(obj.password);

                        const newObject = {
                            pkIntUserId: ObjectID(),
                            firstName: obj.firstName,
                            lastName: obj.lastName,
                            userName: obj.userName,
                            email: obj.email.toLowerCase(),
                            mobile: obj.mobile,
                            // dob: obj.dob,
                            // gender: obj.gender,
                            // userType: obj.userType,
                            password: passObj.hash,
                            prePassword: passObj.salt,
                            datCreateDateAndTime: new Date(),
                            datLastModifiedDateTime: null,
                            strStatus: 'N',
                        };
                        db.collection(config.USER_COLLECTION).insertOne(newObject, (err, doc) => {
                            if (err) resolve({ success: false, message: 'user Creation Failed.', data: arryEmpty });

                            else if (doc && doc.ops && doc.ops.length) {
                                let objUserData = doc.ops[0];
                                delete objUserData.password;
                                delete objUserData.prePassword;

                                let obj = doc.ops

                                var objPasData = { email: obj.email, intUserId: doc.ops[0].intUserId };
                                jwt.sign({ user: objPasData }, config.JWT_SECRET, (err, token) => {
                                    resolve({
                                        success: true,
                                        message: 'You are login',
                                        data: doc,
                                        token: token,
                                        data: [objUserData]
                                    })
                                })

                            }
                        });


                    }
                });


            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });
    },
    //This fucntion login admin details from user form.
    funCheckUserNameAndPassword: funCheckUserNameAndPassword = (obj, db) => {
        console.log("siuhcx ==--", obj)
        return new Promise((resolve, reject) => {
            try {

                db.collection(config.USER_COLLECTION).findOne({ email: obj.email }, (err, doc) => {
                    if (err) throw err;
                    if (!doc) {
                        resolve({ success: false, message: 'The email address is invalid', data: arryEmpty });
                    } else {
                        if (doc.userType === "ADMIN_USER") {
                            var objLoginpassword = common.validPassword(obj.password, doc);

                            if (objLoginpassword) {
                                db.collection(config.USER_COLLECTION).aggregate([
                                    { $match: { $and: [{ password: objLoginpassword.hash }, { email: obj.email }] } }

                                ]).toArray((err, doc1) => {
                                    if (err) throw err;
                                    if (doc1.length === 0) {
                                        resolve({ success: false, message: 'The password is invalid', data: arryEmpty });
                                    } else {
                                        var objPasData = { email: obj.email, intUserId: doc1[0].intUserId };
                                        jwt.sign({ user: objPasData }, config.JWT_SECRET, (err, token) => {
                                            // {expiresIn: "300s"}
                                            delete doc1[0].password;
                                            delete doc1[0].prePassword;
                                            resolve({
                                                success: true,
                                                message: 'You are login',
                                                data: doc1,
                                                token: token
                                            });

                                        })

                                    }
                                });
                            }
                        } else {
                            resolve({ success: false, message: 'Permmision denied', data: arryEmpty });
                        }

                    }
                });

            } catch (e) {
                console.log("Error", e);
                resolve(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
            }
        });


    },


    //This fucntion login admin details from user form.
    funCheckAppUserNameAndPassword: funCheckAppUserNameAndPassword = (obj, db) => {
        console.log("siuhcx ==--", obj)
        return new Promise((resolve, reject) => {
            try {

                db.collection(config.USER_COLLECTION).findOne({ email: obj.email }, (err, doc) => {
                    console.log("doc =-----",doc)
                    if (err) throw err;
                    if (!doc) {
                        resolve({ success: false, message: 'The email address is invalid', data: arryEmpty });
                    } else {
                        // if (doc.userType === "") {
                            var objLoginpassword = common.validPassword(obj.password, doc);

                            if (objLoginpassword) {
                                db.collection(config.USER_COLLECTION).aggregate([
                                    { $match: { $and: [{ password: objLoginpassword.hash }, { email: obj.email }] } }

                                ]).toArray((err, doc1) => {
                                    if (err) throw err;
                                    if (doc1.length === 0) {
                                        resolve({ success: false, message: 'The password is invalid', data: arryEmpty });
                                    } else {
                                        var objPasData = { email: obj.email, intUserId: doc1[0].intUserId };
                                        jwt.sign({ user: objPasData }, config.JWT_SECRET, (err, token) => {
                                            // {expiresIn: "300s"}
                                            delete doc1[0].password;
                                            delete doc1[0].prePassword;
                                            resolve({
                                                success: true,
                                                message: 'You are login',
                                                data: doc1,
                                                token: token
                                            });

                                        })

                                    }
                                });
                            }
                        // } else {
                        //     resolve({ success: false, message: 'Permmision denied', data: arryEmpty });
                        // }

                    }
                });

            } catch (e) {
                console.log("Error", e);
                resolve(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
            }
        });


    },


    //This fucntion update details from user status form.
    funUpdateStatusUserDetails: UpdateStatusUserDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                let UserId = obj.IntUserId;

                var match = { $match: { pkIntUserId: ObjectID(UserId) } };
                db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            status: obj.status,
                            datLastModifiedDateTime: new Date(),
                        };
                        var query = { pkIntUserId: ObjectID(UserId) };
                        db.collection(config.USER_COLLECTION).update(query, { $set: newObject }, (err, doc) => {
                            if (err) resolve({ success: false, message: 'User status Update Failed.', data: arryEmpty });
                            else {
                                resolve({ success: true, message: 'User status Update successfully.', data: [doc] });
                            }
                        })

                    } else {
                        resolve({ success: false, message: 'No User found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    //This fucntion update details from user form.
    funUpdateUserDetails: UpdateUserDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                let UserId = obj.IntUserId;

                var match = { $match: { pkIntUserId: ObjectID(UserId) } };
                db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            name: obj.name,
                            mobile: obj.mobile,
                            email: obj.email,
                            status: obj.status,
                            datLastModifiedDateTime: new Date(),
                        };
                        var query = { pkIntUserId: ObjectID(UserId) };
                        db.collection(config.USER_COLLECTION).update(query, { $set: newObject }, (err, doc) => {
                            if (err) resolve({ success: false, message: 'User Update Failed.', data: arryEmpty });
                            else {
                                resolve({ success: true, message: 'User Update successfully.', data: [doc] });
                            }
                        })

                    } else {
                        resolve({ success: false, message: 'No User found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });
    },
}