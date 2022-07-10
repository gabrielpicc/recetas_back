"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("receta", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "CASCADE"
      },
      titulo: {
        type: Sequelize.STRING,
      },
      calificacion_total: {
        type: Sequelize.FLOAT,
      },
      categorias: {
        type: Sequelize.STRING,
      },
      dificultad: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.CHAR,
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
    await queryInterface.dropTable("receta");
  },
};
