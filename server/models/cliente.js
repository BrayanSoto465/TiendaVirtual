'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = Schema({
    nombres: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, default: 'perfil.png', required: true },
    telefono: { type: String, required: false },
    empresa: { type: String, required: false },
    created: { type: Date, default: Date.now, require: true },
    f_nacimiento: { type: Date, required: true }
});

module.exports = mongoose.model('cliente', clienteSchema);