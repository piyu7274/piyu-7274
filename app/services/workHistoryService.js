/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    workHistoryDao = require('app/dao/workHistoryDao');


var workHistory= {
    getWorkHistoryById:getWorkHistoryById,
    deleteWorkHistory:deleteWorkHistory,
    addWorkHistory:addWorkHistory,
    updateWorkHistory:updateWorkHistory,
    getAllWorkHistory:getAllWorkHistory
};


function getWorkHistoryById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    workHistoryDao.findWorkHistoryById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for workHistory: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no workHistory in list : ');
            return cb(null, {code: 404, message: 'No workHistory'});
        }
        return cb(null, {code: 200, message: data});

        // return res.status(200).json({"result":"abcd"})

        //  return cb(null, {code: 200, message: data});

    });
}



function getAllWorkHistory(condition, cb) {
    debug('==>Searching workHistory  : ');

    var condition={attributes: ['wId', 'eId', 'name','companyname', 'address', 'city', 'state', 'companyName','employee_mob', 'officeContact']}
    workHistoryDao.findAllWorkHistory(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
       // return res.status(result.code).json(result.message);

        var result = [];
        var workHistoryDetails = {};
        async.map(data, function (workHistory) {
            console.log(workHistory);
            var id = workHistory.wId;
            var workHistoryObj = workHistory[id];
            workHistoryObj = {
                wId: id,
                eId: workHistory.eId ? workHistory.eId : '-',
                name: workHistory.name ? workHistory.name : '-',
                companyName: workHistory.companyname ? workHistory.companyname : '-',
                address: workHistory.address ? workHistory.address : '-',
                city: workHistory.city ? workHistory.city : '-',
                state: workHistory.state? workHistory.state : '-',
                employee_mob: workHistory.employee_mob ? workHistory.employee_mob : '-',
                officeContact: workHistory.officeContact ? workHistory.officeContact : '-'
            }
            workHistoryDetails[id] = workHistoryObj;
        });
        debug('==>workHistory result : ', workHistoryDetails);
        result = _.values(workHistoryDetails);
        return cb(null, {code: 200, message: result});
    });
}

    function deleteWorkHistory(condition, cb) {
        //log.info('Invoking getDevices function in services');
        workHistoryDao.deleteWorkHistory(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  workHistory: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateWorkHistory(payload,condition, cb) {
        //log.info('Invoking getDevices function in services');
        workHistoryDao.updateWorkHistory(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  workHistory: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addWorkHistory(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        workHistoryDao.addWorkHistory(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding workHistory: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });


}

    module.exports = workHistory;

