import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import CONSULT from "./CONSULT.js";
import REVIEW from "./REVIEW.js";



const USER = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique:true
      },
      lastName:{
        type: DataTypes.STRING
      },
      name:{
        type: DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING,
      },
      avatar:{
        type: DataTypes.STRING(800),
      },
      password:{
        type: DataTypes.STRING
      },
      refreshToken:{
        type: DataTypes.STRING
      },
      resetToken:{
        type: DataTypes.STRING
      },
      confirmEmailToken:{
        type: DataTypes.STRING
      },
      state:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
      },

      phone : {
        type: DataTypes.STRING 
      },

      image : {
        type: DataTypes.STRING 
      }

    },
    {
      timestamps: false,
    }
  );

    USER.hasMany(REVIEW);
    REVIEW.belongsTo(USER);

    USER.hasMany(CONSULT);
    CONSULT.belongsTo(USER);


export default USER;