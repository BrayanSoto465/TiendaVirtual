'use strict'

const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/admin.controller');

router.post('/registro', adminController.create);

module.exports = router;