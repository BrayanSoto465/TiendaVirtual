'use strict'

const { Router } = require('express');
const router = Router();

const productoController = require('../controllers/producto.controller');
const auth = require('../middlewares/authenticate');

const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/productos' });

router.post('/producto/administrador', [auth.auth, path], productoController.productoAdmin);
router.get('/listar/:filtro?', auth.auth, productoController.listarFiltro);
router.get('/Portada/:img',productoController.obtenerPortada);

module.exports = router;