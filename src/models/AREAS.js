import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
    season: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

AREA.hasMany(PROFESIONAL);
PROFESIONAL.belongsTo(AREA);

export default AREA;
