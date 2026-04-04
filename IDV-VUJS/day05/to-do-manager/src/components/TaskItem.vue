<script setup lang="ts">
import type { Task } from '@/types/Task.ts'

defineProps<{
  task: Task
}>()

defineEmits<{
  updateStatus: [status: string]
  deleteTask: []
}>()
</script>

<template>
  <div class="task-item" :class="`task-${task.status}`">
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <span class="task-status" :class="`status-${task.status}`">{{ task.status }}</span>
    </div>

    <div class="task-actions">
      <button
        v-if="task.status !== 'to do'"
        @click="$emit('updateStatus', 'to do')"
        class="btn btn-small"
      >
        A faire
      </button>

      <button
        v-if="task.status !== 'in progress'"
        @click="$emit('updateStatus', 'in progress')"
        class="btn btn-small"
      >
        En cours
      </button>

      <button
        v-if="task.status !== 'done'"
        @click="$emit('updateStatus', 'done')"
        class="btn btn-small"
      >
        Terminé
      </button>

      <button @click="$emit('deleteTask')" class="btn btn-small btn-danger">Supprimer</button>
    </div>
  </div>
</template>

<style>
.task-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}
.task-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.task-item.task-to\ do {
  border-left: 4px solid #95a5a6;
}
.task-item.task-in\ progress {
  border-left: 4px solid #f39c12;
}
.task-item.task-done {
  border-left: 4px solid #27ae60;
  background: #f0fdf4;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h3 {
  margin: 0;
  color: #333;
}

.task-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-to\ do {
  background: #ecf0f1;
  color: #7f8c8d;
}
.status-in\ progress {
  background: #fef3c7;
  color: #d97706;
}
.status-done {
  background: #dcfce7;
  color: #16a34a;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}
.btn-small {
  background: #667eea;
  color: white;
}
.btn-small:hover {
  background: #5568d3;
}
.btn-danger {
  background: #e74c3c;
}
.btn-danger:hover {
  background: #c0392b;
}
</style>
