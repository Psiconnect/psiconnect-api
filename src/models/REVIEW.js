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
      coments:{
        type: DataTypes.INTEGER,
        validate:{
            min: 0,
            max: 10
        }
      },
    },
    {
      timestamps: false,
    }
  );


export default REVIEW;