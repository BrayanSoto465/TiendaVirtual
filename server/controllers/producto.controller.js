'use strict'

const Producto = require('../models/producto');

const productoController = {}

productoController.productoAdmin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            
            let data = req.body;
            console.log(data);
            console.log(req.files);

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

module.exports = productoController;