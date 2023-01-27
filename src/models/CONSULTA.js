import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CONSULT = sequelize.define(
  "consult",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique:true
    },
    price: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

export default CONSULT;
