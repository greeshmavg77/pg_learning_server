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
    const BOOKINGMODELS = require('../models/booking-model');
    const BOOKINGREPORT  = require('../models/booking-report');
    const arryEmpty =[];

    /*
    TODO:This api use Save booking details in Data Base
    @Function: Save booking details Data
    */
    app.post('/api/booking/SaveNewBooking',common.verifyToken ,(req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
            if(common.isEmptyObject(obj)) {    
                res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
            } else {
                
                BOOKINGMODELS.funBookingValidateDetails(strActionType,obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        BOOKINGMODELS.funSaveBookingDetails(obj,db).then(( result )=>{
                            if(result && result.success === true) {
                                res.status(200).json(result)
                            } else {
                                res.status(200).json(result)
                            }
                        });
                    } else {
                        res.status(200).json(result)
                    }
                });
            }
    
        } catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }
 
    });

    /*
    TODO:This api use update booking details in Data Base.
    @Function:update api for booking.
    */
    // app.post('/api/booking/Subject', (req,res) => {
    //     try{
    //         var obj = req.body;
    //         var strActionType ="UPDATE";
    //         if(!obj) {
    //             res.json({success: false, message: 'Parameter missing',data:arryEmpty});
    //         } else {
    //                     BOOKINGMODELS.funUpdateCourse(obj,db).then(( result )=>{
    //                         if(result && result.success === true) {
    //                             res.status(200).json(result)
    //                         } else {
    //                             res.status(200).json(result)
    //                         }
    //                     });
    //         }
    //     }catch (e) {
    //         console.log("Error",e);
    //         res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    //     }

    // });
   
    // app.post('/api/booking/UpdateItem', (req,res) => {
    //     try{
    //         var obj = req.body;
    //         var strActionType ="UPDATE";
    //         if(!obj) {
    //             res.json({success: false, message: 'Parameter missing',data:arryEmpty});
    //         } else {
    //                     BOOKINGMODELS.funUpdateItem(obj,db).then(( result )=>{
    //                         if(result && result.success === true) {
    //                             res.status(200).json(result)
    //                         } else {
    //                             res.status(200).json(result)
    //                         }
    //                     });
    //         }
    //     }catch (e) {
    //         console.log("Error",e);
    //         res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    //     }

    // });

    // app.post('/api/booking/updateQuestion', (req,res) => {
    //     try{
    //         var obj = req.body;
    //         var strActionType ="UPDATE";
    //         if(!obj) {
    //             res.json({success: false, message: 'Parameter missing',data:arryEmpty});
    //         } else {
    //                     BOOKINGMODELS.funupdateQuestion(obj,db).then(( result )=>{
    //                         if(result && result.success === true) {
    //                             res.status(200).json(result)
    //                         } else {
    //                             res.status(200).json(result)
    //                         }
    //                     });
    //         }
    //     }catch (e) {
    //         console.log("Error",e);
    //         res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    //     }

    // });
   

    /*
    TODO:This api use update booking status details in Data Base.
    @Function:update api for booking status.
    */
    app.post('/api/booking/UpdateBookingStatusDetails',common.verifyToken, (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                    BOOKINGMODELS.funUpdateBookingStatusDetails(obj,db).then(( result )=>{
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

    /*
    TODO:This api use delete booking details in Data Base.
    @Function:delete api for booking.
    */
    // app.post('/api/course/DeleteCourseDetails',(req,res) => {
    //     try{
    //         var obj = req.body;
    //         var strActionType ="UPDATE";
    //         if(!obj) {
    //             res.json({success: false, message: 'Parameter missing',data:arryEmpty});
    //         } else {
    //             // BOOKINGMODELS.funBookingValidateDeleteDetails(strActionType,req,db).then(( result )=>{
    //             //     if(result && result.success === true) {
    //                     BOOKINGMODELS.funDeleteCourseDetails(obj,db).then(( result )=>{
    //                         if(result && result.success === true) {
    //                             res.status(200).json(result)
    //                         }
    //                         else {
    //                             res.status(200).json(result)
    //                         }
    //                     });
    //             //   } else {
    //             //         res.status(200).json(result)
    //             //     }
    //             // });
    //         }
    //     }catch (e) {
    //         console.log("Error",e);
    //         res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    //     }

    // });

    // app.post('/api/course/DeleteItemDetails',(req,res) => {
    //     try{
    //         var obj = req.body;
    //         var strActionType ="UPDATE";
    //         if(!obj) {
    //             res.json({success: false, message: 'Parameter missing',data:arryEmpty});
    //         } else {
    //             // BOOKINGMODELS.funBookingValidateDeleteDetails(strActionType,req,db).then(( result )=>{
    //             //     if(result && result.success === true) {
    //                     BOOKINGMODELS.funDeleteItemDetails(obj,db).then(( result )=>{
    //                         if(result && result.success === true) {
    //                             res.status(200).json(result)
    //                         }
    //                         else {
    //                             res.status(200).json(result)
    //                         }
    //                     });
    //             //   } else {
    //             //         res.status(200).json(result)
    //             //     }
    //             // });
    //         }
    //     }catch (e) {
    //         console.log("Error",e);
    //         res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    //     }

    // });

      /*
    TODO:This api use List booking details in Data Base
    @Function: Listing booking details Data
    */
    app.post('/api/booking/getBookingDetails',(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                BOOKINGREPORT.funGetAllBookingDetails(obj,db).then(( result )=>{
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

      /*
    TODO:This api use List by booking id details in Data Base
    @Function: Listing by booking id details Data
    */
    app.post('/api/booking/getByBookingIdDetails',common.verifyToken,(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                BOOKINGREPORT.funGetByBookingIdDetails(obj,db).then(( result )=>{
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



}