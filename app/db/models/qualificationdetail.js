/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('equalification_info', {
        qId: {
            type: DataTypes.INTEGER,
            field: 'qid',
            primaryKey: true,
            autoIncrement: true
        },
        eId: {
            type: DataTypes.INTEGER,
            field: 'eid'

        },
        college: {
            type: DataTypes.TEXT,
            field: 'college'

        },
        university: {
            type: DataTypes.INTEGER,
            field: 'university'

        },
        grad_Type: {
            type: DataTypes.TEXT,
            field: 'grad_type'
        },
        pgrad_Type: {
            type: DataTypes.TEXT,
            field: 'p_grad_type'
        },
        marks10: {
            type: DataTypes.REAL,
            field: 'marks10'
        },
        marks12: {
            type: DataTypes.REAL,
            field: 'marks12'
        },
        grad_per_grade: {
            type: DataTypes.TEXT,
            field: 'grad_type'
        },

        createdAt: {
            type: DataTypes.DATE,
            field: 'craetedat'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedat'
        }

    }, {
        freezeTableName: true
    });
};

