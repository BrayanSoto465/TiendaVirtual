'use strict'

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

app.set('port', process.env.PORT || 4201);

mongoose
    .connect('mongodb://127.0.0.1:27017/tienda', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then((db) => console.log('Db is connected'))
    .catch((err) => console.error(err));

app.listen(app.get('port'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb',extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api/administrador', require('./routers/admin.routes'));
app.use('/api/cliente', require('./routers/cliente.routes'));

module.exports = app;