import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";


const SPECIALTY = sequelize.define(
    "specialty",
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


export default SPECIALTY;