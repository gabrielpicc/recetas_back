"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "receta",
      "user_id",
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("receta", "procedimiento");
  },
};
