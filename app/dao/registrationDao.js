/**
 * Created by piyush on 31/3/17.
 */

var //log = require('utils/logger')(module),
    moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MLogin= require('app/db/models').Login;




var registration = {
    addRegistration:addRegistration
};
function addRegistration(payload, condition, cb) {
    console.log('==>Invoking find function in dao');
    MLogin.find(condition)
        .then(function (result) {
            console.log(result)
            if (result) {
                return cb(null, {code: 409, message: 'User exists'});
            }
            console.log(payload);
            MLogin.build(payload).save()
                .then(function (result) {
                    console.log("successfully added");
                    cb(null, {message: 'successfully added'});
                }, function (err) {
                    console.log(err);
                    cb(err);
                });

        }, function (err) {
            cb(err);
        });
}
module.exports = registration;