<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { ref, onMounted } from 'vue'
import type { Task } from '@/types/Task'
import { Status } from '@/types/Task'

const task = ref<Task[]>([])
const newTaskTitle = ref<string>('')
const errorMessage = ref<string>('')
const nextId = ref<number>(1)

const STORAGE_KEY = 'tasks'

const validateInput = (): boolean => {
  errorMessage.value = ''

  if (newTaskTitle.value.trim() === '') {
    errorMessage.value = 'Le titre de la tâche ne peut pas être vide'
    return false
  }
  return true
}

const createTask = (): void => {
  if (!validateInput()) return

  const task: Task = {
    id: nextId.value,
    title: newTaskTitle.value.trim(),
    status: Status.TODO,
  }

  tasks.value.push(task)
  saveTasks()
  newTaskTitle.value = ''
  nextId.value++
}

const deleteTask = (id: string | number): void => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  saveTask()
}

const updateTaskStatus = (id: string | number, newStatus: string): void => {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.status = newStatus
    saveTask()
  }
}

const saveTasks = (): void => {
  localStorage.setItems(STORAGE_KEY, JSON.stringify(tasks.value))
}

const loadTask = (): void => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      task.value = JSON.parse(saved)
      // Mets à jour nextId basé sur les tâches existantes
      if (tasks.value.length > 0) {
        const maxId = Math.max(...task.value.map((t) => (typeof t.id === 'number' ? t.id : 0)))
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
  <Header />
  <main class="container">
    <TaskFrom :newTaskTitle="newTaskTitle" :errorMessage="errorMessage" @createTask="createTask" />
    <TaskList :task="tasks" @updateStatus="updateTaskStatus" @deleteTask="deleteTask" />
  </main>
  <Footer />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Sego UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

@media (max-width: 768px){
  main{
    margin: 1rem auto;
  }
}
</style>
