module.exports = (app, db) => {

    const express = require('express');
    var ObjectID = require("mongodb").ObjectID;
    const router = express.Router();
    /* const csv = require('fast-csv');
    const fs = require('fs');*/
    const config = require('../config/config');
    const common = require('../globel/common');
    const SERVICESMODELS = require('../models/services-model');
    const SERVICESREPORT  = require('../models/services-report');
    const arryEmpty =[];

    /*
    TODO:This api use Save service details in Data Base
    @Function: Save service details Data
    */
    app.post('/api/service/SaveNewService',common.verifyToken ,(req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
            if(common.isEmptyObject(obj)) {    
                res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
            } else {
                SERVICESMODELS.funServiceValidateDetails(strActionType,req,db).then(( result )=>{
                    if(result && result.success === true) {
                        SERVICESMODELS.funSaveServiceDetails(obj,db).then(( result )=>{
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
    TODO:This api use update service details in Data Base.
    @Function:update api for service.
    */
    app.post('/api/service/UpdateServiceDetails',common.verifyToken, (req,res) => {

        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                SERVICESMODELS.funServiceValidateDetails(strActionType,req,db).then(( result )=>{
                    if(result && result.success === true) {
                        SERVICESMODELS.funUpdateServiceDetails(obj,db).then(( result )=>{
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
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }

    });

    /*
    TODO:This api use delete service details in Data Base.
    @Function:delete api for service.
    */
    app.post('/api/service/DeleteServiceDetails',common.verifyToken, (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                SERVICESMODELS.funServiceValidateDeleteDetails(strActionType,req,db).then(( result )=>{
                    if(result && result.success === true) {
                        SERVICESMODELS.funDeleteServiceDetails(obj,db).then(( result )=>{
                            if(result && result.success === true) {
                                res.status(200).json(result)
                            }
                            else {
                                res.status(200).json(result)
                            }
                        });
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
    TODO:This api use List service details in Data Base
    @Function: Listing service details Data
    */
    app.post('/api/service/getServiceDetails',common.verifyToken,(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                SERVICESREPORT.funGetAllServiceDetails(obj,db).then(( result )=>{
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
    TODO:This api use List by service id  details in Data Base
    @Function: Listing by service id details Data
    */
    app.post('/api/service/getByServiceIdDetails',common.verifyToken,(req,res) => {
        console.log("result show ---",req.body)
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                SERVICESREPORT.funGetByServiceIdDetails(obj,db).then(( result )=>{
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