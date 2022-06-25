const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 } } };

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {
//register
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
//login
funCheckUserNameAndPassword: funCheckUserNameAndPassword = (obj, db) => {
    console.log("siuhcx ==--", obj)
    return new Promise((resolve, reject) => {
        try {

            db.collection(config.USER_COLLECTION).findOne({ email: obj.email }, (err, doc) => {
                if (err) throw err;
                if (!doc) {
                    resolve({ success: false, message: 'The email address is invalid', data: arryEmpty });
                } else {
                    // if (doc.userType === "ADMIN_USER") {
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
// NET save
funAddNet: AddNet = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {
            const newObject = {
                material: obj.material,
                questionPaper: obj.questionPaper,
                videoLink:obj.videoLink,
                datCreateDateAndTime: new Date(),
                strStatus: 'N',
            };
            db.collection(config.NET_COLLECTION).insertOne(newObject, (err, doc) => {
                if (err) resolve({ success: false, message: 'Creation Failed.', data: arryEmpty });
                else {
                    resolve({ success: true, message: 'saved successfully.', data: doc.ops });
                }

            });


        }

        catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }
    });
},
//course save
funAddCourse: Course = (obj, db) => {
return new Promise((resolve, reject) => {
        try {
          
            const newObject = {
                semester: obj.semester,
                description:obj.description,
                fkIntCategoryId:obj.categoryId,
                datCreateDateAndTime: new Date(),
                strStatus: 'N',
            };
            db.collection(config.COURSE_COLLECTION).insertOne(newObject, (err, doc) => {
                if (err) resolve({ success: false, message: 'course Creation Failed.', data: arryEmpty });
                else {
                    resolve({ success: true, message: 'saved successfully.', data: doc.ops });
                }

            });


        }

        catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }
    });
},
//item save
funAddItem: Items = (obj, db) => {
  return new Promise((resolve, reject) => {
      try {
          const newObject = {
              fieldName: obj.fieldName,
              description: obj. description,

              datCreateDateAndTime: new Date(),
              strStatus: 'N',
          }
          db.collection(config.ITEM_COLLECTION).insertOne(newObject, (err, doc) => {
              if (err) resolve({ success: false, message: 'item Creation Failed.', data: arryEmpty });
              else {
                  resolve({ success: true, message: 'saved successfully.', data: doc.ops });
              }

          });


      }

      catch (e) {
          throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
      }
  });
},
//listitem
funGetItemList:GetItemList = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {
            const newObject = {

                fieldName: obj.fieldName,
                description: obj. description,
  
                datCreateDateAndTime: new Date(),
                strStatus: 'N',
            }
            db.collection(config.ITEM_COLLECTION).insertOne(newObject, (err, doc) => {
                if (err) resolve({ success: false, message: 'itemlisting Creation Failed.', data: arryEmpty });
                else {
                    resolve({ success: true, message: 'items saved successfully.', data: doc.ops });
                }
  
            });
  
  
        }
  
        catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }
    });
  },
  //listcourse
  funGetCourseList:GetCourseList = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {
            const newObject = {
                semester: obj.semester,
                description : obj.description,
                datCreateDateAndTime: new Date(),
                strStatus: 'N',
            }
            db.collection(config.COURSE_COLLECTION).insertOne(newObject, (err, doc) => {
                if (err) resolve({ success: false, message: 'listing Creation Failed.', data: arryEmpty });
                else {
                    resolve({ success: true, message: ' saved successfully.', data: doc.ops });
                }
  
            });
  
  
        }
  
        catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }
    });
  },
//save addmaterial
funGetMaterialList:GetMaterialList = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {
            const newObject = {
                semester:obj.semester,
                subject:obj.subject,
                datCreateDateAndTime: new Date(),
                strStatus: 'N',
            }
            db.collection(config.MATERIAL_COLLECTION).insertOne(newObject, (err, doc) => {
                if (err) resolve({ success: false, message: 'listing Creation Failed.', data: arryEmpty });
                else {
                    resolve({ success: true, message: ' saved successfully.', data: doc.ops });
                }
  
            });
  
  
        }
  
        catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }
    });
  },
