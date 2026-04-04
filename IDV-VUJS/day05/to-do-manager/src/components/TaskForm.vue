<script setup lang="ts">
import {ref} from 'vue'

defineProps<{
  errorMessage: string
}>()

const emit = defineEmits<{
  createTask: [title: string]
}>()

const inputTitle = ref<string>('')

const handleSubmit = () => {
  emit('createTask', inputTitle.value)
  inputTitle.value=''
}
</script>

<template>
  <div class="task-form">
    <h2>Créer une nouvelle tâche</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Titre de la tâche</label>
        <input
          id="title"
          v-model="inputTitle"
          type="text"
          placeholder="Entre ta tâche..."
          class="input"
        />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <button type="submit" class="btn btn-primary">Ajouter une Tâche</button>
    </form>
  </div>
</template>

<style>
.task-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}
.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  color: #e74c3c;
  margin: 1rem 0;
  padding: 0.75rem;
  background: #fadbd8;
  border-radius: 4px;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary{
  background: #667eea;
  color: white;
}
.btn-primary:hover {
  background: #5568d3;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
