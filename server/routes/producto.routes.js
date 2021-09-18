'use strict'

const { Router } = require('express');
const router = Router();

const productoController = require('../controllers/producto.controller');
const auth = require('../middlewares/authenticate');

const multiparty = require('connect-multiparty');
const path = multiparty({uploadDir: './uploads/productos'});


router.post('/productoAdmin', [auth.auth,path], productoController.productoAdmin);


module.exports = router;