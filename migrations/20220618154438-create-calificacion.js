"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("calificacions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "receta",
          key: "id",
        },
      },
      calificacion_sum: {
        type: Sequelize.INTEGER,
      },
      total_personas: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("calificacions");
  },
};
