'use strict'

const Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');
const { Console } = require('console');

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
            console.log();
            res.status(200).send({ data: reg });
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

productoController.listarFiltro = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {
            let filtro = req.params['filtro'];
            if (filtro == 'null' || filtro == null) {
                let reg = await Producto.find({});
                res.status(200).send({ data: reg });
            } else {
                let regExp = new RegExp(filtro, 'i');
                let reg = await Producto.find({ $or: [{ titulo: regExp }, { descripcion: regExp }, { contenido: regExp }, { categoria: regExp }] });
                res.status(200).send({ data: reg });
            }
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

productoController.obtenerPortada = async(req, res) => {
    var img = req.params['img'];

    fs.stat('uploads/productos/' + img, function(err) {
        if (!err) {
            let path_img = 'uploads/productos/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        } else {
            let path_img = 'uploads/productos/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

productoController.productooAdmin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'administrador') {

            var id = req.params['id'];

            try {
                var reg = await Producto.findById({ _id: id });
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

productoController.actualizarAdmin = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            let id = req.params['id'];
            let data = req.body;

            console.log(req.files);

            if (req.files) {
                var img_path = req.files.portada.path;
                var name = img_path.split('\\');
                var portada_name = name[2];

                let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    portada: portada_name
                });

                fs.stat('uploads/productos/' + reg.portada, function(err) {
                    if (!err) {
                        fs.unlink('uploads/productos/' + reg.portada, (err) => {
                            if (err) throw err;
                        });
                    }
                })

                res.status(200).send({ data: reg });
            } else {
                let reg = await Producto.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    stock: data.stock,
                    precio: data.precio,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                });
                res.status(200).send({ data: reg });
            }
        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

productoController.eliminar_producto = async(req, res) => {
    if (req.user) {
        if (req.user.role == 'administrador') {

            var id = req.params['id'];
            let reg = await Producto.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg });

        } else {
            res.status(500).send({ message: 'NoAcces' });
        }
    } else {
        res.status(500).send({ message: 'NoAcces' });
    }
}

module.exports = productoController;