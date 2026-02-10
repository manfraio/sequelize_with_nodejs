const { DataTypes } = require('sequelize')
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: {
            msg: 'Category name already exists'
        },
        validate: {
            notEmpty: {
                msg: 'Name is required'
            },
            notNull: {
                msg: 'Name is required'
            }
        }
    },    
}, {
    tableName: 'categories',
    timestamps: true,
    underscored: true
})

module.exports = Category