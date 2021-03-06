'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "calificacions",
      "user_id",
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("calificacions", "user_id");
  },
};
