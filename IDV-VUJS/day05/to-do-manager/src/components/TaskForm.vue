<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task, Subtask } from '@/types/Task'

const props = defineProps<{
  errorMessage: string
  editingTask?: Task | null
}>()

const emit = defineEmits<{
  createTask: [task: Omit<Task, 'id' | 'status'>]
}>()

const inputTitle = ref<string>('')
const inputDescription = ref<string>('')
const subtasks = ref<Subtask[]>([])
const newSubtaskTitle = ref<string>('')

// Vide tous les champs du formulaire
const resetForm = () => {
  inputTitle.value = ''
  inputDescription.value = ''
  subtasks.value = []
  newSubtaskTitle.value = ''
}

// Remplit le formulaire quand on modifie une tâche, sinon le vide pour en créer une nouvelle
watch(
  () => props.editingTask,
  (newVal) => {
    if (newVal) {
      // On a une tâche à modifier : affiche ses infos
      inputTitle.value = newVal.title
      inputDescription.value = newVal.description || ''
      subtasks.value = newVal.subtasks ? [...newVal.subtasks] : []
    } else {
      // Pas de tâche : prépare un formulaire vide
      resetForm()
    }
  },
  { immediate: true },
)

// Envoie les données du formulaire pour créer ou modifier une tâche
const handleSubmit = () => {
  const task: Omit<Task, 'id' | 'status'> = {
    title: inputTitle.value,
  }

  if (inputDescription.value.trim()) {
    task.description = inputDescription.value
  }

  if (subtasks.value.length > 0) {
    task.subtasks = subtasks.value
  }

  emit('createTask', task)
  resetForm()
}

// Ajoute une nouvelle sous-tâche à la liste
const addSubtask = () => {
  if (newSubtaskTitle.value.trim()) {
    subtasks.value.push({
      title: newSubtaskTitle.value.trim(),
      completed: false,
      weight: 1,
    })
    newSubtaskTitle.value = ''
  }
}

// Supprime une sous-tâche
const removeSubtask = (index: number) => {
  subtasks.value.splice(index, 1)
}

// Marque une sous-tâche comme faite ou non faite
const toggleSubtask = (index: number) => {
  if (subtasks.value[index]) {
    subtasks.value[index].completed = !subtasks.value[index].completed
  }
}
</script>

<template>
  <div class="task-form">
    <h2 :id="props.editingTask ? 'modal-edit-title' : 'modal-create-title'">
      {{ props.editingTask ? 'Modifier la tâche' : 'Créer une nouvelle tâche' }}
    </h2>

    <form @submit.prevent="handleSubmit" aria-label="Formulaire de création/modification de tâche">
      <div class="form-group">
        <label for="title">Titre de la tâche *</label>
        <input
          id="title"
          v-model="inputTitle"
          type="text"
          placeholder="Entre ta tâche..."
          class="input"
          required
          aria-required="true"
          :aria-invalid="errorMessage ? 'true' : 'false'"
          :aria-describedby="errorMessage ? 'error-message' : undefined"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="inputDescription"
          placeholder="Ajoute des détails (optionnel)..."
          class="input textarea"
          rows="3"
          aria-label="Description optionnelle de la tâche"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="new-subtask">Sous-tâches</label>
        <div class="subtask-input-group">
          <input
            id="new-subtask"
            v-model="newSubtaskTitle"
            type="text"
            placeholder="Ajoute une sous-tâche..."
            class="input"
            @keyup.enter="addSubtask"
            aria-label="Champ pour ajouter une nouvelle sous-tâche"
          />
          <button
            type="button"
            @click="addSubtask"
            class="btn btn-secondary"
            aria-label="Ajouter une sous-tâche à la liste"
          >
            Ajouter
          </button>
        </div>

        <div v-if="subtasks.length > 0" class="subtasks-list" role="list">
          <div
            v-for="(subtask, index) in subtasks"
            :key="index"
            class="subtask-item"
            role="listitem"
          >
            <input
              type="checkbox"
              :checked="subtask.completed"
              @change="toggleSubtask(index)"
              class="checkbox"
              :aria-label="`Marquer '${subtask.title}' comme ${subtask.completed ? 'incomplète' : 'complète'}`"
            />
            <span :class="{ completed: subtask.completed }">{{ subtask.title }}</span>
            <button
              type="button"
              @click="removeSubtask(index)"
              class="btn btn-small btn-danger"
              :aria-label="`Supprimer la sous-tâche '${subtask.title}'`"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="errorMessage"
        id="error-message"
        class="error-message"
        role="alert"
        aria-live="polite"
      >
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary">
        {{ props.editingTask ? 'Mettre à jour' : 'Ajouter une Tâche' }}
      </button>
    </form>
  </div>
</template>

<style>
.task-form {
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 0;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
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
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.subtask-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.subtask-input-group .input {
  flex: 1;
}

.subtasks-list {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.subtask-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #eee;
}

.subtask-item:last-child {
  margin-bottom: 0;
}

.checkbox {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.subtask-item span {
  flex: 1;
  word-break: break-word;
}

.subtask-item span.completed {
  text-decoration: line-through;
  color: #999;
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

.btn-primary {
  background: #667eea;
  color: white;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.btn-primary:hover {
  background: #5568d3;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
  padding: 0.75rem 1rem;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-small {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.btn-danger {
  background: #e74c3c;
  color: white;
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.btn-danger:hover {
  background: #c0392b;
}
</style>
