'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false            
        },
        name: {
            type: Sequelize.STRING(120),
            allowNull: false
        },
        description: Sequelize.TEXT,
        price: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        currency: {
            type: Sequelize.STRING(3),
            defaultValue: 'USD',
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW')
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW')            
        }                                                 
    });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');     
  }
};
