'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('products', 'categoryId', 'category_id');     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('products', 'category_id', 'categoryId');    
  }
};
