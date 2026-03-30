import express from "express";
import { 
  createTask, 
  getTaskById,
  getAllTasks, 
  updateTaskStatus, 
  deleteTask, 
  getDailyReport 
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get('/:id', getTaskById);
router.get("/", getAllTasks);
router.get("/report", getDailyReport); // Put this BEFORE /:id
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;