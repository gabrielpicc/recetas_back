"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class receta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.usuario, {
        as: "usuario",
        foreignKey: "usuario_id",
      });
    }
  }
  receta.init(
    {
      titulo: DataTypes.STRING,
      categorias: DataTypes.STRING,
      dificultad: DataTypes.INTEGER,
      status: DataTypes.CHAR,
    },
    {
      sequelize,
      modelName: "receta",
    }
  );
  return receta;
};
