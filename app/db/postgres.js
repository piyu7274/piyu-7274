/**
 * Created by piyush on 22/2/17.
 */

  var Sequelize = require('sequelize');
   // log = require('utils/logger')(module),
    //config = require('config');

var mydb = require('app/db'),
    models =require('app/db/models');


var database="ems",
    host="localhost",
    dialect="postgres",
    username= "postgres",
    password= "fleet";

var sequelize;
sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect

    /*pool: {
     max: config.maxPoolSize,
     min: config.minPoolSize,

     }*/
});
//console.log(database   +    host   +   dialect   +   username   +   password);

module.exports = models;
// export connection
module.exports.sequelize = sequelize;

mydb.set(models, sequelize);
