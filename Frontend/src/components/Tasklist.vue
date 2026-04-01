<script setup>
import TaskCard from './Taskcard.vue';

// 1. Receive the tasks from App.vue
const props = defineProps(['tasks']);

// 2. ADD 'edit-task' to the emits list 
const emit = defineEmits(['update-status', 'delete-task', 'edit-task']);

</script>

<template>
  <div class="task-list">
    <TaskCard 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task"
      @update-status="(id, stat) => $emit('update-status', id, stat)"
      @delete-task="(id) => $emit('delete-task', id)"
      @edit-task="(task) => $emit('edit-task', task)"  />
  </div>
</template>

<style scoped>

.empty-state {
  text-align: center;
  color: #94a3b8;
  grid-column: 1 / -1;
  padding: 40px;
}
.task-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  width: 100%; 
  max-width: 1400px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .task-list {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
  }
}
</style>