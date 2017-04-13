/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
workHistoryService = require('app/services/workHistoryService');

var workHistory= {
    getWorkHistoryById:getWorkHistoryById,
    deleteWorkHistory:deleteWorkHistory,
    addWorkHistory:addWorkHistory,
    updateWorkHistory:updateWorkHistory,
    getAllWorkHistory:getAllWorkHistory
};


function getWorkHistoryById(req, res) {


    debug('==>Searching workhistory  : ');
    var id = req.params.id;
    var condition = {
         where: {eId: id},
        attributes: ['wId', 'eId','companyname', 'address', 'city', 'state', 'companyName','employee_mob', 'officeContact']
    }
    workHistoryService.getWorkHistoryById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for workhistory : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}


function getAllWorkHistory(req, res) {
    debug('==>Searching workHistory  : ');

    var condition={   attributes: ['wId', 'eId','companyname', 'address', 'city', 'state', 'companyName','employee_mob', 'officeContact']}
    workHistoryService.getAllWorkHistory(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateWorkHistory(req, res) {
        var id = req.params.id
       var input = req.body;
        console.log(input);
        var payload = {
         eId:id,
         companyName: input.companyName,
         address: input.address,
         city: input.city,
         state:input.state,
         employee_mob:input.employee_mob,
         officeContact:input.officeContact,
         updatedAt: moment().unix()

         };
      /*  var payload = {
            wId: 401,
            eId: 1,
            name: 'avdhesh',
            companyname:'yash tech',
            address: 'Apollo tower',
            city: 'indore',
            state:'MP',
            employee_mob:1234,
            officecontact:5678,
            createdAt: moment().unix(),
            updatedAt: moment().unix()

        };*/
        var condition = {
            where: {
               eId:id},

            attributes: ['wId', 'eId','companyname', 'address', 'city', 'state', 'companyName','employee_mob', 'officeContact']
            }


        workHistoryService.updateWorkHistory(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for workhistory : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }


    function addWorkHistory(req, res) {
//var id = req.query.id
        var input = req.body;
        console.log(input);
        var payload = {
            eId:input.eId,
            companyName: input.companyName,
            //name: input.name,
            address: input.address,
            city: input.city,
            state:input.state,
         employee_mob:input.employee_mob,
         officeContact:input.officeContact,
         createdAt: moment().unix(),
            updatedAt: moment().unix()

        };
        /*var payload = {
            wId: 401,
            eId: 1,
            name: 'avdhesh',
            companyName:'yash tech',
            address: 'Apollo tower',
            city: 'indore',
            state:'MP',
            employee_mob:1234,
            officeContact:5678,
            createdAt: moment().unix(),
            updatedAt: moment().unix()

        };*/
        var condition = {
            where: {
              eId:input.eId
            }

            //attributes: ['wId', 'eId', 'name','companyname', 'address', 'city', 'state', 'companyName', 'officeContact']
        }

        workHistoryService.addWorkHistory(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for workhistory : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }
    function deleteWorkHistory(req, res) {


        debug('==>Searching workhistory : ');
        var id = req.params.id;
        var condition = {
            where: {wId:id}
            //attributes: ['id', 'name', 'age', 'address', 'salary']
        }
        workHistoryService.deleteWorkHistory(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for workhistory : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });
    }

module.exports = workHistory;
