'use strict'

const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/cliente.controller');

router.post('/registro', adminController.createAdmin);

module.exports = router;