//question save
funAddQuestion: Question = (obj, db) => {
  return new Promise((resolve, reject) => {
      try {
          const newObject = {
              subject: obj.subject,
              year1: obj.year1,
              pdf1:obj.pdf1,
              year2: obj.year2,
              pdf2:obj.pdf2,
              year3: obj.year3,
              pdf3:obj.pdf3,
              datCreateDateAndTime: new Date(),
              strStatus: 'N',
            
          };
          db.collection(config.QUESTION_COLLECTION).insertOne(newObject, (err, doc) => {
              if (err) resolve({ success: false, message: 'adding Failed.', data: arryEmpty });
              else {
                  resolve({ success: true, message: 'added successfully.', data: doc.ops });
              }

          });


      }

      catch (e) {
          throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
      }
  });
},
//get list by id
 funGetCourseList:GetCourseList = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {
            const newObject = {
                semester: obj.semester,
                description : obj.description,
                datCreateDateAndTime: new Date(),
                strStatus: 'id',
            }
            db.collection(config.COURSE_COLLECTION).insertOne(newObject, (err, doc) => {
                if (err) resolve({ success: false, message: 'listing Creation Failed.', data: arryEmpty });
                else {
                    resolve({ success: true, message: ' saved successfully.', data: doc.ops });
                }
  
            });
  
  
        }
  
        catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }
    });
  },
//subject update
funUpdateCourse: UpdateCourse = (obj, db) => {
    console.log("funUpdateBookingDetails ---", obj)
    return new Promise((resolve, reject) => {
        try {

            let intsemesterId = obj.intsemesterId;

            var match = { $match: { _id: ObjectID(intsemesterId) } };
            db.collection(config.COURSE_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {

                        semester: obj.semester,
                        description: obj.description
                       
                    };
                    var query = { _id: ObjectID(intsemesterId) };
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
//update subject

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
//update material

funUpdatestudymaterial: Updatestudymaterial = (obj, db) => {
    console.log("funUpdateditems ---", obj)
    return new Promise((resolve, reject) => {
        try {

            let IntmaterialId = obj._id;    

            var match = { $match: { _id: ObjectID(IntmaterialId) } };
            db.collection(config.MATERIAL_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
                        semester: obj.semester,
                        subject: obj.subject

                    };
                    var query = { _id: ObjectID(IntmaterialId) };
                    db.collection(config.MATERIAL_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
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
//update item
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
//update net
funUpdateNet:UpdateNet = (obj, db) => {
    console.log("funUpdateditems ---", obj)
    return new Promise((resolve, reject) => {
        try {

            let intNetId = obj._id;    

            var match = { $match: { _id: ObjectID(intNetId) } };
            db.collection(config.NET_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
                        material: obj.material,
                        questionPaper: obj.questionPaper,
                        videoLink:obj.videoLink,

                    };
                    var query = { _id: ObjectID(intNetId) };
                    db.collection(config.NET_COLLECTION).updateOne(query, { $set: newObject }, (err, doc) => {
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
//update question
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
//update_question collection
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
//delete course
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
//delete item
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
//delete material
funDeletematerialDetails:deletematerialDetails = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {

            let IntmaterialId= obj._id;

            var match = { $match: { _id: ObjectID(IntmaterialId) } };
            db.collection(config.MATERIAL_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
              
                        strStatus: 'D',
                    };
                    var query = { _id: ObjectID(IntmaterialId) };
                    db.collection(config.MATERIAL_COLLECTION).update(query, { $set: newObject }, (err) => {
                        if (err) throw err

                        resolve({ success: true, message: 'material deleted successfully.', data: [newObject] });
                    })
                } else {
                    resolve({ success: false, message: 'material not found', data: arryEmpty });
                }
            });

        } catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }

    });
},
//delete question
funDeletequestionDetails:DeletequestionDetails = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {

            let IntquestionId = obj._id;

            var match = { $match: { _id: ObjectID(IntquestionId) } };
            db.collection(config.QUESTION_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
              
                        strStatus: 'D',
                    };
                    var query = { _id: ObjectID(IntquestionId) };
                    db.collection(config.QUESTION_COLLECTION).update(query, { $set: newObject }, (err) => {
                        if (err) throw err

                        resolve({ success: true, message: 'material deleted successfully.', data: [newObject] });
                    })
                } else {
                    resolve({ success: false, message: 'material not found', data: arryEmpty });
                }
            });

        } catch (e) {
            throw resolve({ success: false, message: 'System ' + e, data: arryEmpty });
        }

    });
},
//delete net
funDeleteNetDetails:DeleteNetDetails = (obj, db) => {
    return new Promise((resolve, reject) => {
        try {

            let intNetId = obj._id;

            var match = { $match: { _id: ObjectID(intNetId) } };
            db.collection(config.NET_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
              
                        strStatus: 'D',
                    };
                    var query = { _id: ObjectID(intNetId) };
                    db.collection(config.NET_COLLECTION).update(query, { $set: newObject }, (err) => {
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
