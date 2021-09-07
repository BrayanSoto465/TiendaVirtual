'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');

const registro_cliente = async function(req,res){
    //
    var data = req.body;
    var clientes_arr =[];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){
        /*  */

        if(data.password){
            bcrypt.hash(data.password,null,null, async function(err,hash){
                if(hash){
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ERROR',data:undefined});
                }
            })
        }else{
            res.status(200).send({message:'no hay una contraseña',data:undefined});
        }

        
    }else{
        res.status(200).send({message:'El correo ya existe',data:undefined});
    }

   
    
   

    
}

const login_cliente = async function(req,res){
    var data = req.body;
    var cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined});
    }else{
        let user = cliente_arr[0];

        bcrypt.compare(data.email, user.email, async function(res,check){
            if(check){
               /*  "camilo termine esta parte" */
            }

        });

        if(user.password == data.email){
            res.status(200).send({data:user});
        }else{
            res.status(200).send({message: 'La contraseña no coincide', data: undefined});
        }
       
        
    }

   
}

module.exports = {
    registro_cliente,
    login_cliente
}