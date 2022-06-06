const {DataTypes} = require('sequelize')
const db = require('../db/configDB')

const Trial = db.define('Trial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1
    },
    numOfTrials: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
}, {
    tableName: 'trial',
    timestamps: false
});


module.exports = Trial;