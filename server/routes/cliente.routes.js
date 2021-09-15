'use strict'

const { Router } = require('express');
const router = Router();

const clienteController = require('../controllers/cliente.controller');
const auth = require('../middlewares/authenticate');

router.post('/registro', clienteController.create);
router.post('/login', clienteController.login);
router.get('/listar/:filtro?', auth.auth, clienteController.listarFiltro);
router.post('/registro/administrador', auth.auth, clienteController.createAdmin);
router.get('/clienteAdmin/:id',auth.auth,clienteController.clienteAdmin);
router.put('/ActualizarAdmin/:id',auth.auth,clienteController.ActualizarAdmin);
router.delete('/EliminarAdmin/:id',auth.auth,clienteController.EliminarAdmin); 

module.exports = router;