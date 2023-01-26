import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";


const ESPECIALIDAD = sequelize.define(
    "especialidad",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{
        type: DataTypes.STRING
      },
    },
    {
      timestamps: false,
    }
  );


export default ESPECIALIDAD;