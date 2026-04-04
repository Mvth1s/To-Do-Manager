<script setup lang="ts"></script>

<template>
  <div class="task-form">
    <h2>Créer une nouvelle tâche</h2>
    
    <form @submit.prevent="createTask">
      <div class="form-group">
        <label for="title">Titre de la tâche</label>
        <input id="title" v-model="nextaskTitle" type="text" placeholder="Entre ta tâche..." class="input"/>
      </div>
      <div v-if="errorMessage" class="error-message">{{errorMessage}}</div>
      
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
}
</style>
