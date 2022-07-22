"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("usuarios", "pregunta", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("usuarios", "respuesta", {
        type: Sequelize.STRING,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn("usuarios", "pregunta"),
      queryInterface.removeColumn("usuarios", "respuesta"),
    ];
  },
};
