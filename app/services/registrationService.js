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
    addRegistration:addRegistration,
    getRegistrationById:getRegistrationById,
    getAllRegistration:getAllRegistration
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
    });
}

function getRegistrationById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    registrationDao.findRegistrationById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for registration: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no registration in list : ');
            return cb(null, {code: 404, message: 'No registration'});
        }
        return cb(null, {code: 200, message: data});
    });

}


function getAllRegistration(condition, cb) {
    //log.info('Invoking getDevices function in services');
    registrationDao.findAllRegistration(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for qualification: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
       // return cb(null, {code: 200, message: data});


        var result = [];
        var registrationDetails = {};
        async.map(data, function (registration) {
            console.log(registration);
            var id = registration.qId;
            var registrationObj = registration[id];
            registrationObj = {
                eId: id,
                username: registration.college ? registration.college : '-',
                password: registration.password ? registration.password : '-'
            }
            registrationDetails[id] = registrationObj;
        });
        debug('==>registration result : ', registrationDetails);
        result = _.values(registrationDetails);
        return cb(null, {code: 200, message: result});
    });
}
module.exports = registration;