/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
monthlyWorkService = require('app/services/monthlyWorkService');

var monthlyWork= {
    getMonthlyWorkById:getMonthlyWorkById,
    deleteMonthlyWork:deleteMonthlyWork,
    addMonthlyWork:addMonthlyWork,
    updateMonthlyWork:updateMonthlyWork,
    getAllMonthlyWork:getAllMonthlyWork
};


function getMonthlyWorkById(req, res) {


    debug('==>Searching monthlyWork  : ');
    var id = req.params.id;
    var condition = {
        where: {mId: id},
        attributes: ['mId', 'eId','workHour', 'daysOff', 'overTime', 'fromDate', 'toDate', 'workMonth']
    }
    monthlyWorkService.getMonthlyWorkById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for monthlyWork : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}


function getAllMonthlyWork(req, res) {
    debug('==>Searching monthly work  : ');

    var condition={
        attributes: ['mId', 'eId','workHour', 'daysOff', 'overTime', 'fromDate', 'toDate', 'workMonth']
    }
    monthlyWorkService.getAllMothlyWork(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for monthly work : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateMonthlyWork(req, res) {
        //var id = req.query.id
        var input = req.body;
        console.log(input);
        /*var payload = {
            id: input.id,
         workHour: input.workHour,
         daysOff: input.daysOff,
            overTime: input.overTime,
         fromDate: input.fromDate,
         toDate:input.toDate,
         workMonth:input.workMonth,
            updatedAt: moment().unix()
        };*/
        var payload = {
            mId: 201,
            eId:1,
            workHour: 12.0,
            daysOff: 6.0,
            overTime: 14.0,
            fromDate: '05/01/17',
            toDate:'29/01/17',
            workMonth:'january',
            updatedAt: moment().unix()
        };
        var condition = {
            where: {
                mId:201,eId:1
            },

                attributes: ['mId', 'eId','workHour', 'daysOff', 'overTime', 'fromDate', 'toDate', 'workMonth']
            }


        monthlyWorkService.updateMonthlyWork(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for monthlyWork : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }


    function addMonthlyWork(req, res) {
//var id = req.query.id
        //var input = req.body;
        //console.log(input);
        /*var payload = {
         id: input.id,
         workHour: input.workHour,
         daysOff: input.daysOff,
         overTime: input.overTime,
         fromDate: input.fromDate,
         toDate:input.toDate,
         workMonth:input.workMonth,
         createdAt: moment().unix(),
         updatedAt: moment().unix()
         };*/
        var payload = {
            mId: 201,
            eId:1,
            workHour:10,
            daysOff: 2.5,
            overTime: 2,
            fromDate: '05/01/17',
            toDate:'25/01/17',
            workMonth:'january',
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };
        var condition = {
            where: {
                mId:201,eId:1
            }

            //attributes: ['mId', 'eId','workHour', 'daysOff', 'overTime', 'fromDate', 'toDate', 'workMonth']
        }

        monthlyWorkService.addMonthlyWork(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for monthlyWork : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }
    function deleteMonthlyWork(req, res) {


        debug('==>Searching monthlyWork : ');
        var id = req.query.id;
        var condition = {
            where: {id: id}
            //attributes: ['id', 'name', 'age', 'address', 'salary']
        }
        monthlyWorkService.deleteMonthlyWork(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for monthlyWork : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });
    }

module.exports = monthlyWork;
