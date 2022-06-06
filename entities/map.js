const {DataTypes} = require('sequelize')
const db = require('../db/configDB')

const Map = db.define('Map', {
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
    trial: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_y: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_x_click: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_y_click: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_error: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_error_x: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    co_error_y: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'map',
    timestamps: false
});


module.exports = Map;