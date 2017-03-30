/**
 * Created by piyush on 22/2/17.
 */


var //log = require('utils/logger')(module),
    //moment = require('moment'),
    debug = require('debug')('app.routes.employee'),

    MParent = require('app/db/models').Parent;

var parent = {
    findParentById:findParentById,
    deleteParent:deleteParent,
    addParent:addParent,
    updateParent:updateParent,
    findAllParent:findAllParent
};


function findParentById(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MParent.findOne(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result.dataValues);
        }, function (err) {
            return cb(err);
        });

}

function findAllParent(condition,cb) {
    console.log('==>Invoking findOne function in dao');
    MParent.findAll(condition)
        .then(function (result) {
            console.log(result);
            return cb(null, result);
        }, function (err) {
            return cb(err);
        });
}


    function deleteParent(condition, cb) {
        console.log('==>Invoking find function in dao');
        MParent.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MParent.destroy(condition)
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


    function updateParent(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MParent.find(condition)
            .then(function (result) {
                // console.log(result)
                if (result) {
                    MParent.update(payload, condition)
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


    function addParent(payload, condition, cb) {
        console.log('==>Invoking find function in dao');
        MParent.find(condition)
            .then(function (result) {
                console.log(result)
                if (result) {
                    return cb(null, {code: 409, message: 'parent exists'});
                }
                console.log(payload);
                MParent.build(payload).save()
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

    module.exports = parent;



