<script setup>
import { ref } from 'vue';

// 1. Accept the existing task as a prop from the parent
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

// 2. Initialize with a copy of the task props
// This allows the user to type without changing the main list until they hit "Save"
const editedTask = ref({ ...props.task });

const submitForm = () => {
  // Validation
  if (!editedTask.value.title.trim()) {
    return alert("Please enter a task title.");
  }
  
  if (!editedTask.value.due_date) {
    return alert("Please select a due date.");
  }

  // 3. Emit the updated data (including the ID, which is usually in props.task)
  emit('save', { ...editedTask.value });
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Edit Task</h2>
      
      <div class="form-group">
        <label>Task Title</label>
        <input 
          v-model="editedTask.title" 
          type="text" 
          placeholder="Update title..." 
          required
        />
      </div>

      <div class="form-group">
        <label>Due Date</label>
        <input 
          v-model="editedTask.due_date" 
          type="date" 
          required
        />
      </div>

      <div class="form-group">
        <label>Priority</label>
        <select v-model="editedTask.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
        <button type="submit" class="btn-save" @click.prevent="submitForm">
          Update Task
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain consistent with your AddTask modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}
.modal-content {
  background: white; padding: 30px; border-radius: 15px;
  width: 90%;
  max-width: 400px; 
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
h2 { margin-top: 0; color: #1e293b; margin-bottom: 20px; }
.form-group { margin-bottom: 20px; display: flex; flex-direction: column; }
.form-group label { font-size: 0.9rem; font-weight: 600; margin-bottom: 6px; color: #475569; }
input, select { 
  padding: 12px; 
  border: 1px solid #cbd5e1; 
  border-radius: 8px; 
  font-size: 1rem;
}
input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
}
.modal-actions { display: flex; gap: 12px; margin-top: 10px; }
/* ✅ Standardized Green styles */
.btn-save { 
  background: #10b981; /* Emerald Green - matching AddTask/header */
  color: white; 
  /* ... other styles remain the same ... */
  border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;
}
.btn-save:hover { background: #059669; } /* Darker green hover */
.btn-cancel { background: #f1f5f9; color: #64748b; flex: 1; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>