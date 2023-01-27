import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";


const ESPECIALIDAD = sequelize.define(
    "especialidad",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique:true
      },
      name:{
        type: DataTypes.STRING
      },
      detail:{
        type:  DataTypes.STRING(200)
      }
    },
    {
      timestamps: false,
    }
  );


export default ESPECIALIDAD;