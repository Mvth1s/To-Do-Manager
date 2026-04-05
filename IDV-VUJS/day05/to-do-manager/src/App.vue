<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Task } from '@/types/Task'
import { Status } from '@/types/Task'

const tasks = ref<Task[]>([])
const errorMessage = ref<string>('')
const nextId = ref<number>(1)
const showFormModal = ref<boolean>(false)
const editingTask = ref<Task | null>(null)
const selectedFilter = ref<Status | 'all'>('all')

const STORAGE_KEY = 'tasks'

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    showFormModal.value = false
    editingTask.value = null
  }
}

const filteredTasks = computed(() => {
  if (selectedFilter.value === 'all') {
    return tasks.value
  }
  return tasks.value.filter((task) => task.status === selectedFilter.value)
})

const validateInput = (title: string): boolean => {
  errorMessage.value = ''

  if (title.trim() === '') {
    errorMessage.value = 'Le titre de la tâche ne peut pas être vide'
    return false
  }
  return true
}

const createTask = (taskData: Omit<Task, 'id' | 'status'>): void => {
  if (!validateInput(taskData.title)) return

  if (editingTask.value) {
    // Mode édition
    const taskToUpdate = tasks.value.find((task) => task.id === editingTask.value!.id)
    if (taskToUpdate) {
      taskToUpdate.title = taskData.title
      taskToUpdate.description = taskData.description
      taskToUpdate.subtasks = taskData.subtasks
      saveTasks()
    }
    editingTask.value = null
  } else {
    // Mode création
    const task: Task = {
      id: nextId.value,
      ...taskData,
      status: Status.TODO,
    }

    tasks.value.push(task)
    saveTasks()
    nextId.value++
  }

  showFormModal.value = false
}

const startEditTask = (task: Task): void => {
  editingTask.value = { ...task }
  showFormModal.value = true
}

const closeModal = (): void => {
  showFormModal.value = false
  editingTask.value = null
}

const openCreateModal = (): void => {
  editingTask.value = null
  showFormModal.value = true
}

const deleteTask = (id: string | number): void => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  saveTasks()
}

const updateTaskStatus = (id: string | number, newStatus: string): void => {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.status = newStatus as Status
    saveTasks()
  }
}

const toggleSubtask = (taskId: string | number, subtaskIndex: number): void => {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task && task.subtasks && task.subtasks[subtaskIndex]) {
    task.subtasks[subtaskIndex].completed = !task.subtasks[subtaskIndex].completed
    saveTasks()
  }
}

const updateSubtask = (taskId: string | number, subtaskIndex: number, newTitle: string): void => {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task && task.subtasks && task.subtasks[subtaskIndex]) {
    task.subtasks[subtaskIndex].title = newTitle.trim()
    saveTasks()
  }
}

const deleteSubtask = (taskId: string | number, subtaskIndex: number): void => {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task && task.subtasks) {
    task.subtasks.splice(subtaskIndex, 1)
    saveTasks()
  }
}

const saveTasks = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
}

const loadTasks = (): void => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      tasks.value = JSON.parse(saved)
      // Mets à jour nextId basé sur les tâches existantes
      if (tasks.value.length > 0) {
        const maxId = Math.max(...tasks.value.map((t) => (typeof t.id === 'number' ? t.id : 0)))
        nextId.value = maxId + 1
      }
    } catch (e) {
      console.error('Erreur lors du chargement des tâches:', e)
    }
  }
}

onMounted(() => {
  loadTasks()
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <AppHeader />
  <main class="container">
    <div class="task-list-header">
      <button
        @click="openCreateModal"
        class="btn btn-primary btn-create"
        aria-label="Créer une nouvelle tâche"
      >
        ➕ Créer une nouvelle tâche
      </button>
    </div>

    <div class="filter-buttons" role="group" aria-label="Filtrer les tâches par status">
      <button
        @click="selectedFilter = 'all'"
        :class="['filter-btn', { active: selectedFilter === 'all' }]"
        :aria-pressed="selectedFilter === 'all'"
        aria-label="Afficher toutes les tâches"
      >
        Toutes les tâches
      </button>
      <button
        @click="selectedFilter = Status.TODO"
        :class="['filter-btn', { active: selectedFilter === Status.TODO }]"
        :aria-pressed="selectedFilter === Status.TODO"
        aria-label="Afficher les tâches à faire"
      >
        À faire
      </button>
      <button
        @click="selectedFilter = Status.IN_PROGRESS"
        :class="['filter-btn', { active: selectedFilter === Status.IN_PROGRESS }]"
        :aria-pressed="selectedFilter === Status.IN_PROGRESS"
        aria-label="Afficher les tâches en cours"
      >
        En cours
      </button>
      <button
        @click="selectedFilter = Status.DONE"
        :class="['filter-btn', { active: selectedFilter === Status.DONE }]"
        :aria-pressed="selectedFilter === Status.DONE"
        aria-label="Afficher les tâches terminées"
      >
        Terminé
      </button>
    </div>

    <TaskList
      :tasks="filteredTasks"
      @updateStatus="updateTaskStatus"
      @deleteTask="deleteTask"
      @editTask="startEditTask"
      @toggleSubtask="toggleSubtask"
      @updateSubtask="updateSubtask"
      @deleteSubtask="deleteSubtask"
    />
  </main>

  <!-- Modal Overlay -->
  <div v-if="showFormModal" class="modal-overlay" @click="closeModal" aria-hidden="true"></div>

  <!-- Modal -->
  <div
    v-if="showFormModal"
    class="modal"
    @click.stop
    role="dialog"
    aria-modal="true"
    :aria-labelledby="editingTask ? 'modal-edit-title' : 'modal-create-title'"
  >
    <div class="modal-content">
      <button class="modal-close" @click="closeModal" aria-label="Fermer le formulaire">✕</button>
      <TaskForm :errorMessage="errorMessage" :editingTask="editingTask" @createTask="createTask" />
    </div>
  </div>

  <AppFooter />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Sego UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f8f9fa;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  max-width: 1000px;
  margin: 2rem auto;
  width: 100%;
  padding: 0 1rem;
}

.task-list-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.btn-create {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  width: 100%;
  max-width: 400px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  min-width: 500px;
  max-width: 600px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 0.65rem 1.25rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #666;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  main {
    margin: 1rem auto;
  }

  .modal-content {
    min-width: auto;
    width: 90%;
    max-width: 100%;
    margin: 1rem;
  }

  .filter-buttons {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
