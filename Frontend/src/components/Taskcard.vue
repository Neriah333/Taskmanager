<template>
  <div class="task-card" :class="task.priority">
    <div class="card-content">
      <div class="task-details">
        <span class="priority-label">
          <span class="dot"></span> {{ task.priority.toUpperCase() }}
        </span>
        <h3>{{ task.title }}</h3>
        <p class="due-date">Due: {{ task.due_date || 'No date' }}</p>
      </div>

      <div class="card-actions">
        <p class="action-label">Action</p>
        <button v-if="task.status === 'pending'" @click="$emit('update-status', task.id, 'in_progress')">
           ▶️ Start Working
        </button>
        <button v-if="task.status === 'in_progress'" @click="$emit('update-status', task.id, 'done')">
           👉 Mark as Done
        </button>
        <button v-if="task.status === 'done'" class="delete-btn" @click="$emit('delete-task', task.id)">
           🗑️ Delete
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 8px solid #cbd5e1; /* Default */
  padding: 20px;
}

/* Priority Borders */
.task-card.high { border-left-color: #ef4444; }
.task-card.medium { border-left-color: #f59e0b; }
.task-card.low { border-left-color: #10b981; }

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 { margin: 8px 0; font-size: 1.2rem; color: #1e293b; }
.priority-label { font-size: 0.75rem; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 5px; }
.dot { height: 8px; width: 8px; border-radius: 50%; background: currentColor; }

.action-label { font-size: 0.7rem; color: #94a3b8; margin-bottom: 5px; text-transform: uppercase; }

.card-actions button {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
</style>