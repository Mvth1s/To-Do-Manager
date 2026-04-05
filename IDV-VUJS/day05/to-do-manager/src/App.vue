<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'

import { ref, onMounted } from 'vue'
import type { Task } from '@/types/Task'
import { Status } from '@/types/Task'

const tasks = ref<Task[]>([])
const errorMessage = ref<string>('')
const nextId = ref<number>(1)

const STORAGE_KEY = 'tasks'

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

  const task: Task = {
    id: nextId.value,
    ...taskData,
    status: Status.TODO,
  }

  tasks.value.push(task)
  saveTasks()
  nextId.value++
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
})
</script>

<template>
  <AppHeader />
  <main class="container">
    <TaskForm :errorMessage="errorMessage" @createTask="createTask" />
    <TaskList
      :tasks="tasks"
      @updateStatus="updateTaskStatus"
      @deleteTask="deleteTask"
      @toggleSubtask="toggleSubtask"
      @updateSubtask="updateSubtask"
      @deleteSubtask="deleteSubtask"
    />
  </main>
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

@media (max-width: 768px) {
  main {
    margin: 1rem auto;
  }
}
</style>
