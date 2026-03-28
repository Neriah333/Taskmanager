import Task from "../models/tasks.js"; // Note the .js extension
import sequelize from "../config/db.js";

// 1. Create Task
export const createTask = async (req, res) => {
  try {
    const { title, due_date } = req.body;

    
    const today = new Date().toISOString().split('T')[0]; 
    if (due_date < today) {
      return res.status(400).json({ message: "due_date must be today or later" });
    }

    
    const duplicate = await Task.findOne({ where: { title, due_date } });
    if (duplicate) {
      return res.status(400).json({ message: "Task with this title and due date already exists" });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. List Tasks
export const getAllTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = status ? { status } : {};

    const tasks = await Task.findAll({
      where: whereClause,
      
      order: [
        [sequelize.literal("FIELD(priority, 'high', 'medium', 'low')"), "ASC"],
        ["due_date", "ASC"]
      ]
    });

    if (tasks.length === 0) {
      return res.status(200).json({ message: "No tasks found", tasks: [] });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Update Task Status 
export const updateTaskStatus = async (req, res) => {
  try {
    const { status: newStatus } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const statusOrder = ["pending", "in_progress", "done"];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextIndex = statusOrder.indexOf(newStatus);

    if (nextIndex !== currentIndex + 1) {
      return res.status(400).json({ 
        message: `Invalid transition from ${task.status} to ${newStatus}` 
      });
    }

    task.status = newStatus;
    task.updated_at = new Date();
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 4. Delete Task (Only if 'done')
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status !== "done") {
      return res.status(403).json({ message: "Forbidden: Only 'done' tasks can be deleted" });
    }

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Daily Report
export const getDailyReport = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const tasks = await Task.findAll({ where: { due_date: date } });

    const summary = {
      high: { pending: 0, in_progress: 0, done: 0 },
      medium: { pending: 0, in_progress: 0, done: 0 },
      low: { pending: 0, in_progress: 0, done: 0 }
    };

    tasks.forEach(t => {
      if (summary[t.priority]) summary[t.priority][t.status]++;
    });

    res.json({ date, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};