'use strict'

const Cliente = require('../models/cliente');
const Contacto = require('../models/contacto');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
const Direccion = require('../models/direccion');

const clienteController = {}

clienteController.create = async(req, res) => {
    var data = req.body;
    var cliente = await Cliente.find({ email: data.email });

    if (cliente.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    var reg = await Cliente.create(data);
                    res.status(200).send({ mensaje: reg });
                }
            });
        } else {
            res.status(200).send({ mensaje: 'no hay contraseña', data: undefined });
        }
    } else {
        res.status(200).send({ mensaje: 'Cliente ya existe', data: undefined });
    }
}

clienteController.login = async(req, res) => {
    const data = req.body;
    const cliente = await Cliente.find({ email: data.email });

    if (cliente.length == 0) {
        res.status(200).send({ message: 'No se encontro el correo', data: undefined });
    } else {
        let user = cliente[0];
        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'Contraseña no coincide', data: undefined });
            }
        });
    }
}

clienteController.listarFiltro = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {
            let filtro = req.params['filtro'];
            if (filtro == 'null' || filtro == null) {
                let reg = await Cliente.find({});
                res.status(200).send({ data: reg });
            } else {
                let regExp = new RegExp(filtro, 'i');
                let reg = await Cliente.find({ $or: [{ nombres: regExp }, { email: regExp }, { empresa: regExp }] });
                res.status(200).send({ data: reg });
            }
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.createAdmin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {
            var data = req.body;

            bcrypt.hash('123456789', null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({ data: reg });
                } else {
                    res.status(200).send({ message: 'Hubo un error en el servidor', data: undefined });
                }
            });
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.clienteAdmin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'administrador') {

            var id = req.params['id'];

            try {
                var reg = await Cliente.findById({ _id: id });
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined });
            }

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.actualizarAdmin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'administrador') {

            var id = req.params['id'];
            var data = req.body;

            var reg = await Cliente.findByIdAndUpdate({ _id: id }, {
                nombres: data.nombres,
                email: data.email,
                password: data.password,
                telefono: data.telefono,
                empresa: data.empresa,
                cedula: data.cedula
            })
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.eliminarAdmin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'administrador') {

            var id = req.params['id'];
            let reg = await Cliente.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.cliente_guest = async function(req, res) {
    if (req.user) {
            var id = req.params['id'];
            try {
                var reg = await Cliente.findById({ _id: id });
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined });
            }        
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.cliente_actualizar_guest = async function(req, res) {
    if (req.user) {
       
            var id = req.params['id'];
            var data = req.body;

            console.log(data.password);

            if(data.password){
                console.log('Con contraseña');
                bcrypt.hash(data.password,null,null, async function(err,hash){
                    var reg = await Cliente.findByIdAndUpdate({_id:id},{
                        nombres: data.nombres,
                        empresa: data.empresa,
                        telefono: data.telefono,
                        cedula: data.cedula,
                        pais: data.pais,
                        password: hash,
                    });
                    res.status(200).send({data:reg});
                });
                
            }else{
                console.log('sin contraseña');
                var reg = await Cliente.findByIdAndUpdate({_id:id},{
                    nombres: data.nombres,
                    empresa: data.empresa,
                    telefono: data.telefono,
                    cedula: data.cedula,
                    pais: data.pais,
                });
                res.status(200).send({data:reg});
            }
                  
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
} 

////CONTACTO////


clienteController.enviar_mensaje_contacto = async(req, res) => {
    let data = req.body;

    data.estado = 'Abierto';
    let reg = await Contacto.create(data);
    res.status(200).send({data:reg});
}
//Direccion
clienteController.registro_direccion = async function(req, res) {
    if(req.user){
            var data = req.body;
            
            if(data.principal){
                let direcciones = await Direccion.find({cliente: data.cliente});

                for(let direccion of direcciones) {
                    await Direccion.findByIdAndUpdate({_id: direccion._id}, {principal:false});
                }
            }

            let reg = await Direccion.create(data);
            res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.obtener_direcciones = async function(req, res) {
    if(req.user){
        var id = req.params['id'];
        let reg = await Direccion.find({cliente: id});
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.cambiar_direccion_principal = async function(req, res) {
    if(req.user){
        var id = req.params['id'];
        var cliente = req.params['cliente'];       
    
        let direcciones = await Direccion.find({cliente: cliente});
        for(let direccion of direcciones) {
            await Direccion.findByIdAndUpdate({_id: direccion._id}, {principal:false});
        }
        let reg = await Direccion.findByIdAndUpdate({_id: id}, {principal:true});
        res.status(200).send({ data: reg });
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

clienteController.obtener_direccion_principal = async function(req, res) {
    if(req.user){
        var id = req.params['id'];      
        
        let reg = await Direccion.findOne({cliente:id, principal:true});
        if(reg == undefined){
            res.status(200).send({ data: undefined });
        }else{
            console.log("Direccion:" +reg);
            res.status(200).send({ data: reg });
        }
    
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

module.exports = clienteController;