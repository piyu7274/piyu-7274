/**
 * Created by piyush on 22/2/17.
 */
'use strict';

require('rootpath')();
var _ = require('lodash'),
    async = require('async');
var debug = require('debug')('app.routes.employee');

var //log = require('utils/logger')(module),
    qualificationDao = require('app/dao/qualificationDao');


var qualification = {
    getQualificationById:getQualificationById,
    deleteQualification:deleteQualification,
    addQualification:addQualification,
    updateQualification:updateQualification,
    getAllQualification:getAllQualification
};

function getQualificationById(condition, cb) {
    //log.info('Invoking getDevices function in services');
    qualificationDao.findQualificationById(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for qualification: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
        if (!data) {
            debug('==>no qualification in list : ');
            return cb(null, {code: 404, message: 'No qualification'});
        }
        return cb(null, {code: 200, message: data});
    });

}


function getAllQualification(condition, cb) {
    //log.info('Invoking getDevices function in services');
    qualificationDao.findAllQualification(condition, function (err, data) {
        if (err) {
            debug('==>caught error in searching for qualification: ');
            return cb({code: 500, message: err.message ? err.message : err.toString});
        }
       // return cb(null, {code: 200, message: data});


        var result = [];
        var qualificationDetails = {};
        async.map(data, function (qualification) {
            console.log(qualification);
            var id = qualification.qId;
            var qualificationObj = qualification[id];
            qualificationObj = {
                qId: id,
                eId: qualification.eId ? qualification.eId : '-',
                college: qualification.college ? qualification.college : '-',
                university: qualification.university ? qualification.university : '-',
                grad_Type: qualification.grad_Type ? qualification.grad_Type : '-',
                pgrad_Type: qualification.pgrad_Type ? qualification.pgrad_Type : '-',
                marks10: qualification.marks10 ? qualification.marks10 : '-',
                marks12: qualification.marks12 ? qualification.marks12 : '-',
                grad_per_grade: qualification.grad_per_grade? qualification.grad_per_grade : '-'
            }
            qualificationDetails[id] = qualificationObj;
        });
        debug('==>qualification result : ', qualificationDetails);
        result = _.values(qualificationDetails);
        return cb(null, {code: 200, message: result});
    });
}


    function deleteQualification(condition, cb) {
        //log.info('Invoking getDevices function in services');
        qualificationDao.deleteQualification(condition, function (err, data) {
            if (err) {
                debug('==>caught error in deleting  qualification: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function updateQualification(payload,condition, cb) {
        //log.info('Invoking getDevices function in services');
        qualificationDao.updateQualification(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in updating  qualification: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    function addQualification(payload, condition, cb) {
        //log.info('Invoking getDevices function in services');
        console.log('service:', payload);
        qualificationDao.addQualification(payload, condition, function (err, data) {
            if (err) {
                debug('==>caught error in adding qualification: ');
                return cb({code: 500, message: err.message ? err.message : err.toString});
            }

            return cb(null, {code: 200, message: data.message});

            // return res.status(200).json({"result":"abcd"})

            //  return cb(null, {code: 200, message: data});

        });
    }


    module.exports = qualification;

