'use strict'

const { Router } = require('express');
const router = Router();

const clienteController = require('../controllers/cliente.controller');
const auth = require('../middlewares/authenticate');

router.post('/registro', clienteController.create);
router.post('/login', clienteController.login);
router.get('/listar/:filtro?', auth.auth, clienteController.listarFiltro);
router.post('/registro/administrador', auth.auth, clienteController.createAdmin);
router.get('/cliente/administrador/:id', auth.auth, clienteController.clienteAdmin);
router.put('/actualizar/administrador/:id', auth.auth, clienteController.actualizarAdmin);
router.delete('/Eliminar/administrador/:id', auth.auth, clienteController.eliminarAdmin);

module.exports = router;