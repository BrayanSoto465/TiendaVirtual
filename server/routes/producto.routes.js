'use strict'

const { Router, application } = require('express');
const router = Router();

const productoController = require('../controllers/producto.controller');
const auth = require('../middlewares/authenticate');

const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/productos' });

//Productos
router.post('/crear_producto', [auth.auth, path], productoController.crear_producto);
router.get('/listar_producto_filtro/:filtro?', auth.auth, productoController.listar_producto_filtro);
router.get('/obtener_portada/:img', productoController.obtener_portada);
router.get('/obtener_producto/:id', auth.auth, productoController.obtener_producto);
router.put('/actualizar_producto/:id', [auth.auth, path], productoController.actualizar_producto);
router.delete('/eliminar_producto/:id', [auth.auth, path], productoController.eliminar_producto);
router.put('/actualizar_producto_variedades/:id', auth.auth, productoController.actualizar_producto_vaiedades);

//Inventario
router.get('/listar_producto/:id', auth.auth, productoController.listar_producto);
router.delete('/eliminar_inventario/:id', auth.auth, productoController.eliminar_inventario);
router.post('/crear_inventario', auth.auth, productoController.crear_inventario);

module.exports = router;