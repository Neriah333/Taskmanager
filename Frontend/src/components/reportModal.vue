<script setup>
import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['close']);
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const reportData = ref(null);
const loading = ref(false);

const fetchReport = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`https://taskmanager-j4zq.onrender.com/api/tasks/report?date=${selectedDate.value}`);
    reportData.value = res.data.summary;
  } catch (err) {
    alert("Failed to fetch report");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content report-modal">
      <h2>Daily Task Report</h2>
      
      <div class="form-group">
        <label>Select Date</label>
        <input type="date" v-model="selectedDate" @change="fetchReport" />
      </div>

      <div v-if="loading" class="loading">Loading report...</div>

      <div v-if="reportData" class="report-results">
        <table class="report-table">
          <thead>
            <tr>
              <th>Priority</th>
              <th>Pending</th>
              <th>In Progress</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stats, priority) in reportData" :key="priority">
              <td class="capitalize">{{ priority }}</td>
              <td>{{ stats.pending }}</td>
              <td>{{ stats.in_progress }}</td>
              <td>{{ stats.done }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="btn-close" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.report-modal { max-width: 500px; }
.report-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
.report-table th, .report-table td { 
  border: 1px solid #e2e8f0; 
  padding: 10px; 
  text-align: center; 
}
.report-table th { background: #f8fafc; }
.capitalize { text-transform: capitalize; font-weight: bold; }
.btn-close { 
  margin-top: 20px; 
  width: 100%; 
  padding: 10px; 
  background: #64748b; 
  color: white; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer;
}
</style>