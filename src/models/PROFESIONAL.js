import { DataTypes } from "sequelize";
import REVIEW from "./REVIEW.js";
import sequelize from "../config/db.js";
import CONSULT from "./CONSULTA.js";
import ESPECIALIDAD from "./ESPECIALIDAD.js";


const PROFESIONAL = sequelize.define(
  "profesional",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique:true
    },
    DNI: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING(300),
    },
    description: { // hacer otra tabla
      type: DataTypes.STRING(500),
    },
    abilities: { // hacer otra tabla
      type: DataTypes.STRING(400),
    },
    linkedin: { // hacer otra tabla
      type: DataTypes.STRING(200),
    },
    password: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

PROFESIONAL.hasMany(REVIEW);
REVIEW.belongsTo(PROFESIONAL);

PROFESIONAL.hasMany(CONSULT);
CONSULT.belongsTo(PROFESIONAL);

PROFESIONAL.belongsToMany(ESPECIALIDAD, {
  through: "PROFESIONAL_ESPECIALDAD",
  timestamps: false,
});
ESPECIALIDAD.belongsToMany(PROFESIONAL, {
  through: "PROFESIONAL_ESPECIALDAD",
  timestamps: false,
});

export default PROFESIONAL;
