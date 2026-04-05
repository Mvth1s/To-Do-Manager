<script setup lang="ts">
import type { Task } from '@/types/Task.ts'
import TaskItem from '@/components/TaskItem.vue'

defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  updateStatus: [id: string | number, status: string]
  deleteTask: [id: string | number]
  editTask: [task: Task]
  toggleSubtask: [taskId: string | number, subtaskIndex: number]
  updateSubtask: [taskId: string | number, subtaskIndex: number, newTitle: string]
  deleteSubtask: [taskId: string | number, subtaskIndex: number]
}>()
</script>

<template>
  <div class="task-list" role="region" aria-label="Liste de vos tâches">
    <h2>Tes Tâches ({{ tasks.length }})</h2>

    <div v-if="tasks.length === 0" class="empty-state" aria-live="polite">
      <p>Pas de tâches pour le moment. Crées-en une pour commencer !</p>
    </div>

    <div v-else role="list" aria-label="Tâches à gérer">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        role="listitem"
        @updateStatus="(status) => $emit('updateStatus', task.id, status)"
        @deleteTask="$emit('deleteTask', task.id)"
        @editTask="(t) => $emit('editTask', t)"
        @toggleSubtask="(subtaskIndex) => $emit('toggleSubtask', task.id, subtaskIndex)"
        @updateSubtask="
          (subtaskIndex, newTitle) => $emit('updateSubtask', task.id, subtaskIndex, newTitle)
        "
        @deleteSubtask="(subtaskIndex) => $emit('deleteSubtask', task.id, subtaskIndex)"
      />
    </div>
  </div>
</template>

<style>
.task-list {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}
.empty-state p {
  font-size: 1.1rem;
  margin: 0;
}
</style>
