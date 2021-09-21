'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var configSchema = Schema({
    categorias: [{ type: String, required: true }],

});

module.exports = mongoose.model('configuracion', configSchema);