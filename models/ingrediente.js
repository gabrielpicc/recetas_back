"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ingrediente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.receta, {
        as: "receta",
        foreignKey: "receta_id",
      });
    }
  }
  ingrediente.init(
    {
      ingrediente_descr: DataTypes.STRING,
      receta_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ingrediente",
    }
  );
  return ingrediente;
};
