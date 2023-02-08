import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";

const REVIEW = sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique:true
      },

      score:{
        type: DataTypes.INTEGER,
        validate:{
            min: 0,
            max: 10
        }
      },
      comments:{
        type: DataTypes.STRING //se cambio el tipo de dato que estaba como integer a string
      },
    },
    {
      timestamps: false,
    }
  );


export default REVIEW;