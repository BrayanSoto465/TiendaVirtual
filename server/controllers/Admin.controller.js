'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs')

const adminController = {}

adminController.createAdmin = async (req, res) => {
    const data = req.body;
    const admin = await Admin.find({email: data.email});

    if(admin.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if(hash){
                    data.password = hash;
                    var reg = await Admin.create(data);
                    res.status(200).send({mensaje:reg});
                }    
            });
        }else{
            res.status(200).send({mensaje:'no hay contraseña',data: undefined});
        }
    }else{
        res.status(200).send({mensaje:'Admin ya existe',data: undefined});
    }
}

module.exports = adminController;