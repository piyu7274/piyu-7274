/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MDepartment = require('app/db/models').Department;

var department = {
    findDepartmentById:findDepartmentById,
    deleteDepartment:deleteDepartment,
    updateDepartment:updateDepartment,
    addDepartment:addDepartment,
    findAllDepartment:findAllDepartment
};

function findDepartmentById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MDepartment.findOne(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });

}


function findAllDepartment(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MDepartment.findAll(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}

    function deleteDepartment(condition, cb) {
        console.log('==>Invoking find function in dao');
        MDepartment.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MDepartment.destroy(condition)
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


    function updateDepartment(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MDepartment.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MDepartment.update(payload, condition)
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


    function addDepartment(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MDepartment.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'department exists'});
                }
                console.log(payload);
                MDepartment.build(payload).save()
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

module.exports = department;



