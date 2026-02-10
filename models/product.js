const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name is required'
            },
            notNull: {
                msg: 'Name is required'
            }
        }
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Price is required'
            },
            notNull: {
                msg: 'Price is required'
            },
            isDecimal: {
                msg: 'Price must be a valid decimal number'
            },
            min: {
                args: [0],
                msg: 'Price cannot be negative'
            }            
        }
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'USD',
        allowNull: false,
        validate: {
            isIn: {
                args: [['USD','BRL','INR']],
                msg: 'Currency must be USD, BRL or INR'
            },
            notNull: {
                msg: 'Currency cannot be null'
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Quantity cannot be null'
            },
            min: {
                args: [0],
                msg: 'Quantity cannot be negative'
            },
            isInt: {
                msg: 'Quantity must be a valid integer number'
            } 
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Active cannot be null'
            },
            isBoolean: {
                msg: 'Active must be a valid boolean value'
            }
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        },
        validate: {
            notEmpty: {
                msg: 'Category ID is required'
            },
            notNull: {
                msg: 'Category ID is required'
            },
            async categoryIdExists(value) {
                const category = await Category.findByPk(value);

                if (!category) {
                    throw new Error(`Category id ${value} does not exist`)
                }
            }          
        }
    } 
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true
})

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
})

module.exports = Product