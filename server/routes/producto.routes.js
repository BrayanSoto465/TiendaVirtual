'use strict'

const { Router, application } = require('express');
const router = Router();

const productoController = require('../controllers/producto.controller');
const auth = require('../middlewares/authenticate');

const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/productos' });

router.post('/crear_producto', [auth.auth, path], productoController.crear_producto);
router.get('/listar_producto_filtro/:filtro?', auth.auth, productoController.listar_producto_filtro);
router.get('/obtener_portada/:img', productoController.obtener_portada);
router.get('/obtener_producto/:id', auth.auth, productoController.obtener_producto);
router.put('/actualizar_producto/:id', [auth.auth, path], productoController.actualizar_producto);
router.delete('/eliminar_producto/:id', [auth.auth, path], productoController.eliminar_producto);

module.exports = router;