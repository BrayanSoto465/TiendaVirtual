'use strict'

const { Router } = require('express');
const router = Router();

const configController = require('../controllers/config.Controller');
const auth = require('../middlewares/authenticate');

const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/configuraciones' });

router.put('/actualizar_config/:id', [auth.auth,path], configController.actualizar_config);
router.get('/obtener_config/', auth.auth,configController.obtener_config);


module.exports = router;