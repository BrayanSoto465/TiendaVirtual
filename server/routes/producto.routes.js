'use strict'

const { Router, application } = require('express');
const router = Router();

const productoController = require('../controllers/producto.controller');
const auth = require('../middlewares/authenticate');

const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/productos' });

router.post('/producto/administrador', [auth.auth, path], productoController.productoAdmin);
router.get('/listar/:filtro?', auth.auth, productoController.listarFiltro);
router.get('/portada/:img', productoController.obtenerPortada);
router.get('/productooAdmin/:id', auth.auth, productoController.productooAdmin);
router.put('/actualizarAdmin/:id', [auth.auth, path], productoController.actualizarAdmin);
router.delete('/eliminar_producto/:id', [auth.auth, path], productoController.eliminar_producto);

module.exports = router;