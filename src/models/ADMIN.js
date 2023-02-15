import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ADMIN = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING(800),
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
  },
  {
    timestamps: false,
  }
);

export default ADMIN;
