import 'dotenv/config'; 
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js"; 
import taskRoutes from "./routes/taskRoutes.js"; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// Database Sync & Server Start
sequelize.sync({ alter: true }) 
  .then(() => {
    console.log(" Database synced successfully");
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to sync database:", err);
  });