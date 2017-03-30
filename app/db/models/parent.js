/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('eparent_info', {
        pId: {
            type: DataTypes.INTEGER,
            field: 'pid',
            primaryKey: true,
            autoIncrement: true
        },
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid'
        },
        fatherName: {
            type: DataTypes.TEXT,
            field: 'e_fname'

        },
        motherName: {
            type: DataTypes.TEXT,
            field: 'e_mname'

        },

        parentAddress: {
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
        parentContact: {
            type: DataTypes.TEXT,
            field: 'e_pcontact'

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
/**
 * Created by piyush on 25/3/17.
 */
