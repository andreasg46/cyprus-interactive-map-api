const {DataTypes} = require('sequelize')
const db = require('../db/configDB')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    age: {
        type: DataTypes.INTEGER,
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