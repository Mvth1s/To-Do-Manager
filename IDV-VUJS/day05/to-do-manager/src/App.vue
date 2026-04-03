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
</script>

<template>
  <Header />
  <main class="container"></main>
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
