<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'save']);

const newTask = ref({
  title: '',
  due_date: '',
  priority: 'low'
});

const submitForm = () => {
  if (!newTask.value.title) return alert("Title is required!");
  emit('save', { ...newTask.value });
  // Reset form
  newTask.value = { title: '', due_date: '', priority: 'low' };
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Add New Task</h2>
      
      <div class="form-group">
        <label>Task Title</label>
        <input v-model="newTask.title" type="text" placeholder="What needs to be done?" />
      </div>

      <div class="form-group">
        <label>Due Date</label>
        <input v-model="newTask.due_date" type="date" />
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
        <button class="btn-cancel" @click="$emit('close')">Cancel</button>
        <button class="btn-save" @click.prevent="submitForm">Save Task</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white; padding: 30px; border-radius: 15px;
  width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.form-group label { font-weight: bold; margin-bottom: 5px; color: #475569; }
input, select { padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
.modal-actions { display: flex; gap: 10px; margin-top: 20px; }
.btn-save { background: #10b981; color: white; flex: 1; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }
.btn-cancel { background: #f1f5f9; flex: 1; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }
</style>