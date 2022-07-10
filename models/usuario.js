"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.receta, {
        as: "recetas",
        foreignKey: "usuario_id",
      });
    }
  }
  usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "El nombre solo puede contener letras",
          },
          len: {
            args: [2, 255],
            msg: "El nombre tiene que tener como minimo 2 caracteres",
          },
        },
      },
      apellido: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido",
          }
        },
      },
      contraseña: { type: DataTypes.STRING, allowNull: false, validate: {
        len: {
          args: [8,255],
          msg: "La contraseña tiene que tener como minimo 8 caracteres"
        }
      } },
    },
    {
      sequelize,
      modelName: "usuario",
    }
  );
  return usuario;
};
