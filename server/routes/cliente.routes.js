'use strict'

const { Router } = require('express');
const router = Router();

const clienteController = require('../controllers/cliente.controller');

router.post('/registro', clienteController.create);
router.post('/login', clienteController.login);

module.exports = router;
