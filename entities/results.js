const {DataTypes} = require('sequelize')
const db = require('../db/configDB')

const Result = db.define('Result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    },
    trial: {
        type: DataTypes.INTEGER,
    },
    village: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_x: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    co_y: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    co_x_click: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    co_y_click: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    co_error_km: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    co_error_x_km: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    co_error_y_km: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    tableName: 'Result',
    timestamps: false
});


module.exports = Result;