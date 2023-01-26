import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";


const USER = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DNI: {
        type: DataTypes.STRING
      },
      username:{
        type: DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING,
        unique: true
      },
      name:{
        type: DataTypes.STRING
      },
      password:{
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
    }
  );


export default USER;