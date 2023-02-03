import { DataTypes } from "sequelize";
import REVIEW from "./REVIEW.js";
import sequelize from "../config/db.js";
import CONSULT from "./CONSULT.js";
import SPECIALTY from "./SPECIALTY.js";
import AREA from "./AREAS.js";

const PROFESSIONAL = sequelize.define(
  "professional",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
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
    },
    avatar: {
      type: DataTypes.STRING(300),
    },
    description: {
      // hacer otra tabla
      type: DataTypes.STRING(500),
    },
    skills: {
      
      type: DataTypes.ENUM(
        "AMABLE",
        "EMPATICO",
        "SIMPATICO",
        "MOTIVADOR",
        "ENERGICO",
        "CONSERVADOR",
        "LOGICO",
        "PERSUASIVO",
        "ORGANIZADO",
        "ADAPTABLE",
        "ANALITICO",
        "PROGRESISTA"
      ),
    },
    linkedin: {
      
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

PROFESSIONAL.hasMany(REVIEW);
REVIEW.belongsTo(PROFESSIONAL);

PROFESSIONAL.hasMany(CONSULT);
CONSULT.belongsTo(PROFESSIONAL);

PROFESSIONAL.belongsToMany(SPECIALTY, {
  through: "PROFESSIONAL_SPECIALTY",
  timestamps: false,
});
SPECIALTY.belongsToMany(PROFESSIONAL, {
  through: "PROFESSIONAL_SPECIALTY",
  timestamps: false,
});
PROFESSIONAL.belongsToMany(AREA, {
  through: "PROFESSIONAL_AREA",
  timestamps: false,
});
AREA.belongsToMany(PROFESSIONAL, {
  through: "PROFESSIONAL_AREA",
  timestamps: false,
});

export default PROFESSIONAL;
