import express from "express";
import { 
  createTask, 
  getTaskById,
  getAllTasks, 
  updateTaskStatus,
  updateTask, 
  deleteTask, 
  getDailyReport 
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/report", getDailyReport); 
router.put("/:id", updateTask);
router.get('/:id', getTaskById);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;