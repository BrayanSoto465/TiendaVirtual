'use strict'

const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');

const adminController = {}


adminController.create = async (req, res) => {
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

adminController.login = async (req,res) => {
    const data = req.body;
    const administrador = await Admin.find({ email:data.email });
    
    if(administrador.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        let user = administrador[0];
        bcrypt.compare(data.password, user.password, async function(error, check){
            if(check){
                res.status(200).send({message: user});
            }else{
                res.status(200).send({message: 'Contraseña no coincide', data: undefined});
            }    
        });
    }   
}

module.exports = adminController;