import { sequelize } from "../db/conn.js";
import { DataTypes } from "sequelize";

const db = sequelize;

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

export default User;