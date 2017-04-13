/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('eworkhis_info', {
        wId: {
            type: DataTypes.INTEGER,
            field: 'wid',
            primaryKey: true,
            autoIncrement: true
        },
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid'
        },
        companyName: {
            type: DataTypes.TEXT,
            field: 'companyname'
        },
        address: {
            type: DataTypes.TEXT,
            field: 'eaddress'
        },
        city: {
            type: DataTypes.TEXT,
            field: 'city'

        },
        state: {
            type: DataTypes.TEXT,
            field: 'state'

        },
        employee_mob: {
            type: DataTypes.INTEGER,
            field: 'emob_no'

        },
        officeContact: {
            type: DataTypes.INTEGER,
            field: 'eoff_contact'

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

