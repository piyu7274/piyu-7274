/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('esalary_info', {
        dId: {
            type: DataTypes.INTEGER,
            field: 'did',
            primaryKey: true,
            autoIncrement: true
        },
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid'
        },
        department: {
            type: DataTypes.TEXT,
            field: 'department',
            allowNull: false
        },
        designation: {
            type: DataTypes.TEXT,
            field: 'designation',
            allowNull: false
        },
        monthlySalary: {
            type: DataTypes.REAL,
            field: 'monthly_salary'

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

