
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 } } };

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

    //This fucntion validate details from booking form.
    funBookingValidateDetails: ValidateDetails = (strActionType, obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                // var obj = req.body;

                let time = obj.time;
                let date = obj.date;
                let address = obj.address;
                let intBookingId = obj.intBookingId;
                let fkIntServiceId = obj.intServiceId;
                let fkIntLoginUserId = obj.intLoginUserId;

                time = (time && typeof time === 'string') ? time.trim() : null;
                date = (date && typeof date === 'string') ? date.trim() : null;
                address = (address && typeof address === 'string') ? address.trim() : null;
                fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ? ObjectID(fkIntLoginUserId.trim()) : null;
                intBookingId = (intBookingId && typeof intBookingId === 'string') ? ObjectID(intBookingId.trim()) : null;
                fkIntServiceId = (fkIntServiceId && typeof fkIntServiceId === 'string') ? ObjectID(fkIntServiceId.trim()) : null;

                if (intBookingId || strActionType === 'SAVE') {
                    if (fkIntServiceId) {
                        if (time) {
                            if (date) {
                                if (fkIntLoginUserId) {
                                    var match = { $match: { _id: ObjectID(fkIntLoginUserId) } };
                                    db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                                        if (response.length) {
                                            resolve({
                                                success: true,
                                                message: 'Pass validate',
                                                data: arryEmpty
                                            });
                                        } else {
                                            resolve({ success: false, message: 'User not found', data: arryEmpty });
                                        }
                                    });
                                } else {
                                    resolve({ success: false, message: 'Invalid User', data: arryEmpty });
                                }
                            } else {
                                resolve({ success: false, message: 'Date is not found', data: arryEmpty });
                            }
                        } else {
                            resolve({ success: false, message: 'Time is  not found', data: arryEmpty });
                        }
                    } else {
                        resolve({ success: false, message: 'Service Id is  not found', data: arryEmpty });
                    }
                } else {
                    resolve({ success: false, message: 'IntBookingId is not found', data: arryEmpty });
                }

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }

        });
    },

    //This fucntion insert booking details.
    funSaveBookingDetails: InsertBookingDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("sadjhxb ---", obj)
                const newObject = {
                    pkIntBookingId: ObjectID(),
                    time: obj.time,
                    date: obj.date,
                    address: obj.address,
                    bookingStatus: "PENDING",
                    fkIntServiceId: ObjectID(obj.intServiceId),
                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'

                };

                db.collection(config.BOOKING_COLLECTION).insert(newObject, (err, doc) => {
                    if (err) resolve({ success: false, message: 'Booking Creation Failed.', arryEmpty });
                    else if (doc && doc.ops && doc.ops.length === true) {
                    }
                    else {
                        resolve({ success: true, message: 'Booking saved successfully', data: [doc.ops[0]] });
                    };
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    //This function update booking details form.
    funUpdateCourse: UpdateCourse = (obj, db) => {
        console.log("funUpdateBookingDetails ---", obj)
        return new Promise((resolve, reject) => {
            try {

                let intCourseId = obj.id;

                var match = { $match: { _id: ObjectID(intCourseId) } };
                db.collection(config.COURSE_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            courseName: obj.courseName,
                            semester: obj.semester

                        };
                        var query = { _id: ObjectID(intCourseId) };
                        db.collection(config.COURSE_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
                            if (err) resolve({ success: false, message: 'Course Update Failed.', data: arryEmpty });
                            else {
                                resolve({ success: true, message: 'Course updated successfully', data: [newObject] });
                            }

                        })

                    } else {
                        resolve({ success: false, message: 'No course found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },


    funSubject: Subject = (obj, db) => {
        console.log("funSubjectDetails ---", obj)
        return new Promise((resolve, reject) => {
            try {
                const newObject = {

                    semester: obj.semester,
                    subject: obj.subject
                }

                db.collection(config.SUBJECT_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
                    if (err) resolve({ success: false, message: ' Update Failed.', data: arryEmpty });
                    else {
                        resolve({ success: true, message: 'updated successfully', data: [doc] });
                    }

                });

            }

            catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });

            }
        });
    },

    funUpdateItem: UpdateItem = (obj, db) => {
        console.log("funUpdateditems ---", obj)
        return new Promise((resolve, reject) => {
            try {

                let intItemId = obj._id;

                var match = { $match: { _id: ObjectID(intItemId) } };
                db.collection(config.ITEM_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            semester: obj.semester,
                            subject: obj.subject

                        };
                        var query = { _id: ObjectID(intItemId) };
                        db.collection(config.ITEM_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
                            if (err) resolve({ success: false, message: 'item Update Failed.', data: arryEmpty });
                            else {
                                resolve({ success: true, message: 'item updated successfully', data: newObject });
                            }

                        })

                    } else {
                        resolve({ success: false, message: 'No course found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    funItem: Item = (obj, db) => {
        console.log("funUpdateItem ---", obj)
        return new Promise((resolve, reject) => {
            try {
                console.log("funUpdateItem rrrrrrrrrrrr---")
                const newObject = {
                    semester: obj.semester,
                    subject: obj.subject,
                }

                db.collection(config.UPDATE_ITEM_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
                    if (err) resolve({ success: false, message: ' Update Failed.', data: arryEmpty });
                    else {
                        resolve({ success: true, message: 'updated successfully', data: [doc] });
                    }

                });

            }

            catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });

            }
        });
    },

    funupdateQuestion: updateQuestion = (obj, db) => {
        console.log("funupdateQuestion ---", obj)
        return new Promise((resolve, reject) => {
            try {

                let intquestionId = obj._id;

                var match = { $match: { _id: ObjectID(intquestionId) } };
                db.collection(config.QUESTION_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            subject:obj.subject,
                            year_1:obj.year_1,
                            year_2:obj.year_2,
                            year_3:obj.year_3
                        };
                        var query = { _id: ObjectID(intquestionId) };
                        db.collection(config.QUESTION_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
                            if (err) resolve({ success: false, message: 'item Update Failed.', data: arryEmpty });
                            else {
                                resolve({ success: true, message: 'item updated successfully', data: newObject });
                            }

                        })

                    } else {
                        resolve({ success: false, message: 'No course found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    funQuestion: Question = (obj, db) => {
        console.log("funQuestion ---", obj)
        return new Promise((resolve, reject) => {
            try {
                const newObject = {
                    subject:obj.subject,
                    year_1:obj.year_1,
                    year_2:obj.year_2,
                    year_3:obj.year_3
                }

                db.collection(config.UPDATE_QUESTION_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
                    if (err) resolve({ success: false, message: ' Update Failed.', data: arryEmpty });
                    else {
                        resolve({ success: true, message: 'updated successfully', data: [doc] });
                    }

                });

            }

            catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });

            }
        });
    },


    //This function update booking status details form.
    funUpdateBookingStatusDetails: UpdateBookingStatusDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                let intBookingId = obj.intBookingId;
                let IntLastModifiedId = obj.intLoginUserId;

                var match = { $match: { _id: ObjectID(intBookingId) } };
                db.collection(config.BOOKING_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {

                            bookingStatus: obj.bookingStatus,
                            datLastModifiedDateTime: new Date(),
                            fkIntLastModifiedId: ObjectID(IntLastModifiedId)

                        };
                        var query = { _id: ObjectID(intBookingId) };
                        db.collection(config.BOOKING_COLLECTION).update(query, { $set: newObject }, (err, doc) => {
                            if (err) resolve({ success: false, message: 'Booking Update Failed.', data: arryEmpty });
                            else {
                                resolve({ success: true, message: 'Booking status updated successfully', data: [doc] });
                            }

                        })

                    } else {
                        resolve({ success: false, message: 'No booking found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });

    },

    //This fucntion validate details from booking delete form.
    funBookingValidateDeleteDetails: BookingValidateDeleteDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
            var obj = req.body;

            try {
                let fkIntLoginUserId = obj.intLoginUserId;
                let intBookingId = obj.intBookingId;

                fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ? ObjectID(fkIntLoginUserId.trim()) : null;
                intBookingId = (intBookingId && typeof intBookingId === 'string') ? ObjectID(intBookingId.trim()) : null;

                if (intBookingId || strActionType === 'UPDATE') {
                    if (fkIntLoginUserId) {
                        var match = { $match: { _id: ObjectID(fkIntLoginUserId) } };
                        db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                            if (response.length) {
                                resolve({
                                    success: true,
                                    message: 'Pass validate',
                                    data: arryEmpty
                                });
                            } else {
                                resolve({ success: false, message: 'User not found', data: arryEmpty });
                            }
                        });
                    } else {
                        resolve({ success: false, message: 'IntLoginUserId Invalid', data: arryEmpty });
                    }
                } else {
                    resolve({ success: false, message: 'IntBookingId Invalid', data: arryEmpty });
                }
            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }
        });
    },

    //This function delete details from booking form.
    funDeleteCourseDetails:deleteCourseDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {

                let intCourseId = obj._id;

                var match = { $match: { _id: ObjectID(intCourseId) } };
                db.collection(config.COURSE_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                  
                            strStatus: 'D',
                        };
                        var query = { _id: ObjectID(intCourseId) };
                        db.collection(config.COURSE_COLLECTION).update(query, { $set: newObject }, (err) => {
                            if (err) throw err

                            resolve({ success: true, message: 'course deleted successfully.', data: [newObject] });
                        })
                    } else {
                        resolve({ success: false, message: 'course not found', data: arryEmpty });
                    }
                });

            } catch (e) {
                throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
            }

        });
    },


funDeleteItemDetails:deleteItemDetails = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {

            let intItemId = obj._id;

            var match = { $match: { _id: ObjectID(intItemId) } };
            db.collection(config.ITEM_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
              
                        strStatus: 'D',
                    };
                    var query = { _id: ObjectID(intItemId) };
                    db.collection(config.ITEM_COLLECTION).update(query, { $set: newObject }, (err) => {
                        if (err) throw err

                        resolve({ success: true, message: 'item deleted successfully.', data: [newObject] });
                    })
                } else {
                    resolve({ success: false, message: 'item not found', data: arryEmpty });
                }
            });

        } catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }

    });
},
};