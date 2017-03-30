/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MQualification= require('app/db/models').Qualification;

var qualification = {
    findQualificationById:findQualificationById,
    deleteQualification:deleteQualification,
    addQualification:addQualification,
    updateQualification:updateQualification,
    findAllQualification:findAllQualification
};

function findQualificationById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MQualification.findOne(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });

}

function findAllQualification(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MQualification.findAll(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}


    function deleteQualification(condition, cb) {
        console.log('==>Invoking find function in dao');
        MQualification.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MQualification.destroy(condition)
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


    function updateQualification(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MQualification.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MQualification.update(payload, condition)
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


    function addQualification(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MQualification.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'qualification exists'});
                }
                console.log(payload);
                MQualification.build(payload).save()
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

    module.exports = qualification;



