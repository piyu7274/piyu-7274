/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    //moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MLogin = require('app/db/models').Login;

var employee = {
    findEmployee:findEmployee,
    deleteEmployee:deleteEmployee,
    updateEmployee:updateEmployee,
    addEmployee:addEmployee
};

function findEmployee(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MLogin.findOne(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });


//return res.status(200).json({"result":"abcd"})


    function deleteEmployee(condition, cb) {
        console.log('==>Invoking find function in dao');
        MLogin.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MLogin.destroy(condition)
                        .then(function (result) {
                            console.log("successfully delete");
                            cb(null, {message: 'successfully delete'});
                        }, function (err) {
                            cb(err);
                        })
                }

            }, function (err) {
                return cb(err);
            });

    }


    function updateEmployee(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MLogin.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MLogin.update(payload, condition)
                        .then(function (result) {
                            console.log("successfully delete");
                            cb(null, {message: 'successfully Updated'});
                        }, function (err) {
                            cb(err);
                        })
                }

            }, function (err) {
                return cb(err);
            });

    }


    function addEmployee(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        console.log('dao:', MEmployee);
        MLogin.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'employee exists'});
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


    };
}
    module.exports = employee;



