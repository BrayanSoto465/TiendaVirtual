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
router.get('/cliente_guest/:id',auth.auth,clienteController.cliente_guest);
router.put('/cliente_actualizar_guest/:id',auth.auth,clienteController.cliente_actualizar_guest);

//CONTACTO

router.post('/enviar_mensaje_contacto', clienteController.enviar_mensaje_contacto);

module.exports = router;