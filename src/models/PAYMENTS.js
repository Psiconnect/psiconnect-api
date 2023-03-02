import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PAYMENT = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
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
    created_at:{
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: false,
  }
);

export default PAYMENT;
