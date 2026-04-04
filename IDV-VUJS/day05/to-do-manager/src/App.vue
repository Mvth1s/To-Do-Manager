<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { ref } from 'vue'
import type { Task } from '@/types/Task'
import { Status } from '@/types/Task'

const task = ref<Task[]>([])
const newTaskTitle = ref<string>('')
const errorMessage = ref<string>('')
const nextId = ref<number>(1)

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

  task.value.push(task)
  newTaskTitle.value = ''
  nextId.value++
}

const deleteTask = (id: string | number): void => {
  task.value = task.value.filter((task) => task.id !== id)
}

const updateTaskStatus = (id: string | number, newStatus: Status): void => {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.status = newStatus
  }
}
</script>

<template>
  <Header />
  <main class="container">
    <TaskFrom :newTaskTitle="newTaskTitle" :errorMessage="errorMessage" @createTask="createTask" />
  </main>
  <Footer />
</template>

<style>
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
</style>
