/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('eleave_info', {
        lId: {
            type: DataTypes.INTEGER,
            field: 'lid',
            primaryKey: true,
            autoIncrement: true
        },
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid'
        },

        holiday: {
            type: DataTypes.INTEGER,
            field: 'holiday'

        },
        leaveDays: {
            type: DataTypes.REAL,
            field: 'leavedays'
        },
        leaveFrom: {
            type: DataTypes.TEXT,
            field: 'leavefrom'
        },
        leaveType: {
            type: DataTypes.TEXT,
            field: 'leavetype'
        },
        leaveTo: {
            type: DataTypes.TEXT,
            field: 'leaveto'
        },
        leaveMonth: {
            type: DataTypes.TEXT,
            field: 'leavemonth'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdat'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedat'
        }

    }, {
        freezeTableName: true
    });
};

