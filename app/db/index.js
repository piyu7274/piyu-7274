'use strict'
/**
 * Created by piyush on 22/2/17.
 */



var models, sequelize;

module.exports.set = function (dbModels, db) {
    models = dbModels;
    sequelize = db;


module.exports.get = function (model) {
    return models[model];
};

module.exports.getSequelizeInstance = function () {
    return sequelize;
};

module.exports.set = function (dbModels, db) {
    models = dbModels;
    sequelize = db;
};







};


