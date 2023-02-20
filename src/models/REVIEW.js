import { DataTypes } from "sequelize";
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
        type: DataTypes.FLOAT,
        validate:{
            min: 1,
            max: 5
        }
      },
      puntualidad:{
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 5
        }
      },

      trato:{
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 5
        }
      },

      general:{
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 5
        }
      },

      comments:{
        type: DataTypes.STRING 

      },

      
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    },
    {
     freezeTableName: true
    }
) ;

export default REVIEW;
