<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import TaskList from './components/TaskList.vue';
import AddTaskModal from './components/AddTaskModal.vue';

// 1. STATE
const tasks = ref([]);
const showModal = ref(false);
const activeTab = ref('all'); // Added: This was missing!
const API_URL = 'https://taskmanager-j4zq.onrender.com/api/tasks';

// 2. FETCH TASKS
const fetchTasks = async () => {
  try {
    const res = await axios.get(API_URL);
    tasks.value = res.data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
};

// 3. ACTIONS
const handleSaveTask = async (taskData) => {
  try {
    await axios.post(API_URL, taskData);
    showModal.value = false;
    fetchTasks(); // Refresh list after saving
  } catch (err) {
    console.error("Error saving task:", err);
  }
};

const handleUpdate = async (id, status) => {
  try {
    await axios.patch(`${API_URL}/${id}/status`, { status });
    fetchTasks();
  } catch (err) {
    console.error("Update failed:", err);
  }
};

const handleDelete = async (id) => {
  if (confirm("Are you sure?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed:", err);
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
      <button class="add-task-btn" @click="showModal = true">
        <span>+</span> Add New Task
      </button>
    </header>

    <AddTaskModal 
      v-if="showModal" 
      @close="showModal = false" 
      @save="handleSaveTask" 
    />

    <nav class="status-menu">
      <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">All Tasks</button>
      <button :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">Pending</button>
      <button :class="{ active: activeTab === 'in_progress' }" @click="activeTab = 'in_progress'">In Progress</button>
      <button :class="{ active: activeTab === 'done' }" @click="activeTab = 'done'">Done</button>
    </nav>

    <section class="list-wrapper">
      <TaskList 
        :tasks="filteredTasks" 
        @update-status="handleUpdate"
        @delete-task="handleDelete"
      />
    </section>
  </div>
</template>

<style>
/* Your existing CSS is fine - it looks good! */
</style>

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
  padding-top: 50px;
}

.main-header {
  width: 90%;
  max-width: 1000px;         /* Prevents it from getting TOO wide */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
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
</style>