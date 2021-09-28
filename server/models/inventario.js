'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    producto: { type: Schema.ObjectId, ref: 'producto', required: true },
    cantidad: {type: Number, require:true},
    admin: { type: Schema.ObjectId, ref: 'admin', required: true },
    proveedor: {type: String, require: true},
    created: { type: Date, default: Date.now, require: false },
    
});

module.exports = mongoose.model('inventario', InventarioSchema);