/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MLeave= require('app/db/models').Leave;

var leave = {
    findLeaveById:findLeaveById,
    deleteLeave:deleteLeave,
    addLeave:addLeave,
    updateLeave:updateLeave,
    findAllLeave:findAllLeave
};


function findLeaveById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MLeave.findOne(condition)
        .then(function (result) {
            if(!result){
                cb(null, {message: 'Data Not Found'});
            }
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });
}


function findAllLeave(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MLeave.findAll(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}


    function deleteLeave(condition, cb) {
        console.log('==>Invoking find function in dao');
        MLeave.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MLeave.destroy(condition)
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


    function updateLeave(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MLeave.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MLeave.update(payload, condition)
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


    function addLeave(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MLeave.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'leave exists'});
                }
                console.log(payload);
                MLeave.build(payload).save()
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

    module.exports = leave;



