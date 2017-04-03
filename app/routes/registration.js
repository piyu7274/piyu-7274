/**
 * Created by piyush on 31/3/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
registrationService = require('app/services/registrationService');

var registration = {
    addRegistration:addRegistration
}


function addRegistration(req, res) {

    var input = req.body;
    console.log(input);
/*
    var payload = {
        username:'piyu7274',password:'piyu7274'
    };*/
    var payload={
        username:input.username,
        password:input.password
    }
/*
    var condition={
        where:{username:'piyu7274'},
        attributes:['username','password']
    }*/

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


module.exports = registration;
