/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment');
    debug = require('debug')('app.routes.employee');
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
        where: {id: id}
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
    debug('==>Searching devices  : ');

    var condition={ attributes: ['eId', 'name', 'age', 'address', 'Email','contactNo','postalcode','gender','currentExp','marritalStatus']}
    employeeService.getAllEmployee(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateEmployee(req, res) {
        //var id = req.query.id
        var input = req.body;
        console.log(input);
       /* var payload = {
            id: input.id,
            name: input.name,
            age: input.age,
            email:input.email,
            address: input.address,
            contact: input.contact,
            postalCode: input.postalcode,
            gender: input.gender,
            currentExp: input.currentexp,
            marritalStatus: input.marritalstatus,
            updatedAt: moment().unix()
        };*/
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
        };
        var condition = {
            where: {
                id:1 },
                attributes: ['eId', 'name', 'age', 'address', 'Email','contactNo','postalcode','gender','currentExp','marritalStatus']
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
        //var id = req.query.id
        //var input = req.body;
        //console.log(input);
        /*var payload = {
            id: input.id,
            name: input.name,
            age: input.age,
            address: input.address,
            contact: input.contact,
            postalCode: input.postalcode,
            gender: input.gender,
            currentExp: input.currentexp,
            marritalStatus: input.marritalstatus,
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };*/


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
        };
      /* var condition = {
           where: {
               id: input.id },
               attributes: ['id', 'name', 'age', 'Email', 'address', 'contactNo', 'postalCode', 'gender', 'currentExp', 'marritalStatus']
           }*/
      var condition={}

        employeeService.addEmployee(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for employees : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }

    function deleteEmployee(req, res) {


        debug('==>Searching employees : ');
        //var id = req.query.id;
        var condition = {
            where: {id: 1}
            //attributes: ['id', 'name', 'age', 'address', 'salary']
        }
        employeeService.deleteEmployee(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for employees : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });
    }

module.exports = employee;
