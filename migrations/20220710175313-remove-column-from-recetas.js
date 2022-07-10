'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'receta',
      'categorias'
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
