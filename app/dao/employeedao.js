/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MEmployee = require('app/db/models').Employee;

var employee = {
    findEmployeeById:findEmployeeById,
    deleteEmployee:deleteEmployee,
    updateEmployee:updateEmployee,
    addEmployee:addEmployee,
    findAllEmployee:findAllEmployee
};

function findEmployeeById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MEmployee.findOne(condition)
        .then(function (result) {
            if(!result){
                cb(null, {message: 'Data Not Found'});
            }
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });

}



function findAllEmployee(condition,cb) {
    console.log('==>Invoking findAll function in dao');
    MEmployee.findAll(condition)
        .then(function (result) {
           //console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}


    function deleteEmployee(condition, cb) {
        console.log('==>Invoking find function in dao');
        MEmployee.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MEmployee.destroy(condition)
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
        MEmployee.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MEmployee.update(payload, condition)
                        .then(function (result) {
                            console.log("successfully updated");
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
        
                MEmployee.build(payload).save()
                    .then(function (result) {
                        console.log("successfully added");
                        cb(null, {message: 'successfully added'});
                    }, function (err) {
                        console.log(err);
                        cb(err);
                    })

            

    }


    module.exports = employee;



