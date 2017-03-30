/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    moment = require('moment'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    departmentDao = require('app/dao/departmentDao');


var department = {
    getDepartmentById:getDepartmentById,
    deleteDepartment:deleteDepartment,
    addDepartment:addDepartment,
    updateDepartment:updateDepartment,
    getAllDepartment:getAllDepartment
};


function getDepartmentById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    departmentDao.findDepartmentById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for department: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no department in list : ');
            return cb(null, {code: 404, message: 'No department'});
        }
        return cb(null, {code: 200, message: data});
    });
}


function getAllDepartment(condition, cb) {
    //log.info('Invoking getDevices function in services');
    departmentDao.findAllDepartment(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for department: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
       // return cb(null, {code: 200, message: data});


        var result = [];
        var departmentDetails = {};
        async.map(data, function (department) {
            console.log(department);
            var id = department.dId;
            var departmentObj = department[id];
            departmentObj = {
                dId: id,
                eId: department.eId ? department.eId : '-',
                department: department.department? department.department : '-',
                designation: department.designation ? department.designation : '-',
                monthlySalary: department.monthlySalary ? department.monthlySalary : '-'
            }
            departmentDetails[id] = departmentObj;
        });
        debug('==>department result : ', departmentDetails);
        result = _.values(departmentDetails);
        return cb(null, {code: 200, message: result});
    });
}



    function deleteDepartment(condition, cb) {
        //log.info('Invoking getDevices function in services');
        departmentDao.deleteDepartment(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  department: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateDepartment(payload,condition, cb) {
        //log.info('Invoking getDevices function in services');
        departmentDao.updateDepartment(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  department: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addDepartment(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        departmentDao.addDepartment(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding department: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    module.exports = department;

