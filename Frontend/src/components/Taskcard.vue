<script setup>
// 1. Define Props: This allows the card to receive the task object
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

// 2. Define Emits: This allows the card to send actions back to App.vue
const emit = defineEmits(['update-status', 'delete-task', 'edit-task']);

// Helper to format the status for display if needed
const formatStatus = (status) => {
  return status.replace('_', ' ').toUpperCase();
};
</script>

<template>
  <div class="task-card" :class="task.priority?.toLowerCase()">
    <div class="card-content">
      <div class="task-details">
        <span class="priority-label">
          <span class="dot"></span> {{ task.priority?.toUpperCase() || 'MEDIUM' }}
        </span>
        <h3>{{ task.title }}</h3>
        <p class="due-date">
          <strong>Due:</strong> {{ task.due_date || 'No date set' }}
        </p>
        <span class="status-badge" :class="task.status">
          {{ task.status?.replace('_', ' ') }}
        </span>
      </div>

      <div class="card-actions">
        <p class="action-label">Action</p>
        
        <button 
          class="btn-edit"
          @click="emit('edit-task', task)"
        >
           Edit Task
        </button>

        <button 
          v-if="task.status === 'pending'" 
          class="btn-start"
          @click="emit('update-status', task.id, 'in_progress')"
        >
           Start
        </button>

        <button 
          v-if="task.status === 'in_progress'" 
          class="btn-done"
          @click="emit('update-status', task.id, 'done')"
        >
           Finish
        </button>

        <button 
          v-if="task.status === 'done'" 
          class="btn-delete" 
          @click="emit('delete-task', task.id)"
        >
           Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border-left: 2px solid #cbd5e1; /* Fallback color */
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}


.task-card.high { border-left-color: #ef4444; }    
.task-card.medium { border-left-color: #f59e0b; }  
.task-card.low { border-left-color: #10b981; }    

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.task-details h3 {
  margin: 8px 0;
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 700;
}

.priority-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.05em;
}

.dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: currentColor;
}

.due-date {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 8px;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: #f1f5f9;
  color: #475569;
}


.card-actions {
  text-align: right;
  min-width: 120px;
}

.action-label {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-weight: 700;
}


.btn-edit { 
  background: #f8fafc; 
  color: #475569; 
  border-color: #e2e8f0 !important; 
  margin-bottom: 8px; /* Space between Edit and the next button */
}

.btn-edit:hover { 
  background: #f1f5f9; 
  color: #1e293b;
}


.card-actions button {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  border: 1px solid transparent;
  transition: all 0.2s;
  display: block; /* Ensures they stack vertically */
}

.btn-start { background: #eff6ff; color: #2563eb; border-color: #dbeafe !important; }
.btn-start:hover { background: #dbeafe; }

.btn-done { background: #f0fdf4; color: #16a34a; border-color: #dcfce7 !important; }
.btn-done:hover { background: #dcfce7; }

.btn-delete { background: #fef2f2; color: #dc2626; border-color: #fee2e2 !important; }
.btn-delete:hover { background: #fee2e2; }
@media (max-width: 600px) {
  .task-card {
    padding: 12px; 
  }

  .card-content {
    flex-direction: column; 
    align-items: flex-start;
    gap: 10px;
  }

  .task-details h3 {
    font-size: 1rem; 
  }

  .card-actions {
    width: 100%;
    text-align: left;
    margin-top: 15px;
    border-top: 1px inset #f1f5f9;
    padding-top: 15px;
  }

  .card-actions button {
    display: inline-block; 
    width: auto;
    margin-right: 8px;
    padding: 8px 16px;
  }
}
</style>