/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    //moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MWorkingHistory = require('app/db/models').WorkingHistory;

var workHistory= {
    findWorkHistoryById:findWorkHistoryById,
    deleteWorkHistory:deleteWorkHistory,
    addWorkHistory:addWorkHistory,
    updateWorkHistory:updateWorkHistory,
    findAllWorkHistory:findAllWorkHistory
};

function findWorkHistoryById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MWorkingHistory.findOne(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });
}


function findAllWorkHistory(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MWorkingHistory.findAll(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}


    function deleteWorkHistory(condition, cb) {
        console.log('==>Invoking find function in dao');
        MWorkingHistory.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MWorkingHistory.destroy(condition)
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


    function updateWorkHistory(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MWorkingHistory.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MWorkingHistory.update(payload, condition)
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


    function addWorkHistory(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MWorkingHistory.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'workHistory exists'});
                }
                console.log(payload);
                MWorkingHistory.build(payload).save()
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

    module.exports = workHistory;



