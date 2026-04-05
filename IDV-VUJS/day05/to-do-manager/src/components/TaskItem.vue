<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Task, Subtask } from '@/types/Task'

const { task } = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  updateStatus: [status: string]
  deleteTask: []
  editTask: [task: Task]
  toggleSubtask: [subtaskIndex: number]
  updateSubtask: [subtaskIndex: number, newTitle: string]
  deleteSubtask: [subtaskIndex: number]
}>()

const editingSubtaskIndex = ref<number | null>(null)
const editingSubtaskTitle = ref<string>('')

const completionPercent = computed(() => {
  if (!task.subtasks || task.subtasks.length === 0) return 0
  const completed = task.subtasks.filter((s: Subtask) => s.completed).length
  return Math.round((completed / task.subtasks.length) * 100)
})

const startEditingSubtask = (index: number) => {
  if (task.subtasks && task.subtasks[index]) {
    editingSubtaskIndex.value = index
    editingSubtaskTitle.value = task.subtasks[index].title
  }
}

const saveSubtaskEdit = (index: number) => {
  if (editingSubtaskTitle.value.trim()) {
    emit('updateSubtask', index, editingSubtaskTitle.value)
  }
  editingSubtaskIndex.value = null
  editingSubtaskTitle.value = ''
}

const cancelEditingSubtask = () => {
  editingSubtaskIndex.value = null
  editingSubtaskTitle.value = ''
}
</script>

<template>
  <div
    class="task-item"
    :class="`task-${task.status}`"
    role="article"
    :aria-label="`Tâche: ${task.title}, Statut: ${task.status}`"
  >
    <div class="task-header">
      <h3>{{ task.title }}</h3>
      <span
        class="task-status"
        :class="`status-${task.status}`"
        aria-label="`Statut: ${task.status}`"
        >{{ task.status }}</span
      >
    </div>

    <div v-if="task.description" class="task-description">
      {{ task.description }}
    </div>

    <div
      v-if="task.subtasks && task.subtasks.length > 0"
      class="subtasks-section"
      role="region"
      aria-label="Sous-tâches"
    >
      <div class="subtasks-header">
        <h4>Sous-tâches ({{ completionPercent }}%)</h4>
        <div
          class="progress-bar"
          role="progressbar"
          :aria-valuenow="completionPercent"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`Progression: ${completionPercent}%`"
        >
          <div class="progress-fill" :style="{ width: completionPercent + '%' }"></div>
        </div>
      </div>

      <div class="subtasks-list" role="list">
        <div
          v-for="(subtask, index) in task.subtasks"
          :key="index"
          class="subtask-row"
          :class="{ completed: subtask.completed }"
          role="listitem"
        >
          <input
            type="checkbox"
            :checked="subtask.completed"
            @change="emit('toggleSubtask', index)"
            class="subtask-checkbox"
            :aria-label="`Marquer '${subtask.title}' comme ${subtask.completed ? 'incomplète' : 'complète'}`"
            :aria-checked="subtask.completed"
          />

          <div v-if="editingSubtaskIndex === index" class="subtask-edit">
            <input
              v-model="editingSubtaskTitle"
              type="text"
              class="subtask-input"
              @keyup.enter="saveSubtaskEdit(index)"
              @keyup.escape="cancelEditingSubtask"
              autofocus
              aria-label="Champ d'édition de la sous-tâche"
            />
            <button
              @click="saveSubtaskEdit(index)"
              class="btn btn-small btn-success"
              aria-label="Confirmer la modification"
            >
              ✓
            </button>
            <button
              @click="cancelEditingSubtask"
              class="btn btn-small btn-secondary"
              aria-label="Annuler la modification"
            >
              ✕
            </button>
          </div>

          <span v-else class="subtask-title">{{ subtask.title }}</span>

          <div v-if="editingSubtaskIndex !== index" class="subtask-actions">
            <button
              @click="startEditingSubtask(index)"
              class="btn btn-small btn-edit"
              :aria-label="`Modifier la sous-tâche '${subtask.title}'`"
            >
              ✎
            </button>
            <button
              @click="emit('deleteSubtask', index)"
              class="btn btn-small btn-danger"
              :aria-label="`Supprimer la sous-tâche '${subtask.title}'`"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="task-actions" role="group" aria-label="Actions pour cette tâche">
      <button
        v-if="task.status !== 'to do'"
        @click="emit('updateStatus', 'to do')"
        class="btn btn-small"
        aria-label="Marquer comme à faire"
      >
        A faire
      </button>

      <button
        v-if="task.status !== 'in progress'"
        @click="emit('updateStatus', 'in progress')"
        class="btn btn-small"
        aria-label="Marquer comme en cours"
      >
        En cours
      </button>

      <button
        v-if="task.status !== 'done'"
        @click="emit('updateStatus', 'done')"
        class="btn btn-small"
        aria-label="Marquer comme terminé"
      >
        Terminé
      </button>

      <button
        @click="emit('editTask', task)"
        class="btn btn-small btn-edit"
        :aria-label="`Modifier la tâche '${task.title}'`"
      >
        Modifier
      </button>

      <button
        @click="emit('deleteTask')"
        class="btn btn-small btn-danger"
        :aria-label="`Supprimer la tâche '${task.title}'`"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
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

.task-item.task-to.do {
  border-left: 4px solid #95a5a6;
}

.task-item.task-in.progress {
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
  margin-bottom: 0.75rem;
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

.status-to.do {
  background: #ecf0f1;
  color: #7f8c8d;
}

.status-in.progress {
  background: #fef3c7;
  color: #d97706;
}

.status-done {
  background: #dcfce7;
  color: #16a34a;
}

.task-description {
  background: #f9f9f9;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.4;
  border-left: 3px solid #667eea;
}

.subtasks-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 4px;
}

.subtasks-header {
  margin-bottom: 1rem;
}

.subtasks-header h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 0.95rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.subtasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.subtask-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}

.subtask-row:hover {
  border-color: #667eea;
  background: #f9f9ff;
}

.subtask-row.completed {
  background: #f0fdf4;
  border-color: #d1fae5;
}

.subtask-checkbox {
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.subtask-title {
  flex: 1;
  word-break: break-word;
  color: #333;
}

.subtask-row.completed .subtask-title {
  text-decoration: line-through;
  color: #999;
}

.subtask-edit {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  align-items: center;
}

.subtask-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid #667eea;
  border-radius: 3px;
  font-size: 0.9rem;
}

.subtask-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.subtask-actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
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
  padding: 0.4rem 0.8rem;
}

.btn-small:hover {
  background: #5568d3;
}

.btn-edit {
  background: #3498db;
}

.btn-edit:hover {
  background: #2980b9;
}

.btn-success {
  background: #27ae60;
}

.btn-success:hover {
  background: #229954;
}

.btn-secondary {
  background: #95a5a6;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-danger {
  background: #e74c3c;
}

.btn-danger:hover {
  background: #c0392b;
}
</style>
