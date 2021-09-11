'use strict'

const { Router } = require('express');
const router = Router();

const clienteController = require('../controllers/cliente.controller');
const auth = require('../middlewares/authenticate');

router.post('/registro', clienteController.create);
router.post('/login', clienteController.login);
router.get('/listar/:filtro?',auth.auth, clienteController.listarFiltro);

module.exports = router;