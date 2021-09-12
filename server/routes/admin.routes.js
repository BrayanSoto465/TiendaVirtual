'use strict'

const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/admin.controller');

router.post('/registro', adminController.create);
router.post('/login', adminController.login);
router.get('/listar', adminController.listarFiltro);

module.exports = router;