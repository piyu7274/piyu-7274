'use strict';

var express = require('express'),

    app = express();
//Initializing database models
var initializedModels = require('app/db/models'),
    pg = require('app/db/postgres');

var models = require('app/db');


//models.set(initializedModels, pg.sequelize);

var http = require('http').Server(app);

http.on('error', function (err) {
    //log.error('HTTP Error', err.message);
    //log.error(err.stack);
});

app
    .set('models', initializedModels)
    .use('/', require('app/routes')(app));

module.exports.start = function (host, port) {
    http.listen(port, host, function () {
        //socket.init(http);
        //log.info('HTTP Server is ready now @ ', host, ':', port);
    });
};
