'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    cliente: { type: Schema.ObjectId, ref:'cliente', required: true },
    nventas: { type: String, required: true },
    subtotal: { type: Number, required: true },
    envio_titulo: { type: String, required: true },
    envio_precio: { type: Number, required: true },
    transaccion: { type: String, required: true },
    estado: { type: String, required: true },
    direccion: { type: Schema.ObjectId,ref:'direccion', required: true },
    nota: { type: String, required: true },
    created: { type: Date, default: Date.now, require: true },
});

module.exports = mongoose.model('venta', VentaSchema);
