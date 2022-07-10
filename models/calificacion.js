'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.receta, {
        as: "receta",
        foreignKey: "receta_id",
      })
    }
  }
  calificacion.init({
    calificacion_sum: DataTypes.INTEGER,
    total_personas: DataTypes.INTEGER,
    receta_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'calificacion',
  });
  return calificacion;
};