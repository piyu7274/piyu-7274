


require('rootpath')();
//var app = require('app');
//console.log(app);
var app = require('app');

var express = require('express'),
//log = require('utils/logger')(module),
    app = express();


var initializedModels = require('app/db/models');
   // pg = require('app/db/postgres');

var models = require('app/db');


    //models.set(initializedModels, pg.sequelize);
var http=require("http").Server(app);

app
    .set('models', initializedModels)
    .use('/', require('app/routes')(app));

http.listen(8088, '0.0.0.0', function () {
    console.log("server is start");

    //console.log('HTTP Server is ready now @ ', host, ':', port);
});
//app.start('0.0.0.0','8088');