import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

<<<<<<< HEAD
=======

>>>>>>> main
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
<<<<<<< HEAD
    season: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
=======
    area: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(300)
    },
>>>>>>> main
  },
  {
    timestamps: false,
  }
);

<<<<<<< HEAD
AREA.hasMany(PROFESIONAL);
PROFESIONAL.belongsTo(AREA);
=======

>>>>>>> main

export default AREA;
