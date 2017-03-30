/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var

    debug = require('debug')('app.routes.employee');
employeeService = require('app/services/employeeService');

var login = {

};


function login(req, res, next) {
    log.info("---------------<> In parent APP Registration/Login call <>-------------------- ");
    var input = req.body;
    var payload = {activationStatus: true};

    var seriesCalls = [parentDao.verifyLogin.bind(null, input),
        schoolDao.fetchSchoolByParent.bind(null),
        studentDao.getParentStudents.bind(null)];

    async.waterfall(seriesCalls, function (err, result) {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        if (!result) {
            return res.status(200).send({message: 'something went wrong'});
        }
        var students = [];
        var studentCondition = {
            where: {
                schoolId: result.schoolId,
                id: {$in: result.studentPickDrops},
                status: true,
                routeId: {
                    $ne: null
                }
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('route_id')), 'routeId']]
        };

        studentRouteDao.findStudentDetails(studentCondition, function (err, studentObj) {
            if (err) {
                return res.status(500).send({message: err.message});
            }
            var routes = [];
            _.forEach(studentObj, function (route) {
                route = route.dataValues;
                route = route.routeId;
                routes.push(route);
            });

            if (routes.length > 0) {
                _.forEach(routes, function (routeId) {
                    redisCli.subscribeParentToRoute(routeId, result.id, function (error, response) {
                        if (error) {
                            return;
                        }
                        return;
                    });
                });
            }
            authHelper.createParentJWT(result, function (err, token) {
                var data = {
                    id: result.id,
                    schoolId: result.schoolId,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    phone: result.phone,
                    //alternateNo: result.alternateNo,
                    schoolCode: result.schoolCode,
                    schoolLogo: result.schoolLogo,
                    schoolName: result.schoolName,
                    schoolTheme: result.schoolTheme,
                    schoolLatitude: parseFloat(result.schoolLatitude),
                    schoolLongitude: parseFloat(result.schoolLongitude),
                    studentIds: result.studentBus
                };
                parentDao.activateParentAccount(result, payload, function (err, data) {
                    if (err) {
                        return res.status(500).send({message: err.message ? err.message : err});
                    }
                });
                res.status(200).send({message: 'login successful', token: token, data: data});
            });

        });
    });


    function logout(req, res, next) {
        req.headers.authorization = null;
        res.status(200).send({message: 'logout successful', token: null});
    }
}


module.exports = login;
