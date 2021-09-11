'use strict'

const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/admin.controller');

router.post('/registro', adminController.create);
router.post('/login', adminController.login);
router.post('/listar_clientes_filtro', adminController.listarFiltro);

module.exports = router;