/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    employeeDao = require('app/dao/employeedao');


var login= {

};
function verifyLogin(input, cb) {
    //var code = input.activationCode.split('#');
    var code = input.activationCode;
    //var schoolCode = code[0];
    //var registrationCode = code[1];
    MParent.findOne({
        where: {phone: input.phone, registrationCode: code}
    }).then(function (data) {
        if (!data) {
            return cb({message: 'Invalid Credentials'});
        }
        return cb(null, data.dataValues);
    }, function (err) {
        return cb({message: err.message ? err.message : err});
    });



}
    module.exports = employee;

