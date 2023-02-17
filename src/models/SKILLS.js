import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SKILLS = sequelize.define(
  "skills",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    skill: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique:true
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

export default SKILLS;
