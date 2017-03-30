/**
 * Created by piyush on 22/2/17.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('epersonel_info', {
        id: {
            type: DataTypes.INTEGER,
            field: 'eid',
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            field: 'ename',
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            field: 'age'

        },
        address: {
            type: DataTypes.TEXT,
            field: 'eaddress'
        },
      DOB: {
          type: DataTypes.TEXT,
          field: 'edob'
      },
        city: {
            type: DataTypes.TEXT,
            field: 'city'

        },
        contactNo: {
            type: DataTypes.INTEGER,
            field: 'econtactno'

        },
        postalCode: {
            type: DataTypes.INTEGER,
            field: 'postalcode'

        },
        qualification: {
            type: DataTypes.TEXT,
            field: 'equalification'

        },
        currentExp: {
            type: DataTypes.INTEGER,
            field: 'currentexp'

        },
         gender: {
            type: DataTypes.TEXT,
            field: 'egender'

        },
        Email: {
            type: DataTypes.TEXT,
            field: 'email'

        },
        marritalStatus: {
            type: DataTypes.INTEGER,
            field: 'emarritalstatus'

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
