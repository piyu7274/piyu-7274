/**
 * Created by piyush on 31/3/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
registrationService = require('app/services/registrationService');

var registration = {
    addRegistration:addRegistration,
    getRegistrationById:getRegistrationById
}


function addRegistration(req, res) {
    var input = req.body;
    console.log(input);
    var payload={
        username:input.username,
        password:input.password
    }
    var condition={
        where:{  username:input.username,
            password:input.password},
        attributes:['username','password']
    }
    registrationService.addRegistration(payload, condition, function (err, result) {
        if (err) {
            debug('==>caught error in adding for leave : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);
    });
}

function getRegistrationById(req, res) {
    debug('==>Searching registration  : ');
    var id = req.params.id;
    var condition = {
         where: {eId: id},
        attributes: ['eId','username', 'password']
    }
   registrationService.getRegistrationById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for registration : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

function getAllRegistration(req, res) {
    debug('==>Searching registrations  : ');
    var condition={ attributes: ['eId','username', 'password']}
    registrationService.getAllRegistration(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for registrations : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}
module.exports = registration;
