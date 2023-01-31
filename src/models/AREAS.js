import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import PROFESSIONAL from "./PROFESSIONAL.js";

const AREA = sequelize.define(
  "area",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    area: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

PROFESSIONAL.belongsToMany(AREA, {
  through: "PROFESSIONAL_AREA",
  timestamps: false,
});
AREA.belongsToMany(PROFESSIONAL, {
  through: "PROFESSIONAL_AREA",
  timestamps: false,
});

export default AREA;
