import { sequelize } from "../db/conn.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const db = sequelize;

// Define Tought model
const Tought = db.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

export default Tought;
