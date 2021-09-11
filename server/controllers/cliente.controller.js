'use strict'

const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const clienteController = {}

clienteController.create = async (req, res) => {
    var data = req.body;
    var cliente = await Cliente.find({email: data.email});

    if(cliente.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if(hash){
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({mensaje:reg});
                }    
            });
        }else{
            res.status(200).send({mensaje:'no hay contraseña',data: undefined});
        }
    }else{
        res.status(200).send({mensaje:'Cliente ya existe',data: undefined});
    } 
}

clienteController.login = async (req,res) => {
    const data = req.body;
    const cliente = await Cliente.find({ email:data.email });
    
    if(cliente.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        let user = cliente[0];
        bcrypt.compare(data.password, user.password, async function(error, check){
            if(check){
                res.status(200).send({
                    message: user,
                    token: jwt.createToken(user)
                });
            }else{
                res.status(200).send({message: 'Contraseña no coincide', data: undefined});
            }    
        });
    }   
}

clienteController.listarFiltro = async (req, res) => {
    const reg = await Cliente.find();
    res.status(200).send({data: reg});
}

module.exports = clienteController;