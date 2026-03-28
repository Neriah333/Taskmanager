import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    allowNull: false,
    defaultValue: "medium",
  },

  status: {
    type: DataTypes.ENUM("pending", "in_progress", "done"),
    allowNull: false,
    defaultValue: "pending",
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "tasks",
  timestamps: false, 
});

export default Task;