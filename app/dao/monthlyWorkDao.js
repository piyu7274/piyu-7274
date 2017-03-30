/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MMonthlyWork = require('app/db/models').MonthlyWork;

var monthlyWork= {
    findMonthlyWorkById:findMonthlyWorkById,
    deleteMonthlyWork:deleteMonthlyWork,
    addMonthlyWork:addMonthlyWork,
    updateMonthlyWork:updateMonthlyWork,
    findAllMonthlyWork:findAllMonthlyWork
};

function findMonthlyWorkById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MMonthlyWork.findOne(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });

}

function findAllMonthlyWork(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MMonthlyWork.findAll(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}


    function deleteMonthlyWork(condition, cb) {
        console.log('==>Invoking find function in dao');
        MMonthlyWork.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MMonthlyWork.destroy(condition)
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


    function updateMonthlyWork(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MMonthlyWork.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MMonthlyWork.update(payload, condition)
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


    function addMonthlyWork(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MMonthlyWork.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'monthlyWork exists'});
                }
                console.log(payload);
                MMonthlyWork.build(payload).save()
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
    module.exports = monthlyWork;



