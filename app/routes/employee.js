/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
     async = require('async'),
    debug = require('debug')('app.routes.employee'),
    employeeDao = require('app/dao/employeedao'),
    departmentDao = require('app/dao/departmentDao'),
    leaveDao = require('app/dao/leaveDao'),
    qualificationDao = require('app/dao/qualificationDao'),
    monthlyWorkDao = require('app/dao/monthlyWorkDao'),
    workHistoryDao = require('app/dao/workHistoryDao'),
    employeeService = require('app/services/employeeService');


var employee = {
    getemployeeById:getemployeeById,
    deleteEmployee:deleteEmployee,
    addEmployee:addEmployee,
    updateEmployee:updateEmployee,
    getAllEmployee:getAllEmployee
};


function getemployeeById(req, res) {
    debug('==>Searching employees : ');
    var id = req.params.id;
    var condition = {
        where: {eId: id}
        //  attributes: ['id', 'name', 'age', 'address', 'contact','postalcode','gender','currentExp','marritalstatus']
    }
    employeeService.getEmployeeById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

function getAllEmployee(req, res) {
    debug('==>Searching employees  : ');

    var condition={ attributes: ['eId', 'name', 'age', 'DOB','address', 'city','state','Email','contactNo','postalCode','qualification','gender','currentExp','marritalStatus']}
    employeeService.getAllEmployee(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateEmployee(req, res) {
        var id = req.params.id
        var input = req.body;
        console.log(input);
       var payload = {
            id: input.id,
            name: input.name,
            age: input.age,
            DOB:input.DOB,
            Email:input.Email,
            address: input.address,
            city:input.city,
            state:input.state,
            contactNo :input.contactNo,
            postalCode: input.postalCode,
            qualification:input.qualification,
            gender: input.gender,
            currentExp: input.currentExp,
            marritalStatus: input.marritalStatus,
            updatedAt: moment().unix()
        };
        /*var payload = {
            id: 1,
            name: 'avdhesh',
            age: 30,
            DOB:'20-10-87',
            Email:'abc@ab.com',
            address: 'palasia',
            city:'indore',
            state:'MP',
            contactNo:1234,
            qualification:'BE',
            postalCode: 452001,
            gender: 'male',
            currentExp: 6,
            marritalStatus:'married',
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };*/
        var condition = {
            where: {
                id:1 },
                attributes: ['eId', 'name', 'DOB','age', 'address', 'city','state','Email','contactNo','postalcode','gender','currentExp','marritalStatus']
            }


        employeeService.updateEmployee(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for employees : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }


    function addEmployee(req, res) {
        var input = req.body;
        console.log(input);
        var payload = {
            name: input.name,
            DOB:input.DOB,
            age: input.age,
            Email:input.Email,
            address: input.address,
            city:input.city,
            state:input.state,
            contactNo: input.contactNo,
            postalCode: input.postalCode,
            qualification:input.qualification,
            gender: input.gender,
            currentExp: input.currentExp,
            marritalStatus: input.marritalStatus,
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };

/*
        var payload = {
            id: 1,
            name: 'avdhesh',
            age: 30,
            DOB:'20-10-87',
            Email:'abc@ab.com',
            address: 'palasia',
            city:'indore',
            state:'MP',
            contactNo:1234,
            qualification:'BE',
            postalCode: 452001,
            gender: 'male',
            currentExp: 6,
            marritalStatus:'married',
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };*/
      /* var condition = {
           where: {
               id: input.id },
               attributes: ['id', 'name', 'age', 'Email', 'address', 'contactNo', 'postalCode', 'gender', 'currentExp', 'marritalStatus']
           }*/
      var condition={ attributes: ['eId', 'name', 'DOB','age', 'address', 'city','state','Email','contactNo','postalcode','gender','currentExp','marritalStatus']}

        employeeService.addEmployee(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for employees : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }

    function deleteEmployee(req, res) {

        var id =req.params.id;
        debug('==>Searching employees : ');
        //var id = req.query.id;
        var condition = {
            where: {eId: id}
        }

        var parallelCalls=[employeeDao.deleteEmployee.bind(null,condition),qualificationDao.deleteQualification.bind(null,condition),
        departmentDao.deleteDepartment.bind(null,condition),leaveDao.deleteLeave.bind(null,condition),monthlyWorkDao.deleteMonthlyWork.bind(null,condition),
        workHistoryDao.deleteWorkHistory.bind(null,condition)]


        async.parallel(parallelCalls,function(err,result){
            if (err){
                return res.status(err.code).json({message: err.message});
            };
           return res.status(result.code).json(result.message);
            });
       /* employeeService.deleteEmployee(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for employees : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });*/
    }

module.exports = employee;
