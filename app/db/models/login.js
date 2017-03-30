/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('elogin_info', {
        id: {
            type: DataTypes.INTEGER,
            field: 'eid'
        },
        username: {
            type: DataTypes.TEXT,
            field: 'username',
            primaryKey:true,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            field: 'password',
            allowNull: false
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

