'use strict'

const Admin = require('../models/admin');
const Contacto = require('../models/contacto');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const adminController = {}


adminController.create = async(req, res) => {
    const data = req.body;
    const admin = await Admin.find({ email: data.email });

    if (admin.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    var reg = await Admin.create(data);
                    res.status(200).send({ mensaje: reg });
                }
            });
        } else {
            res.status(200).send({ mensaje: 'no hay contraseña', data: undefined });
        }
    } else {
        res.status(200).send({ mensaje: 'Admin ya existe', data: undefined });
    }
}

adminController.login = async(req, res) => {
    const data = req.body;
    const administrador = await Admin.find({ email: data.email });

    if (administrador.length == 0) {
        res.status(200).send({ message: 'No se encontro el correo', data: undefined });
    } else {
        let user = administrador[0];
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

adminController.obtener_mensajes_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            let reg = await Contacto.find().sort({createAt : -1});
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

adminController.cerrar_mensaje_admin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            let id = req.params['id'];

            let reg = await Contacto.findByIdAndUpdate({_id:id},{estado: 'Cerrado'});
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

module.exports = adminController;