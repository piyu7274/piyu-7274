/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
leaveService = require('app/services/leaveService');

var leave = {
    getLeaveById:getLeaveById,
    deleteLeave:deleteLeave,
    addLeave:addLeave,
    updateLeave:updateLeave,
    getAllLeave:getAllLeave
};


function getLeaveById(req, res) {


    debug('==>Searching devices  : ');
    var id = req.params.id;
    var condition = {
        where: {lId: id},
        attributes: ['lId', 'eId','holiday', 'leaveDays', 'leaveFrom', 'leaveTo','leaveType','leaveMonth']
    }
    leaveService.getLeaveById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for leave : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

function getAllLeave(req, res) {
    debug('==>Searching devices  : ');

    var condition={ attributes: ['lId', 'eId','holiday', 'leaveDays', 'leaveFrom', 'leaveTo','leaveType','leaveMonth']}
    leaveService.getAllLeave(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateLeave(req, res) {
        //var id = req.query.id
       /* var input = req.body;
        console.log(input);
        var payload = {
            id: input.id,
            holiday: input.holiday,
            leaveday: input.leaveday,
            address: input.leaveto,
            updatedAt: moment().unix()
        };*/
        var payload = {
            lId:10,
            eId:1,
            holiday:23,
            leaveDays:8,
            leaveFrom:'20-01-17',
            leaveTo:'28-01-17',
            leaveMonth:'january',
            leaveType:'sick leave',
            updatedAt: moment().unix()
        };
        var condition = {
            where: {
                lId:10
            },

            attributes: ['lId', 'eId','holiday', 'leaveDays', 'leaveFrom', 'leaveTo','leaveType','leaveMonth']

        }

        leaveService.updateLeave(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for leave : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }


    function addLeave(req, res) {
//var id = req.query.id
        //var input = req.body;
        //console.log(input);
       /* var payload = {
            id: input.id,
            holiday: input.holiday,
            leaveday: input.leaveday,
            leaveFrom:input.leaveFrom,
            leaveTo: input.leaveto,
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };*/

        var payload = {
            lId:10,
            eId:1,
            holiday:23,
            leavedays:5,
            leaveFrom:'20-01-17',
            leaveTo:'25-01-17',
            leaveMonth:'january',
            leaveType:'sick leave',
            updatedAt: moment().unix()
        };
        /*var condition = {
            where: {
                lId:10
            }

            attributes: ['id', 'holiday', 'leaaveday', 'leavefrom', 'leaveto']
        }
*/
        var condition={
            where:{lId:10,eId:1}
        }
        leaveService.addLeave(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for leave : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }
    function deleteLeave(req, res) {


        debug('==>Searching leave : ');
        var id = req.query.id;
        var condition = {
            where: {id: id}
            //attributes: ['id', 'name', 'age', 'address', 'salary']
        }
        leaveService.deleteLeave(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for leave: ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });
    }

module.exports = leave;
