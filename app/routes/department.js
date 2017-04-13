/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
departmentService = require('app/services/departmentservice');
var department = {
    getDepartmentById:getDepartmentById,
    deleteDepartment:deleteDepartment,
    addDepartment:addDepartment,
    updateDepartment:updateDepartment,
    getAllDepartment:getAllDepartment
};


 function getDepartmentById(req, res) {


     debug('==>Searching department  : ');
     var id = req.params.id;
     var condition = {
          where: {eId: id},
         attributes: ['dId','eId', 'designation', 'department', 'monthlySalary']
     }
     departmentService.getDepartmentById(condition, function (err, result) {
         if (err) {
             debug('==>caught error in searching for department : ');
             return res.status(err.code).json({message: err.message});
         }
         return res.status(result.code).json(result.message);

     });
 }



function getAllDepartment(req, res) {
    debug('==>Searching departments  : ');

    var condition={ attributes: ['dId','eId', 'designation', 'department', 'monthlySalary']}
    departmentService.getAllDepartment(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for department : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

// return res.status(200).json({"result":"abcd"})

     function updateDepartment(req, res) {
         var id = req.params.id
        var input = req.body;
         console.log(input);
         var payload = {
             eId: input.eId,
             designation: input.designation,
             department: input.department,
             monthlySalary: input.monthlySalary,
             updatedAt: moment().unix()

         };
        /* var payload = {
             dId:101,
             eId:1,
             designation:'senior Developer',
             department: 'java',
             monthlySalary:60000.00,
             updatedAt: moment().unix()

         };*/
         var condition = {
             where: {
               dId:id },

                 attributes: ['dId','eId', 'designation', 'department', 'monthlySalary']
             }


         departmentService.updateDepartment(payload, condition, function (err, result) {
             if (err) {
                 debug('==>caught error in searching for department : ');
                 return res.status(err.code).json({message: err.message});
             }
             return res.status(result.code).json(result.message);
         });


     }


     function addDepartment(req, res) {
         //var id = req.params.id
         var input = req.body;
         console.log(input);
         var payload = {
             eId: input.eId,
             designation: input.designation,
             department: input.department,
             monthlySalary: input.monthlySalary,
             createdAt: moment().unix(),
             updatedAt: moment().unix()

         };
         /*var payload = {
             dId:101,
             eId:1,
             designation:'senior Developer',
             department: 'java',
             monthlySalary:45000.00,
             updatedAt: moment().unix()

         };*/
         var condition = {
             where: {
                 eId:input.id
             }
         }

         departmentService.addDepartment(payload, condition, function (err, result) {
             if (err) {
                 debug('==>caught error in adding for department : ');
                 return res.status(err.code).json({message: err.message});
             }
             return res.status(result.code).json(result.message);
         });


     }
     function deleteDepartment(req, res) {
         debug('==>deleting department : ');
         var id = req.params.id;
         var condition = {
            where: {eId: id}
        }
         departmentService.deleteDepartment(condition, function (err, result) {
             if (err) {
                 debug('==>caught error in deleting for department : ');
                 return res.status(err.code).json({message: err.message});
             }
             return res.status(result.code).json(result.message);

         });
     }

module.exports = department;
