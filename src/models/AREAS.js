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
    area: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(300)
    },
  },
  {
    timestamps: false,
  }
);



export default AREA;
