<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import TaskList from './components/Tasklist.vue';
import AddTaskModal from './components/AddTaskModal.vue';
import EditTaskModal from './components/EditTaskModal.vue';
import ReportModal from './components/reportModal.vue';


const tasks = ref([]);
const showModal = ref(false);
const showEditModal = ref(false); 
const selectedTask = ref(null);
const showReportModal = ref(false);   
const activeTab = ref('all');
const API_URL = 'https://taskmanager-j4zq.onrender.com/api/tasks';

// 2. FETCH TASKS
const fetchTasks = async () => {
  try {
    const res = await axios.get(API_URL);
    // Ensure we handle cases where res.data might not be an array
    tasks.value = Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
};

// 4. ADD THIS: Function to open the edit modal
const openEditModal = (task) => {
  selectedTask.value = { ...task }; // Create a copy
  showEditModal.value = true;
};

// 5. UPDATE handleSaveTask to handle EDITS too
const handleSaveTask = async (taskData) => {
  try {
    // Check if we are editing (id exists) or creating (no id)
    const isEdit = !!taskData.id;
    const url = isEdit ? `${API_URL}/${taskData.id}` : API_URL;
    
    // Construct the exact payload your backend expects
    const payload = {
      title: taskData.title,
      due_date: taskData.due_date,
      priority: taskData.priority,
      status: taskData.status // Keep the existing status
    };

    if (isEdit) {
      // ✅ Use PUT for updates
      await axios.put(url, payload);
    } else {
      // ➕ Use POST for new tasks
      await axios.post(url, payload);
    }

    // Close whichever modal is open
    showModal.value = false;
    showEditModal.value = false; 
    
    // Refresh the list from the database
    await fetchTasks(); 
  } // Inside App.vue -> handleSaveTask
 catch (err) {
  // Extract the specific message from the backend response
  const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
  
  console.error("Save failed details:", err.response?.data); 
  alert("Save failed: " + errorMessage); // This will now show the actual text
}
};

const handleUpdate = async (id, status) => {
  try {
    // Note: Ensure your backend route for PATCH exists as /api/tasks/:id/status
    await axios.patch(`${API_URL}/${id}/status`, { status });
    await fetchTasks();
  } catch (err) {
    console.error("Update failed:", err.response?.data || err.message);
  }
};

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  }
};

// 4. FILTER LOGIC
const filteredTasks = computed(() => {
  if (activeTab.value === 'all') return tasks.value;
  return tasks.value.filter(t => t.status === activeTab.value);
});

// 5. INITIAL LOAD
onMounted(fetchTasks);
</script>

<template>
      <div class="dashboard-container">
        <header class="main-header">
      <div class="brand">
        <h1>My Task Dashboard</h1>
      </div>
      <div class="header-actions">
        <button class="report-btn" @click="showReportModal = true">
          View Daily Report
        </button>
        <button class="add-task-btn" @click="showModal = true">
          <span>+</span> Add New Task
        </button>
      </div>
    </header>

    <ReportModal v-if="showReportModal" @close="showReportModal = false" />

    <AddTaskModal 
      v-if="showModal" 
      @close="showModal = false" 
      @save="handleSaveTask" 
    />

    <EditTaskModal 
      v-if="showEditModal" 
      :task="selectedTask"
      @close="showEditModal = false" 
      @save="handleSaveTask" 
    />

    <nav class="status-menu">
      <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">All Tasks</button>
      <button :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">Pending</button>
      <button :class="{ active: activeTab === 'in_progress' }" @click="activeTab = 'in_progress'">In Progress</button>
      <button :class="{ active: activeTab === 'done' }" @click="activeTab = 'done'">Done</button>
    </nav>

    <section class="list-wrapper">
      <div v-if="filteredTasks.length === 0" style="text-align: center; color: #94a3b8; margin-top: 20px;">
        No tasks found in this category.
      </div>
      
      <TaskList 
        :tasks="filteredTasks" 
        @update-status="handleUpdate"
        @delete-task="handleDelete"
        @edit-task="openEditModal" />
    </section>

    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-stats">
          <span>Total: <strong>{{ tasks.length }}</strong></span>
          <span>Done: <strong>{{ tasks.filter(t => t.status === 'done').length }}</strong></span>
        </div>
        <div class="footer-info">
          <p>&copy; 2026 Task Manager • Built by Pheobe Nyawanda</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Dashboard Styling */
/* Add this to the <style> section of App.vue */
.dashboard-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc; /* Subtle light gray background */
  color: #1e293b;            /* Dark slate text for better visibility */
  display: flex;
  flex-direction: column;
  align-items: center;       /* Centers the content block */
  padding-top: 10px;
}

.main-header {
  width: 90%;
  max-width: 1000px;         /* Prevents it from getting TOO wide */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.report-btn {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.report-btn:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

h1 {
  color: #0f172a;            /* Make the title deep black/blue */
  font-size: 2rem;
  font-weight: 800;
}


.add-task-btn {
  background-color: #10b981; /* Emerald Green */
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* The Status Menu */
.status-menu {
  width: 90%;
  max-width: 1000px;
  display: flex;
  gap: 40px;                 /* Adds space between All, Pending, etc. */
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 30px;
}

.status-menu button {
  padding: 15px 10px;
  font-size: 1.1rem;
  color: #64748b;            /* Muted gray for inactive tabs */
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

.status-menu button.active {
  color: #2563eb;            /* Blue for the active tab */
  border-bottom: 3px solid #2563eb;
}
.footer-content {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  
  /* THIS PART CREATES THE "OPPOSITE" EFFECT */
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  
  padding: 10px 0;
}

/* Optional: Add a little breathing room to the footer itself */
.main-footer {
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
  padding: 20px 0;
}
</style>