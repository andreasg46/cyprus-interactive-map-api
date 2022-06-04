const {DataTypes} = require('sequelize')
const db = require('../db/configDB')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    age: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'user',
    timestamps: false
});


module.exports = User;