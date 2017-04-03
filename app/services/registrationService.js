/**
 * Created by piyush on 31/3/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    registrationDao = require('app/dao/registrationDao');



var registration = {
    addRegistration:addRegistration
};

function addRegistration(payload, condition, cb) {
    //log.info('Invoking getDevices function in services');
    console.log('service:', payload);
    registrationDao.addRegistration(payload, condition, function (err, data) {
        if (err) {
            debug('==>caught error in registration: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }

        return cb(null, {code: 200, message: data.message});

        // return res.status(200).json({"result":"abcd"})

        //  return cb(null, {code: 200, message: data});

    });
}
module.exports = registration;