import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CONSULT = sequelize.define(
  "consult",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique:true
    },
    price: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    linkpay : {
      type: DataTypes.TEXT
    }
  },
  {
    timestamps: false,
  }
);

export default CONSULT;