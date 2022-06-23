const { request } = require('express');
const { USER_COLLECTION } = require('../config/config');


module.exports = (app, db) => {

  const express = require('express');
  var ObjectID = require("mongodb").ObjectID;
  const router = express.Router();
  /* const csv = require('fast-csv');
  const fs = require('fs');*/
  const config = require('../config/config');
  const common = require('../globel/common');
  const COURSEMODELS = require('../models/course-model');
  const COURSEREPORT = require('../models/course_report');
//   const MODELS = require('');

  const arryEmpty = [];
//course save
app.post('/api/course/Course', (req, res) => {
  console.log("sdgas ==---", req.body)
  try {
      var obj = req.body;
      if (common.isEmptyObject(obj)) {
          res.json({ success: false, message: 'Parameter missing', data: arryEmpty });
      } else {

          COURSEMODELS.funAddCourse(obj, db).then((result) => {
              if (result && result.success === true) {
                  res.status(200).json(result)
              }
              else {
                  res.status(200).json(result)
              }
          });
      }
  } catch (e) {
      console.log("Error", e);
      res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
  }

});
//courselistget
app.post('/api/course/getCourseList',  (req, res) => {
    try {
        var obj = req.body
        if (!obj) {
            res.json({ success: false, message: 'Params missing', data: arryEmpty });
        } else {
          COURSEREPORT.funGetCourseList(obj, db).then((result) => {
                if (result && result.success === true) {
                    res.status(200).json(result)
                }
                else {
                    res.status(200).json(result)
                }
            });
        }
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
    }
  
  
  });
  //save studymaterial
  app.post('/api/material/studymaterial',(req,res) => {
    console.log("show her -----",req.body)
    try{
        var obj = req.body
        if(!obj){
            res.json({success: false, message: 'Params missing',data:arryEmpty});
        } else {
            COURSEMODELS.funGetMaterialList(obj,db).then(( result )=>{
                if(result && result.success === true) {
                    res.status(200).json(result)
                }else {
                    res.status(200).json(result)
                }
            });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }
});
//studymateriallist
app.post('/api/material/getMaterialList',  (req, res) => {
    try {
        var obj = req.body
        if (!obj) {
            res.json({ success: false, message: 'Params missing', data: arryEmpty });
        } else {
          COURSEREPORT.funGetMaterialList(obj, db).then((result) => {
                if (result && result.success === true) {
                    res.status(200).json(result)
                }
                else {
                    res.status(200).json(result)
                }
            });
        }
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
    }
  
  
  });
//item save
app.post('/api/course/Item', (req, res) => {
  console.log("added ==---", req.body)
  try {
      var obj = req.body;
      if (common.isEmptyObject(obj)) {
          res.json({ success: false, message: 'Parameter missing', data: arryEmpty });
      } else {

          COURSEMODELS.funAddItem(obj, db).then((result) => {
              if (result && result.success === true) {
                  res.status(200).json(result)
              }
              else {
                  res.status(200).json(result)
              }
          });
      }
  } catch (e) {
      console.log("Error", e);
      res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
  }

});
//itemlist
app.post('/api/course/ItemList',(req,res) => {
    console.log("show her -----",req.body)
    try{
        var obj = req.body
        if(!obj){
            res.json({success: false, message: 'Params missing',data:arryEmpty});
        } else {
            COURSEMODELS.funGetItemList(obj,db).then(( result )=>{
                if(result && result.success === true) {
                    res.status(200).json(result)
                }else {
                    res.status(200).json(result)
                }
            });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }
});
//itemgetlist
app.post('/api/course/GetItemList',(req,res) => {
    console.log("show her -----",req.body)
    try{
        var obj = req.body
        if(!obj){
            res.json({success: false, message: 'Params missing',data:arryEmpty});
        } else {
            COURSEREPORT.funGetItemList(obj,db).then(( result )=>{
                if(result && result.success === true) {
                    res.status(200).json(result)
                }else {
                    res.status(200).json(result)
                }
            });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }
});
//question save
app.post('/api/course/Question', (req, res) => {
  console.log("added ==---", req.body)
  try {
      var obj = req.body;
      if (common.isEmptyObject(obj)) {
          res.json({ success: false, message: 'Parameter missing', data: arryEmpty });
      } else {

          COURSEMODELS.funAddQuestion(obj, db).then((result) => {
              if (result && result.success === true) {
                  res.status(200).json(result)
              }
              else {
                  res.status(200).json(result)
              }
          });
      }
  } catch (e) {
      console.log("Error", e);
      res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
  }

});

//questionlist
app.post('/api/course/getQuestionList',(req, res) => {
  try {
     
      var obj = req.body
      if (!obj) {
          res.json({ success: false, message: 'Params missing', data: arryEmpty });
      } else {
        COURSEREPORT.funGetQuestionList(obj, db).then((result) => {
              if (result && result.success === true) {
                  res.status(200).json(result)
              }
              else {
                  res.status(200).json(result)
              }
          });
      }
  } catch (e) {
      console.log("Error", e);
      res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
  }

});

//subject save
app.post('/api/booking/Subject', (req,res) => {
    try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
                    COURSEMODELS.funUpdateCourse(obj,db).then(( result )=>{
                        if(result && result.success === true) {
                            res.status(200).json(result)
                        } else {
                            res.status(200).json(result)
                        }
                    });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }

});
//NETsave
app.post('/api/course/net', (req, res) => {
    console.log("sdgas ==---", req.body)
    try {
        var obj = req.body;
        if (common.isEmptyObject(obj)) {
            res.json({ success: false, message: 'Parameter missing', data: arryEmpty });
        } else {
  
            COURSEMODELS.funAddNet(obj, db).then((result) => {
                if (result && result.success === true) {
                    res.status(200).json(result)
                }
                else {
                    res.status(200).json(result)
                }
            });
        }
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
    }
  
  });
//NETlist
app.post('/api/course/netList',(req, res) => {
    try {
       
        var obj = req.body
        if (!obj) {
            res.json({ success: false, message: 'Params missing', data: arryEmpty });
        } else {
          COURSEREPORT.funGetNetList(obj, db).then((result) => {
                if (result && result.success === true) {
                    res.status(200).json(result)
                }
                else {
                    res.status(200).json(result)
                }
            });
        }
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
    }
  
  });
//subcategory
app.post('/api/course/subcategoryList',(req, res) => {
    try {
       
        var obj = req.body
        if (!obj) {
            res.json({ success: false, message: 'Params missing', data: arryEmpty });
        } else {
          COURSEREPORT.funGetsubcategoryList(obj, db).then((result) => {
                if (result && result.success === true) {
                    res.status(200).json(result)
                }
                else {
                    res.status(200).json(result)
                }
            });
        }
    } catch (e) {
        console.log("Error", e);
        res.status(500).json({ success: false, message: "Error:" + e, data: arryEmpty });
    }
  
  });
//update item
app.post('/api/booking/UpdateItem', (req,res) => {
    try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
                    COURSEMODELS.funUpdateItem(obj,db).then(( result )=>{
                        if(result && result.success === true) {
                            res.status(200).json(result)
                        } else {
                            res.status(200).json(result)
                        }
                    });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }

});
//update question
app.post('/api/booking/updateQuestion', (req,res) => {
    try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
                    COURSEMODELS.funupdateQuestion(obj,db).then(( result )=>{
                        if(result && result.success === true) {
                            res.status(200).json(result)
                        } else {
                            res.status(200).json(result)
                        }
                    });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }

});
//delete course
app.post('/api/course/DeleteCourseDetails',(req,res) => {
    try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
            // COURSEMODELS.funBookingValidateDeleteDetails(strActionType,req,db).then(( result )=>{
            //     if(result && result.success === true) {
                    COURSEMODELS.funDeleteCourseDetails(obj,db).then(( result )=>{
                        if(result && result.success === true) {
                            res.status(200).json(result)
                        }
                        else {
                            res.status(200).json(result)
                        }
                    });
            //   } else {
            //         res.status(200).json(result)
            //     }
            // });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }

});
//delete item
app.post('/api/course/DeleteItemDetails',(req,res) => {
    try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
            // COURSEMODELS.funBookingValidateDeleteDetails(strActionType,req,db).then(( result )=>{
            //     if(result && result.success === true) {
                    COURSEMODELS.funDeleteItemDetails(obj,db).then(( result )=>{
                        if(result && result.success === true) {
                            res.status(200).json(result)
                        }
                        else {
                            res.status(200).json(result)
                        }
                    });
            //   } else {
            //         res.status(200).json(result)
            //     }
            // });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }

}); 
}