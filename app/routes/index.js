'use strict';

var express = require('express'),
   app = require('app'),
    router = express.Router(),

    employee = require('app/routes/employee'),
    department = require('app/routes/department'),
    login = require('app/routes/login'),
    leave = require('app/routes/leave'),
    monthlyWork = require('app/routes/monthlyWork'),
    parent = require('app/routes/parent'),
    qualification = require('app/routes/qualification'),
    workHistory= require('app/routes/workHistory');




//company resource routing
router.get('/api/v1/company/employee/:id', employee.getemployeeById);
router.get('/api/v1/company/employee', employee.getAllEmployee);
router.delete('/api/v1/company/employee/:id', employee.deleteEmployee);
router.put('/api/v1/company/employee', employee.updateEmployee);
router.post('/api/v1/company/employee', employee.addEmployee);

router.get('/api/v1/company/department/:id', department.getDepartmentById);
router.get('/api/v1/company/department', department.getAllDepartment);
router.delete('/api/v1/company/department/:id', department.deleteDepartment);
router.put('/api/v1/company/department', department.updateDepartment);
router.post('/api/v1/company/department', department.addDepartment);

router.get('/api/v1/company/leave/:id', leave.getLeaveById);
router.get('/api/v1/company/leave', leave.getAllLeave);
router.delete('/api/v1/company/leave/:id', leave.deleteLeave);
router.put('/api/v1/company/leave', leave.updateLeave);
router.post('/api/v1/company/leave', leave.addLeave);

router.get('/api/v1/company/monthlyWork/:id', monthlyWork.getMonthlyWorkById);
router.get('/api/v1/company/monthlyWork', monthlyWork.getAllMonthlyWork);
router.delete('/api/v1/company/monthlyWork/:id', monthlyWork.deleteMonthlyWork);
router.put('/api/v1/company/monthlyWork', monthlyWork.updateMonthlyWork);
router.post('/api/v1/company/monthlyWork', monthlyWork.addMonthlyWork);

router.get('/api/v1/company/parent/:id', parent.getParentById);
router.get('/api/v1/company/parent', parent.getAllParent);
router.delete('/api/v1/company/parent/:id', parent.deleteParent);
router.put('/api/v1/company/parent', parent.updateParent);
router.post('/api/v1/company/parent', parent.addParent);

router.get('/api/v1/company/qualification/:id', qualification.getQualificationById);
router.get('/api/v1/company/qualification', qualification.getAllQualification);
router.delete('/api/v1/company/qualification/:id', qualification.deleteQualification);
router.put('/api/v1/company/qualification', qualification.updateQualification);
router.post('/api/v1/company/qualification', qualification.addQualification);

router.get('/api/v1/company/workHistory/:id', workHistory.getWorkHistoryById);
router.get('/api/v1/company/workHistory', workHistory.getAllWorkHistory);
router.delete('/api/v1/company/workHistory/:id', workHistory.deleteWorkHistory);
router.put('/api/v1/company/workHistory', workHistory.updateWorkHistory);
router.post('/api/v1/company/workHistory', workHistory.addWorkHistory);


/*router.get('/api/v1/company/login', login.);
router.delete('/api/v1/company/login', login.);
router.put('/api/v1/company/login', login.);
router.post('/api/v1/company/login', login.);
*/


module.exports = function (app) {
    app
        .all('/*', function (req, res, next) {
            // CORS headers
            res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Authorization', true);
            // Set custom headers for CORS
            res.header('Access-Control-Allow-Headers', 'Content-type,X-Requested-With,Accept,Authorization');
            if (req.method === 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        })
       /* .all('/api/v1*//*', [authHelper.ensureAuthenticated])
        //.use(express.static('apidoc'))
        .use(express.static('public'))
        .use(require('morgan')('combined', {"stream": logger.stream}))
        .use(bodyParser.json({limit: '5mb'}))
        .use(bodyParser.urlencoded({extended: false}));*/

    return router;
};
