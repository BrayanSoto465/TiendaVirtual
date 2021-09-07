'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'dlegoarca';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombresC: user.nombres,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }
    return jwt.encode(payload,secret);
}