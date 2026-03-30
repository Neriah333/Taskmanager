<script setup>
import TaskCard from './Taskcard.vue';

// 1. Receive the tasks from App.vue
const props = defineProps(['tasks']);

// 2. Declare EVERY event you intend to send to the parent
const emit = defineEmits(['update-status', 'delete-task']);

// Note: You don't necessarily need forwardUpdate functions 
// if you are emitting directly in the template, but it's cleaner to keep them.
</script>

<template>
  <div class="task-list">
    <div v-if="!tasks || tasks.length === 0" class="empty-state">
      <p>No tasks found.</p>
    </div>

    <TaskCard 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task"
      @update-status="(id, stat) => $emit('update-status', id, stat)"
      @delete-task="(id) => $emit('delete-task', id)"
    />
  </div>
</template>

<style scoped>
.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
}
.empty-state {
  text-align: center;
  color: #94a3b8;
  grid-column: 1 / -1;
  padding: 40px;
}
</style>