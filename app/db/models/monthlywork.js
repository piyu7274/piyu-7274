/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('etime_info', {
        mId: {
            type: DataTypes.INTEGER,
            field: 'mid',
            primaryKey: true,
            autoIncrement: true
        },
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid'
        },
        workHour: {
            type: DataTypes.REAL,
            field: 'work_hour'
        },
        daysOff: {
            type: DataTypes.REAL,
            field: 'days_off'
        },
        overTime: {
            type: DataTypes.REAL,
            field: 'overtime'
        },
        fromDate: {
            type: DataTypes.TEXT,
            field: 'w_fromdate'
        },
        toDate: {
            type: DataTypes.TEXT,
            field: 'w_todate'
        },

        createdAt: {
            type: DataTypes.DATE,
            field: 'createdat'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedat'
        }, workMonth: {
            type: DataTypes.TEXT,
            field: 'work_month'
        }

    }, {
        freezeTableName: true
    });
};

