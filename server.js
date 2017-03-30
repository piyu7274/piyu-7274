'use strict';


var app = require('app'),
    config = require('config');



var port = +argh.port || config.app.port, //PORT
    host = +argh.host || config.app.host; //HOST


app.start(host, port);
