/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    leaveDao = require('app/dao/leaveDao');

var leave = {
    getLeaveById:getLeaveById,
    deleteLeave:deleteLeave,
    addLeave:addLeave,
    updateLeave:updateLeave,
    getAllLeave:getAllLeave
};;

function getLeaveById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    leaveDao.findLeaveById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for leave: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no leave in list : ');
            return cb(null, {code: 404, message: 'No leave'});
        }
        return cb(null, {code: 200, message: data});
    });
}


function getAllLeave(condition, cb) {
    //log.info('Invoking getDevices function in services');
    leaveDao.findAllLeave(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for department: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        //return cb(null, {code: 200, message: data});


        var result = [];
        var leaveDetails = {};
        async.map(data, function (leave) {
            console.log(leave);
            var leaveObj = leave[id];
            leaveObj = {
                lId: leave.lId,
                eId: leave.eId ? leave.eId : '-',
                holiday: leave.holiday ? leave.holiday : '-',
                leaveDays: leave.leaveDays ? leave.leaveDays : '-',
                leaveFrom: leave.leaveFrom ? leave.leaveFrom : '-',
                leaveTo: leave.leaveTo ? leave.leaveTo : '-',
                leaveType: leave.leaveType ? leave.leaveType : '-',
                leaveMonth: leave.leaveMonth ? leave.leaveMonth : '-'
            }
            leaveDetails[id] = leaveObj;
        });
        debug('==>leave result : ', leaveDetails);
        result = _.values(leaveDetails);
        return cb(null, {code: 200, message: result});
    });
}

    function deleteLeave(condition, cb) {
        //log.info('Invoking getDevices function in services');
        leaveDao.deleteLeave(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  leave: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateLeave(payload,condition, cb) {
        //log.info('Invoking getDevices function in services');
        leaveDao.updateLeave(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  leave: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addLeave(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        leaveDao.addLeave(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding leave: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    module.exports = leave;

