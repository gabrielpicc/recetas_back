"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.receta, {
        as: "recetas",
        foreignKey: "receta_id",
      });
    }
  }
  categoria.init(
    {
      descripcion: DataTypes.STRING,
      receta_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "categoria",
    }
  );
  return categoria;
};
