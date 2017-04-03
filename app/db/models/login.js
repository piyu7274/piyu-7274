/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('elogin_info', {
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid',
            primaryKey:true,
            autoIncrement:true
        },
        username: {
            type: DataTypes.TEXT,
            field: 'username',
           unique:true
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

