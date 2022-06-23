

const config = require('../config/config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

var arryEmpty = [];

var upperCase = require('upper-case');

/*
     TODO @Function:
     */

module.exports = {
    crypto: require("crypto"),
    funGetNextDocumentNumber:getNextDocNo=(objDoc,db)=> {
        return new Promise((resolve, reject) => {
            try{
                resolve(db.collection(config.DOCUMENT_NUMBER_COLLECTION).find({ strModuleName: objDoc.strModuleName  }, {
                    _id: 0,
                    intDocumentNumber: -1
                }).sort({ intDocumentNumber: -1 }).limit(1).toArray());
            }catch (e) {
                throw resolve( { success: false, message: 'System '+e, data: arryEmpty });
            }

        });
    },

// return password salt and hash
    setPassword: function (password) {
        salt = this.crypto.randomBytes(16).toString('hex');
        hash = this.crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');
        return { salt: salt, hash: hash };
    },
// validate password with exsisting
    validPassword: function (password, doc) {
        console.log("password ----",password)
        console.log("doc ----",doc)
        var hash = this.crypto.pbkdf2Sync(password, doc.prePassword, 1000, 64, 'sha1').toString('hex');
        return { hash: hash };
    },

    verifyToken: (req, res, next) =>{
      
        try {
            const bearerHeader = req.headers['authorization'];
           
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ');
                const bearertoken = bearer[1];
                req.token = bearertoken; 
                jwt.verify(req.token, config.JWT_SECRET, (err, decoded) => { 
                    if (err) {
                        return res.json({ success: false, message: 'Token Error', data: err })
                    } 
                    if (!decoded) {
                        return res.status(401).end();
                    } else {
                        req.user = decoded.user;
                        next();
                    }
                })
            } else {
                return res.json({ success: false, message: 'Header Authorization Error', data: 'Header Authorization Error' })
            }

        } catch (e) {
            res.status(500).json({ success: false, message: "Error: No authorization header present ::" + e, data: [] });
        }

    },

    isEmptyObject:(obj)=>{
        return !Object.keys(obj).length;
    },
    

};

