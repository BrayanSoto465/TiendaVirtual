'use strict'

const { Router } = require('express');
const router = Router();

var auth = require('../middlewares/authenticate');

const clienteController = require('../controllers/cliente.controller');

router.post('/registro', clienteController.create);
router.post('/login', clienteController.login);
router.get('/listar/:filtro?', clienteController.listarFiltro);
router.post('/registro/administrador', auth.auth, clienteController.createAdmin);

module.exports = router;