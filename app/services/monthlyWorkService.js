/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    monthlyWorkDao = require('app/dao/monthlyWorkDao');

var monthlyWork= {
    getMonthlyWorkById:getMonthlyWorkById,
    deleteMonthlyWork:deleteMonthlyWork,
    addMonthlyWork:addMonthlyWork,
    updateMonthlyWork:updateMonthlyWork,
    getAllMothlyWork:getAllMothlyWork
};
function getMonthlyWorkById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    monthlyWorkDao.findMonthlyWorkById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for monthlyWork: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no monthlyWork in list : ');
            return cb(null, {code: 404, message: 'No monthlyWork'});
        }
        return cb(null, {code: 200, message: data});
    });
}


function getAllMothlyWork(condition, cb) {
    //log.info('Invoking getDevices function in services');
    monthlyWorkDao.findAllMonthlyWork(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for department: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        //return cb(null, {code: 200, message: data});


        var result = [];
        var monthlyWorkDetails = {};
        async.map(data, function (monthlyWork) {
            var id = monthlyWork.mId;
            var monthlyWorkObj = monthlyWork[id];
            monthlyWorkObj = {
                mId: id,
                eId: monthlyWork.eId ? monthlyWork.eId : '-',
                workHour: monthlyWork.workHour ? monthlyWork.workHour : '-',
                daysOff: monthlyWork.daysOff ? monthlyWork.daysOff : '-',
                overTime: monthlyWork.overTime ? monthlyWork.overTime : '-',
                fromDate: monthlyWork.fromDate ? monthlyWork.fromDate : '-',
                toDate: monthlyWork.toDate ? monthlyWork.toDate : '-',
                workMonth: monthlyWork.workMonth ? monthlyWork.workMonth : '-'
            }
            monthlyWorkDetails[id] = monthlyWorkObj;
        });
        debug('==>employee result : ', monthlyWorkDetails);
        result = _.values(monthlyWorkDetails);
        return cb(null, {code: 200, message: result});
    });
}

    function deleteMonthlyWork(condition, cb) {
        //log.info('Invoking getDevices function in services');
        monthlyWorkDao.deleteMonthlyWork(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  monthlyWork: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateMonthlyWork(payload,condition, cb) {
        //log.info('Invoking getDevices function in services');
        monthlyWorkDao.updateMonthlyWork(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  monthlyWork: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addMonthlyWork(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        monthlyWorkDao.addMonthlyWork(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding monthlyWork: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    module.exports = monthlyWork;

