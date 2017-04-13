/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    moment = require('moment'),
    employeeDao = require('app/dao/employeedao');


var employee= {
    getEmployeeById:getEmployeeById,
    deleteEmployee:deleteEmployee,
    addEmployee:addEmployee,
    updateEmployee:updateEmployee,
    getAllEmployee:getAllEmployee
};

function getEmployeeById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    employeeDao.findEmployeeById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for employees: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no employee in list : ');
            return cb(null, {code: 404, message: 'No employee'});
        }
        console.log(data);
        return cb(null, {code: 200, message: data});
    });
}

function getAllEmployee(condition, cb) {
    //log.info('Invoking getDevices function in services');
    employeeDao.findAllEmployee(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for department: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        //return cb(null, {code: 200, message: data});

        var result = [];
        var employeeDetails = {};
        async.map(data, function (employee) {
            console.log(employee);
            var id = employee.eId;
            var employeeObj = employee[id];
            employeeObj = {
                eId: id,
                name: employee.name ? employee.name : '-',
                age: employee.age ? employee.age : '-',
                DOB: employee.DOB ? employee.DOB : '-',
                Email: employee.Email ? employee.Email : '-',
                address: employee.address ? employee.address : '-',
                city: employee.city ? employee.city : '-',
                state: employee.state ? employee.state : '-',
                postalCode: employee.postalCode ? employee.postalCode : '-',
                contactNo: employee.contactNo ? employee.contactNo : '-',
                qualification: employee.qualification? employee.qualification : '-',
                gender: employee.gender ? employee.gender : '-',
                currentExp: employee.currentExp ? employee.currentExp : '-',
                marritalStatus: employee.marritalStatus ? employee.marritalStatus : '-'
            }
            employeeDetails[id] = employeeObj;
        });
        debug('==>employee result : ', employeeDetails);
        result = _.values(employeeDetails);
        return cb(null, {code: 200, message: result});


    });
}

    function deleteEmployee(condition, cb) {
        //log.info('Invoking getDevices function in services');
        employeeDao.deleteEmployee(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  employees: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateEmployee(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        employeeDao.updateEmployee(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  employees: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addEmployee(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        employeeDao.addEmployee(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding employees: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    module.exports = employee;

