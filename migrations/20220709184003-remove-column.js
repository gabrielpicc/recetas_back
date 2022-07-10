'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'receta',
      'calificacion_total'
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
