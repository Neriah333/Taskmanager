<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'save']);

// Initialize with defaults that match your Sequelize model
const newTask = ref({
  title: '',
  due_date: '',
  priority: 'medium' // Changed to 'medium' to match your DB default
});

const submitForm = () => {
  // 1. Validation: Prevent the 400 error before it hits the network
  if (!newTask.value.title.trim()) {
    return alert("Please enter a task title.");
  }
  
  if (!newTask.value.due_date) {
    return alert("Please select a due date.");
  }

  // 2. Emit the data to App.vue
  // We send a copy to avoid reactivity issues during the reset
  emit('save', { ...newTask.value });

  // 3. Reset form for the next time it opens
  newTask.value = { 
    title: '', 
    due_date: '', 
    priority: 'medium' 
  };
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Add New Task</h2>
      
      <div class="form-group">
        <label>Task Title</label>
        <input 
          v-model="newTask.title" 
          type="text" 
          placeholder="What needs to be done?" 
          required
        />
      </div>

      <div class="form-group">
        <label>Due Date</label>
        <input 
          v-model="newTask.due_date" 
          type="date" 
          required
        />
      </div>

      <div class="form-group">
        <label>Priority</label>
        <select v-model="newTask.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
        <button type="submit" class="btn-save" @click.prevent="submitForm">
          Save Task
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Slightly darker for focus */
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px); /* Adds a nice modern touch */
}
.modal-content {
  background: white; padding: 30px; border-radius: 15px;
  width: 90%;
  max-width: 400px; 
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
h2 { margin-top: 0; color: #1e293b; margin-bottom: 20px; }
.form-group { margin-bottom: 20px; display: flex; flex-direction: column; }
.form-group label { font-size: 0.9rem; font-weight: 600; margin-bottom: 6px; color: #475569; }
input, select { 
  padding: 12px; 
  border: 1px solid #cbd5e1; 
  border-radius: 8px; 
  font-size: 1rem;
  transition: border-color 0.2s;
}
input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  ring: 2px solid #bfdbfe;
}
.modal-actions { display: flex; gap: 12px; margin-top: 10px; }
.btn-save { background: #10b981; color: white; flex: 2; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.btn-save:hover { background: #059669; }
.btn-cancel { background: #f1f5f9; color: #64748b; flex: 1; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.btn-cancel:hover { background: #e2e8f0; }
</style>