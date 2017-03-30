/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    parentDao = require('app/dao/parentDao');


var parent = {
    getParentById:getParentById,
    deleteParent:deleteParent,
    addParent:addParent,
    updateParent:updateParent,
    getAllParent:getAllParent
};

function getParentById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    parentDao.findParentById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for parent: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no parent in list : ');
            return cb(null, {code: 404, message: 'No parent'});
        }
        return cb(null, {code: 200, message: data});

    });
}



function getAllParent(condition, cb) {
    //log.info('Invoking getDevices function in services');
    parentDao.findAllParent(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for department: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        return cb(null, {code: 200, message: data});

        var result = [];
        var parentDetails = {};
        async.map(data, function (parent) {
            console.log(parent);
            var id = parent.pId;
            var parentObj = parent[id];
            parentObj = {
                pId: id,
                fatherName: parent.fatherName ? parent.fatherName : '-',
                motherName: parent.motherName ? parent.motherName : '-',
                parentContact: parent.parentContact ? parent.parentContact : '-',
                parentAddress: parent.parentAddress ? parent.parentAddress : '-',
                city: parent.city ? parent.city : '-',
                state: parent.state ? parent.state : '-'
            }
            parentDetails[id] = parentObj;
        });
        debug('==>parent result : ', parentDetails);
        result = _.values(parentDetails);
        return cb(null, {code: 200, message: result});
    });
}

    function deleteParent(condition, cb) {
        //log.info('Invoking getDevices function in services');
        parentDao.deleteParent(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  parent: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateParent(payload,condition, cb) {
        //log.info('Invoking getDevices function in services');
        parentDao.updateParent(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  parent: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addParent(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        parentDao.addParent(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding parent: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    module.exports = parent;

