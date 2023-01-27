import { DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import CONSULT from "./CONSULTA.js";
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
        unique: true
      },
      avatar:{
        type: DataTypes.STRING(300),
      },
      password:{
        type: DataTypes.STRING
      },
      state:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
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