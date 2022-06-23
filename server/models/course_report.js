const config = require('../config/config');
const express = require('express');

var arryEmpty = [];
var ObjectID = require("mongodb").ObjectID;
module.exports = {
  //questionlist
  funGetQuestionList: QuestionList = (obj, db) => {
    console.log("getlist ====", obj)
    return new Promise((resolve, reject) => {
      try {
        var arrayAllObjData = [];
        var query = { strStatus: "N" };
        
        if (obj.subject)
        query.subject = obj.subject

        if (obj.year)
        query.year = obj.year

        if (obj.pdf)
        query.pdf = obj.pdf

        var intSkipCount = 0;
        var intPageLimit = 0;
        if (obj.intSkipCount)
        intSkipCount = parseInt(obj.intSkipCount);
        if (obj.intPageLimit)
        intPageLimit = parseInt(obj.intPageLimit);
        var Project = {
          $project: {
           
            subject:"$subject",
            year:"$year",
            pdf:"$pdf",

          }
        };
        db.collection(config.QUESTION_COLLECTION).find(query).count()
          .then((totalPageCount) => {
            if (totalPageCount) {
              if (!intPageLimit)
                intPageLimit = parseInt(totalPageCount);
              db.collection(config.QUESTION_COLLECTION).aggregate([{ $match: query },
              { $sort: { datCreateDateAndTime: -1 } },
              { "$skip": intSkipCount }, { "$limit": intPageLimit },
                Project
              ]).toArray((err, doc) => {
                console.log("doc ====", doc)
                if (err) throw err;
                if (doc) {
                  var objTotal = { intTotalCount: totalPageCount };
                              arrayAllObjData.push(doc);
                              arrayAllObjData.push(objTotal);
                  resolve({ success: true, message: 'Successfully.', data: doc });
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

//courselist
  funGetCourseList: CourseList = (obj, db) => {
    console.log("getlist ====", obj)
    return new Promise((resolve, reject) => {
      try {
        var arrayAllObjData = [];
        var query = { strStatus: "N" };

        if (obj.category)
        query.category = obj.category
        
        if (obj.semester)
        query.semester = obj.semester
        

        var intSkipCount = 0;
        var intPageLimit = 0;
        if (obj.intSkipCount)
        intSkipCount = parseInt(obj.intSkipCount);
        if (obj.intPageLimit)
        intPageLimit = parseInt(obj.intPageLimit);
        var Project = {
          $project: {
            id:"$_id",
            semester: "$semester",
            category:"$category",
          }
        };
        db.collection(config.COURSE_COLLECTION).find(query).count()
          .then((totalPageCount) => {
            if (totalPageCount) {
              if (!intPageLimit)
                intPageLimit = parseInt(totalPageCount);
              db.collection(config.COURSE_COLLECTION).aggregate([{ $match: query },
              { $sort: { datCreateDateAndTime: -1 } },
              { "$skip": intSkipCount }, { "$limit": intPageLimit },
                Project
              ]).toArray((err, doc) => {
                console.log("doc ====", doc)
                if (err) throw err;
                if (doc) {
                  var objTotal = { intTotalCount: totalPageCount };
                              arrayAllObjData.push(doc);
                              arrayAllObjData.push(objTotal);
                  resolve({ success: true, message: 'Successfully.', data: doc });
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
//subcategory
funGetsubcategoryList: subcategoryList = (obj, db) => {
  console.log("getlist ====", obj)
  return new Promise((resolve, reject) => {
    try {
      var arrayAllObjData = [];
      var query = {};
      
      if (obj.semester)
      query.semester = obj.semester

      var intSkipCount = 0;
      var intPageLimit = 0;
      if (obj.intSkipCount)
      intSkipCount = parseInt(obj.intSkipCount);
      if (obj.intPageLimit)
      intPageLimit = parseInt(obj.intPageLimit);
      var Project = {
        $project: {
          id:"$_id",
          semester: "$semester",

        }
      };
      db.collection(config.COURSE_COLLECTION).find(query).count()
        .then((totalPageCount) => {
          if (totalPageCount) {
            if (!intPageLimit)
              intPageLimit = parseInt(totalPageCount);
            db.collection(config.COURSE_COLLECTION).aggregate([{ $match: query },
            { $sort: { datCreateDateAndTime: -1 } },
            { "$skip": intSkipCount }, { "$limit": intPageLimit },
              Project
            ]).toArray((err, doc) => {
              console.log("doc ====", doc)
              if (err) throw err;
              if (doc) {
                var objTotal = { intTotalCount: totalPageCount };
                            arrayAllObjData.push(doc);
                            arrayAllObjData.push(objTotal);
                resolve({ success: true, message: 'Successfully.', data: doc });
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
//materiallist
funGetMaterialList: GetMaterialList = (obj, db) => {
  console.log("getlist ====", obj)
  return new Promise((resolve, reject) => {
    try {
      var arrayAllObjData = [];
      var query = { strStatus: "N" };
      
      if (obj.semester)
      query.semester = obj.semester

      if (obj.subject)
      query.subject = obj.subject

      var intSkipCount = 0;
      var intPageLimit = 0;
      if (obj.intSkipCount)
      intSkipCount = parseInt(obj.intSkipCount);
      if (obj.intPageLimit)
      intPageLimit = parseInt(obj.intPageLimit);
      var Project = {
        $project: {
          id:"$_id",
          semester: "$semester",
          subject:"$subject"
        }
      };
      db.collection(config.MATERIAL_COLLECTION).find(query).count()
        .then((totalPageCount) => {
          if (totalPageCount) {
            if (!intPageLimit)
              intPageLimit = parseInt(totalPageCount);
            db.collection(config.MATERIAL_COLLECTION).aggregate([{ $match: query },
            { $sort: { datCreateDateAndTime: -1 } },
            { "$skip": intSkipCount }, { "$limit": intPageLimit },
              Project
            ]).toArray((err, doc) => {
              console.log("doc ====", doc)
              if (err) throw err;
              if (doc) {
                var objTotal = { intTotalCount: totalPageCount };
                            arrayAllObjData.push(doc);
                            arrayAllObjData.push(objTotal);
                resolve({ success: true, message: 'Successfully.', data: doc });
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
//NETlist
funGetNetList: GetNetList = (obj, db) => {
  console.log("getlist ====", obj)
  return new Promise((resolve, reject) => {
    try {
      var arrayAllObjData = [];
      var query = { strStatus: "N" };
      
      if (obj.material)
      query.material = obj.material

      if (obj.questionPaper)
      query.questionPaper = obj.questionPaper

      var intSkipCount = 0;
      var intPageLimit = 0;
      if (obj.intSkipCount)
      intSkipCount = parseInt(obj.intSkipCount);
      if (obj.intPageLimit)
      intPageLimit = parseInt(obj.intPageLimit);
      var Project = {
        $project: {
          id:"$_id",
          material: "$material",
          questionPaper: "$questionPaper",
        }
      };
      db.collection(config.NET_COLLECTION).find(query).count()
        .then((totalPageCount) => {
          if (totalPageCount) {
            if (!intPageLimit)
              intPageLimit = parseInt(totalPageCount);
            db.collection(config.NET_COLLECTION).aggregate([{ $match: query },
            { $sort: { datCreateDateAndTime: -1 } },
            { "$skip": intSkipCount }, { "$limit": intPageLimit },
              Project
            ]).toArray((err, doc) => {
              console.log("doc ====", doc)
              if (err) throw err;
              if (doc) {
                var objTotal = { intTotalCount: totalPageCount };
                            arrayAllObjData.push(doc);
                            arrayAllObjData.push(objTotal);
                resolve({ success: true, message: 'Successfully.', data: doc });
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
//itemlist

funGetItemList: GetItemList = (obj, db) => {
    console.log("dfisnc ====", obj)
    return new Promise((resolve, reject) => {
        try {
            var arrayAllObjData = [];
            var query = { strStatus: "N" };
            
            if (obj.fieldName)
            query.fieldName = obj.fieldName

            if (obj. description)
            query. description = obj. description

            var intSkipCount = 0;
            var intPageLimit = 0;
            if (obj.intSkipCount)
            intSkipCount = parseInt(obj.intSkipCount);
            if (obj.intPageLimit)
            intPageLimit = parseInt(obj.intPageLimit);
            var Project = {
                $project: {
                    id:"$_id",
                    fieldName:"$fieldName",
                    description:"$description" 
                }
            };
            db.collection(config.ITEM_COLLECTION).find(query).count()
                .then((totalPageCount) => {
                    if (totalPageCount) {
                        if (!intPageLimit)
                            intPageLimit = parseInt(totalPageCount);
                        db.collection(config.ITEM_COLLECTION).aggregate([{ $match: query },
                        { $sort: { datCreateDateAndTime: -1 } },
                        { "$skip": intSkipCount }, { "$limit": intPageLimit },
                            Project
                        ]).toArray((err, doc) => {
                            if (err) throw err;
                            if (doc) {
                              var objTotal = { intTotalCount: totalPageCount };
                              arrayAllObjData.push(doc);
                              arrayAllObjData.push(objTotal);
                                resolve({ success: true, message: 'Successfully.', data: doc});
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
}

