/**
 * Created by piyush on 22/2/17.
 */

var db = require("app/db/postgres");
    //log = require('utils/logger')(module);

var models = {

    Employee: db.sequelize.import(__dirname + '/employee'),
    Department: db.sequelize.import(__dirname + '/Department'),
    Login: db.sequelize.import(__dirname + '/login'),
    Leave: db.sequelize.import(__dirname + '/leave'),
    MonthlyWork: db.sequelize.import(__dirname + '/monthlywork'),
    Qualification: db.sequelize.import(__dirname + '/qualificationdetail'),
    WorkingHistory: db.sequelize.import(__dirname + '/workingHistory')


};

module.exports = models;
