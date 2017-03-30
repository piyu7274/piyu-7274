

require('rootpath')();
var config = require('config'),
    debug = require('debug')('app.helpers.auth'),
    log = require('utils/logger')(module),
    moment = require('moment'),
    jwt = require('jwt-simple');

var auth = {
    decodeToken: function (authorization, callback) {
        var token = authorization.split(' ')[1];
        try {
            var payload = jwt.decode(token, config.token.secret);
            callback(null, payload);
        } catch (err) {
            callback({message: err.message})
        }
    },

    createJWT: function (user, callback) {
        var payload = {
            sub: user.id,
            schoolId: user.schoolId,
            exp: moment().add(config.token.expiry, 'seconds').unix()
        };
        if(user.role){
            payload.role = user.role;
        }
        if(user.name){
            payload.name = user.name
        }
        if(user.username){
            payload.username = user.username
        }

        if (user.schoolCode) {
            payload.schoolCode = user.schoolCode;
        }
        if (user.registrationCode) {
            payload.registrationCode = user.registrationCode;
        }
        if (user.phone) {
            payload.phone = user.phone;
        }

        debug('--->JWT Payload - ', payload);
        log.info('--->JWT Payload - ', payload);

        return callback(null, jwt.encode(payload, config.token.secret));
    },

    createParentJWT: function (user, callback) {
        var payload = {
            sub: user.id,
            schoolId: user.schoolId
        };
        if(user.role){
            payload.role = user.role;
        }
        if(user.name){
            payload.name = user.name
        }
        if(user.username){
            payload.username = user.username
        }

        if (user.schoolCode) {
            payload.schoolCode = user.schoolCode;
        }
        if (user.registrationCode) {
            payload.registrationCode = user.registrationCode;
        }
        if (user.phone) {
            payload.phone = user.phone;
        }

        debug('--->JWT Payload - ', payload);
        log.info('--->JWT Payload - ', payload);

        return callback(null, jwt.encode(payload, config.token.secret));
    },

    ensureAuthenticated: function (req, res, next) {
        if (!req.headers.authorization) {
            log.error('------------> Token not present <---------------');
            return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
        }

        var tokenDetail;
        if (tokenDetail = req.headers.authorization.split(' ').length !== 2) {
            log.error('--->Invalid token');
            return res.status(401).json({message: "Invalid token"});
        }

        auth.decodeToken(req.headers.authorization, function (err, payload) {
            if (err) {
                //log.error('--->Invalid token');
                return res.status(401).json({message: "Invalid token --> failed to validate token"});
            }
            if (payload.exp < moment.unix()) {
                //log.error('--->Expired token');
                return res.status(401).json({message: "Expired token"});
            }
            if (!payload.schoolId && (payload.role !== 'superadmin')) {
                log.error('--->school id is missing<---');
                return res.status(401).json({message: "school id is missing"});
            }
            payload.id = payload.sub;
            req.user = payload;
            return next();
        })

    }
};

module.exports = auth;
