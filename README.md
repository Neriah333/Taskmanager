#  Task Manager System

##  Full-Stack Task Management Dashboard

Task Manager is more than just a to-do list. It is a full-stack solution that demonstrates:

-  **Component-Driven UI**: Built with Vue 3 (Composition API) for a fast, reactive front-end  
-  **RESTful API Architecture**: Node.js & Express backend handling data operations  
-  **Relational Data Management**: MySQL with Sequelize ORM for structured data  
-  **Responsive Design**: Optimized for both desktop and mobile using Flexbox & Grid  

---

##  Key Features

-  **Full CRUD**: Create, Read, Update, and Delete tasks  
-  **Priority System**: Visual cues (Red / Amber / Green) based on urgency  
-  **Status Filtering**: Filter tasks by *Pending*, *In Progress*, and *Done*  
-  **Live Dashboard**: Real-time task statistics  

---

##  Live Demo

 **Live App:** https://taskmanager-alpha-gilt.vercel.app/ 

##  Live Deployment

-  Frontend (Vercel): https://taskmanager-alpha-gilt.vercel.app/  
-  Backend API (Render): https://taskmanager-j4zq.onrender.com/  

> The backend is deployed on Render and connected to a MySQL database on Aiven cloud.  
> The frontend is hosted on Vercel and communicates with the backend via environment variables.
---

##  Tech Stack
- **Frontend:** Vue 3 (Vite), Axios, Lucide Icons
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Hosted on **Aiven Cloud**), Sequelize ORM, 
- **Deployment:** Vercel (Frontend), Render (Backend)
## Dependencies
** Backend **
express
cors
dotenv
mysql2
sequelize

** Frontend **
axios
vue

## Project Sructure 
📁 Root
Task Manager/
│
├── Backend/
├── Frontend/
├── README.md

Backend/
│
├── config/              # DB connection
├── controllers/         # Business logic
├── models/              # Database models
├── routes/              # API routes
│   └── taskRoutes.js
│
├── .env                 # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── server.js            # Entry point

Frontend/
│
├── .vscode/             # Editor settings (optional)
├── node_modules/
├── public/
├── src/                 # Your React/Vue app code
│
├── .env                 # API URL (important)
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md

##  How to Run Locally

### 1. Prerequisites
- **Node.js** (v16.x or higher)
- **npm** (comes with Node)
- **MySQL Server** (Running locally or on a cloud instance)

---
### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Neriah333/Taskmanager.git
   
   ``` 
   or download the zip folder, extract it and open on vscode

```bash
cd Backend
npm install
```
```bash
cd ../Frontend
npm install
```

2. **Environment Setup**
      ## ☁️ Optional: Aiven Cloud Database Setup

      This project can be connected to a managed cloud database using Aiven.

      ### Steps:
      1. Create an account on Aiven
      2. Create a new MySQL service
      3. Copy the connection details

      ### Update your `.env` file:

      ```env
      DB_HOST=your-aiven-host
      DB_PORT=your-port
      DB_USER=your-username
      DB_PASSWORD=your-password
      DB_NAME=your-database
   
   Frontend
    ```env
   VITE_API_URL=https://your-backend-url.com
    ```

Run migrations:

npx sequelize-cli db:migrate

3. **Start the application**
   ```bash
   # Start server (from Backend directory)
   npm run dev

   # Start client (from Frontend directory, in a new terminal)
   npm run dev
   ```
## Usage

### Access the Application
- **Client:** http://localhost:5173
- **Server API:** http://localhost:5000

##  Deployment Guide

### Backend Deployment (Render)

1. Go to https://render.com and create an account  
2. Click **New Web Service**
3. Connect your GitHub repository with your backend folder as the root. 
4. Configure the service:
   - **Build Command:**  
     ```bash
     npm install
     ```
   - **Start Command:**  
     ```bash
     npm run start
     ```
5. Add Environment Variables
    Create a `.env` file in the `/Backend` directory and add your Aiven or Local MySQL credentials:

    ```env
    PORT=5000
    DB_NAME=defaultdb
    DB_USER=your_aiven_username
    DB_PASS=your_aiven_password
    DB_HOST=your_aiven_host_url
    DB_PORT=27167
    DB_DIALECT=mysql

### Frontend Deployment (Vercel)
1. Go to https://vercel.com and create an account  
2. Sign in and Click New Project
3. Connect your GitHub repository with your frontend folder as the root. 
4. Configure the service:
   - **Build Command:**  
     ```bash
     npm install
     ```
   - **Start Command:**  
     ```bash
     npm run start
     ```
5. Add Environment Variables
    Create a `.env` file and add

    ```env

   VITE_API_URL=https://your-backend-url.com

6. Click Deploy.

## API Endpoints

### Tasks
- `GET /api/tasks` — Retrieve all tasks from Aiven MySQL.
- `POST /api/tasks` — Create a new task.
- `PUT /api/tasks/:id` — Update task details (Title, Date, Priority).
- `PATCH /api/tasks/:id/status` — Quick update for task status (Pending → Done).
- `DELETE /api/tasks/:id` — Permanently remove a task.
- `GET /api/tasks//report` - Get daily report.

 ### Example API Request
To test your backend or integrate a new feature, you can use Postman or cURL. Here is what a request to create a new task looks like:

 POST /api/tasks
1. Headers:
Content-Type: application/json

2. Request Body:

JSON
{
  "title": "Deploy Frontend to Vercel",
  "due_date": "2026-03-31",
  "priority": "high",
  
}
Success Response (201 Created):

{
    "status": "pending",
    "created_at": "2026-03-30T11:25:00.744Z",
    "updated_at": "2026-03-30T11:25:00.744Z",
    "id": 4,
    "title": "Deploy Frontend to Vercel",
    "due_date": "2026-03-30",
    "priority": "high"
}
