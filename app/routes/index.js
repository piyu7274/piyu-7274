'use strict';

var express = require('express'),
    app = require('app'),
    router = express.Router(),
    logger = require('morgan'),
    json2xls = require('json2xls'),
    bodyParser = require('body-parser'),
    employee = require('app/routes/employee'),
    department = require('app/routes/department'),
    login = require('app/routes/login'),
    leave = require('app/routes/leave'),
    authHelper = require('app/helper/auth'),
    monthlyWork = require('app/routes/monthlyWork'),
    registration = require('app/routes/registration'),
    qualification = require('app/routes/qualification'),
    workHistory = require('app/routes/workHistory');


//company resource routing
router.get('/api/v1/company/employee/empId/:id', employee.getemployeeById);
router.get('/api/v1/company/employee', employee.getAllEmployee);
router.delete('/api/v1/company/employee/:id', employee.deleteEmployee);
router.put('/api/v1/company/employee', employee.updateEmployee);
router.post('/api/v1/company/employee', employee.addEmployee);

router.get('/api/v1/company/department/departmentId/:id', department.getDepartmentById);
router.get('/api/v1/company/department', department.getAllDepartment);
router.delete('/api/v1/company/department/:id', department.deleteDepartment);
router.put('/api/v1/company/department/:id', department.updateDepartment);
router.post('/api/v1/company/department', department.addDepartment);

router.get('/api/v1/company/leave/leaveId/:id', leave.getLeaveById);
router.get('/api/v1/company/leave', leave.getAllLeave);
router.delete('/api/v1/company/leave/:id', leave.deleteLeave);
router.put('/api/v1/company/leave/:id', leave.updateLeave);
router.post('/api/v1/company/leave', leave.addLeave);

router.get('/api/v1/company/monthlyWork/monthlyWorkId/:id', monthlyWork.getMonthlyWorkById);
router.get('/api/v1/company/monthlyWork', monthlyWork.getAllMonthlyWork);
router.delete('/api/v1/company/monthlyWork/:id', monthlyWork.deleteMonthlyWork);
router.put('/api/v1/company/monthlyWork/:id', monthlyWork.updateMonthlyWork);
router.post('/api/v1/company/monthlyWork', monthlyWork.addMonthlyWork);

router.get('/api/v1/company/qualification/qualificationId/:id', qualification.getQualificationById);
router.get('/api/v1/company/qualification', qualification.getAllQualification);
router.delete('/api/v1/company/qualification/:id', qualification.deleteQualification);
router.put('/api/v1/company/qualification/:id', qualification.updateQualification);
router.post('/api/v1/company/qualification', qualification.addQualification);

router.get('/api/v1/company/workHistory/workHistoryId/:id', workHistory.getWorkHistoryById);
router.get('/api/v1/company/workHistory', workHistory.getAllWorkHistory);
router.delete('/api/v1/company/workHistory/:id', workHistory.deleteWorkHistory);
router.put('/api/v1/company/workHistory/:id', workHistory.updateWorkHistory);
router.post('/api/v1/company/workHistory', workHistory.addWorkHistory);


router.post('/api/v1/login', login.login);
router.post('/api/v1/logout', login.logout);

router.post('/api/v1/registration', registration.addRegistration);
router.get('/api/v1/company/registration/registrationId/:id', registration.getRegistrationById);
router.get('/api/v1/company/registration', registration.getAllRegistration);

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
        .all('/api/v1/company/*', [authHelper.ensureAuthenticated])
        //.use(express.static('apidoc'))
       //.use(express.static('public'))
        //.use(require('morgan')('combined', {"stream": logger.stream}))
        //.use(json2xls.middleware)
        .use(bodyParser.json({limit: '5mb'}))
        .use(bodyParser.urlencoded({extended: false}));

    return router;
};
