'use strict'

const Producto = require('../models/producto');

const productoController = {}

productoController.productoAdmin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            let data = req.body;
            var img_path = req.files.portada.path;

            var name = img_path.split('\\');
            var portada_name = name[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = portada_name;
            let reg = Producto.create(data);

            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

module.exports = productoController;