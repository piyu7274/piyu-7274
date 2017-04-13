/**
 * Created by piyush on 22/2/17.
 */

require('rootpath')();
var _ = require('lodash'),
    authHelper = require('app/helper/auth'),
    debug = require('debug')('app.helper.auth'),
    MLogin = require('app/db/models').Login,
    moment = require('moment'),
    employeeService = require('app/services/employeeService');


var init = {
    login: userLogin,
    logout: logout
};

function userLogin(req, res, next) {
    console.log("****************** in login ********************");
    var input = req.body;

    verifyLogin(input, function (err, result) {
        if (err) {
            return res.status(500).send({message: err.message ? err.message : err});
        }
        debug('userLogin data : ', result);
        var condition = {
            where: {
              eId:result.eId
            }
        };
        var employeeCondition = {
           /* where: {
                eid: result.eId*/
            }
        
        if (result) {
            employeeService.getAllEmployee(employeeCondition, function (err, employee) {
                if (err) {
                    return res.status(500).send({message: err.message});
                }
                if (!employee) {
                    return res.status(401).send({message: 'User does not exists'})
                }

                return res.status(401).send({message: 'User does not exists'})

            })
        }
        authHelper.createJWT(result, function (err, token) {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            res.status(200).send({message: 'login successful', token: token, adminId: result.id});
        });

    });
}

function logout(req, res, next) {
    console.log("=====Logout=====");
    req.headers.authorization ='';
    res.status(200).send({message: 'logout successful', token: null});
}

var verifyLogin = function (input, callback) {
    /*var condition = {
        where: {username:'piyu7274', password: input.password}
    }*/
    MLogin.findOne({
        where: {username:(input.username).trim().toLowerCase() , password: input.password}
    }).then(function (data) {
        if (!data) {
            return callback({code: 401, message: 'Permission denied, wrong credentials'});
        }
        return callback(null, data.dataValues);
    }, function (error) {
        return callback({code: 500, message: error.message ? error.message : error});
    });

};


var encodeUserInfo = function (input, callback) {
    authHelper.createJWT(input, callback);
};

module.exports = init;