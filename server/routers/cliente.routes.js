'use strict'

const { Router } = require('express');
const router = Router();

const clienteController = require('../controllers/cliente.controller');

router.post('/login', clienteController.create);
router.get('/registro', clienteController.login);

module.exports = router;
