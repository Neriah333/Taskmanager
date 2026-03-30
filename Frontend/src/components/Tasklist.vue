<script setup>
import TaskCard from './Taskcard.vue';

const props = defineProps(['tasks']);
const emit = defineEmits(['refresh']);

// Pass the events from the Card up to the App.vue
const forwardUpdate = (id, status) => emit('update-status', id, status);
const forwardDelete = (id) => emit('delete-task', id);
</script>

<template>
  <div class="task-list">
    <TaskCard 
      v-for="task in tasks" 
      :key="task.id" 
      :task="task"
      @update-status="(id, stat) => $emit('update-status', id, stat)"
      @delete-task="(id) => $emit('delete-task', id)"
    />
  </div>
</template>