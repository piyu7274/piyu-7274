/**
 * Created by piyush on 22/2/17.
 */

require('rootpath')();
      moment = require('moment'),
    debug = require('debug')('app.helper.auth'),

    jwt = require('jwt-simple');

var auth = {
    decodeToken: function (authorization, callback) {
        var token = authorization.split(' ')[1];
        try {
            var payload = jwt.decode(token, 'abc');
            callback(null, payload);
        } catch (err) {
            callback({message: err.message})
        }
    },

    createJWT: function (user, callback) {
        var payload = {
            sub: user.id,
            eId: user.eId,
            exp: moment().add(80400, 'seconds').unix()
        };
        if(user.username){
            payload.username = user.username
        }

        if (user.eId) {
            payload.eId = user.eId;
        }
        if (user.password) {
            payload.password = user.password;
        }

        debug('--->JWT Payload - ', payload);
        return callback(null, jwt.encode(payload,'abc'));
    },


    ensureAuthenticated: function (req, res, next) {

        console.log("=======ensureAuthenticated=================");
        if (!req.headers.authorization) {

            return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
        }

        var tokenDetail;
        if (tokenDetail = req.headers.authorization.split(' ').length !== 2) {
            return res.status(401).json({message: "Invalid token"});
        }

        auth.decodeToken(req.headers.authorization, function (err, payload) {
            if (err) {

                return res.status(401).json({message: "Invalid token --> failed to validate token"});
            }
            if (payload.exp < moment.unix()) {

                return res.status(401).json({message: "Expired token"});
            }
            if (!payload.eId ) {
                return res.status(401).json({message: "id is missing"});
            }
            payload.eId = payload.sub;
            req.user = payload;
            return next();
        })

    }
};

module.exports = auth;
