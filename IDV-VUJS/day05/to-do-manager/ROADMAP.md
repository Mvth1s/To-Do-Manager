# To-Do Manager - Feuille de Route du Projet

Bienvenue ! Cette feuille de route te guidera à travers la création de l'application To-Do Manager étape par étape. Suis chaque phase dans l'ordre et complète toutes les tâches avant de passer à la suivante.

**Durée estimée :** 5-8 heures

---

## 📋 Phase 1 : Configuration du Projet (30 minutes)

### Objectif
Préparer l'environnement du projet et s'assurer que tout est installé correctement.

### Tâches

- [ ] **1.1** - Ouvre ton terminal et navigue vers le répertoire du projet
  ```
  cd IDV-VUJS/day05/to-do-manager
  ```

- [ ] **1.2** - Installe toutes les dépendances
  ```
  npm install
  ```
  *Attends la fin de l'installation. Tu devrais voir un dossier `node_modules` apparaître.*

- [ ] **1.3** - Démarre le serveur de développement
  ```
  npm run dev
  ```
  *Tu devrais voir : "Local: http://localhost:5173/"*

- [ ] **1.4** - Ouvre l'application dans ton navigateur
  - Visite `http://localhost:5173`
  - Tu devrais voir la page de bienvenue de Vue.js

- [ ] **1.5** - Installe les extensions recommandées (si tu utilises VS Code)
  - Extension Vue (Official)
  - Extension ESLint
  - Extension Prettier

### ✅ Point de Contrôle
- [ ] Le serveur de développement fonctionne
- [ ] L'application se charge dans le navigateur sans erreurs
- [ ] Le terminal ne montre pas de messages d'erreur

---

## 🏗️ Phase 2 : Créer les Types TypeScript (30 minutes)

### Objectif
Définir les structures de données que ton application utilisera.

### Tâches

- [ ] **2.1** - Crée un nouveau dossier pour les types
  ```
  Crée : src/types/
  ```

- [ ] **2.2** - Crée le fichier des types Task
  ```
  Crée : src/types/Task.ts
  ```

- [ ] **2.3** - Définis l'enum Status
  ```typescript
  export enum Status {
    TODO = "à faire",
    IN_PROGRESS = "en cours",
    DONE = "terminé"
  }
  ```

- [ ] **2.4** - Définis l'interface Task
  ```typescript
  export interface Task {
    id: string | number;
    title: string;
    status: Status;
  }
  ```

### ✅ Point de Contrôle
- [ ] Le fichier `src/types/Task.ts` existe
- [ ] L'enum Status avec 3 valeurs est défini
- [ ] L'interface Task avec id, title, status est définie
- [ ] Aucune erreur TypeScript dans le fichier

---

## 🧩 Phase 3 : Créer les Composants de Base (1 heure)

### Objectif
Créer les composants squelettiques dont tu auras besoin pour l'app.

### Tâches

- [ ] **3.1** - Crée la structure des dossiers de composants
  ```
  Crée : src/components/
  ```

- [ ] **3.2** - Crée le composant Header
  ```
  Crée : src/components/Header.vue
  ```
  
  **Contenu :**
  ```vue
  <template>
    <header class="header">
      <h1>📝 To-Do Manager</h1>
      <p>Reste organisé, reste productif</p>
    </header>
  </template>

  <style scoped>
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  p {
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
  }
  </style>
  ```

- [ ] **3.3** - Crée le composant Footer
  ```
  Crée : src/components/Footer.vue
  ```

  **Contenu :**
  ```vue
  <template>
    <footer class="footer">
      <p>&copy; 2024 Code2Work - Aider les étudiants à rester productifs</p>
    </footer>
  </template>

  <style scoped>
  .footer {
    background: #f5f5f5;
    text-align: center;
    padding: 2rem;
    margin-top: 3rem;
    border-top: 1px solid #ddd;
    color: #666;
  }

  p {
    margin: 0;
  }
  </style>
  ```

- [ ] **3.4** - Crée le composant TaskForm (vide pour maintenant)
  ```
  Crée : src/components/TaskForm.vue
  ```

  **Contenu :**
  ```vue
  <template>
    <div class="task-form">
      <h2>Créer une nouvelle tâche</h2>
      <!-- On ajoutera le formulaire ici dans la Phase 4 -->
    </div>
  </template>

  <style scoped>
  .task-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  ```

- [ ] **3.5** - Crée le composant TaskList (vide pour maintenant)
  ```
  Crée : src/components/TaskList.vue
  ```

  **Contenu :**
  ```vue
  <template>
    <div class="task-list">
      <h2>Tes Tâches</h2>
      <!-- On ajoutera les tâches ici dans la Phase 4 -->
    </div>
  </template>

  <style scoped>
  .task-list {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  ```

- [ ] **3.6** - Crée le composant TaskItem (vide pour maintenant)
  ```
  Crée : src/components/TaskItem.vue
  ```

  **Contenu :**
  ```vue
  <template>
    <div class="task-item">
      <!-- On ajoutera l'affichage de la tâche ici dans la Phase 4 -->
    </div>
  </template>

  <style scoped>
  .task-item {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  </style>
  ```

- [ ] **3.7** - Mets à jour App.vue pour utiliser Header et Footer
  ```vue
  <template>
    <div id="app">
      <Header />
      <main class="container">
        <!-- On ajoutera le contenu ici -->
      </main>
      <Footer />
    </div>
  </template>

  <script setup lang="ts">
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  </script>

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
  ```

### ✅ Point de Contrôle
- [ ] Tous les composants sont créés (Header, Footer, TaskForm, TaskList, TaskItem)
- [ ] Header et Footer apparaissent dans le navigateur
- [ ] Aucun message d'erreur dans la console
- [ ] Les composants ont un style de base

---

## ⚙️ Phase 4 : Construire la Logique Principale (1.5 heures)

### Objectif
Créer les fonctionnalités principales pour gérer les tâches.

### Tâches

- [ ] **4.1** - Configure l'état réactif dans App.vue
  ```typescript
  import { ref } from 'vue'
  import type { Task } from './types/Task'
  import { Status } from './types/Task'

  const tasks = ref<Task[]>([])
  const newTaskTitle = ref<string>('')
  const errorMessage = ref<string>('')
  const nextId = ref<number>(1)
  ```

- [ ] **4.2** - Crée la fonction de validation
  ```typescript
  const validateInput = (): boolean => {
    errorMessage.value = ''
    
    if (newTaskTitle.value.trim() === '') {
      errorMessage.value = 'Le titre de la tâche ne peut pas être vide'
      return false
    }
    
    return true
  }
  ```

- [ ] **4.3** - Crée la fonction de création de tâche
  ```typescript
  const createTask = (): void => {
    if (!validateInput()) return

    const task: Task = {
      id: nextId.value,
      title: newTaskTitle.value.trim(),
      status: Status.TODO
    }

    tasks.value.push(task)
    newTaskTitle.value = ''
    nextId.value++
  }
  ```

- [ ] **4.4** - Crée la fonction de suppression de tâche
  ```typescript
  const deleteTask = (id: string | number): void => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }
  ```

- [ ] **4.5** - Crée la fonction de mise à jour du statut
  ```typescript
  const updateTaskStatus = (id: string | number, newStatus: Status): void => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.status = newStatus
    }
  }
  ```

### ✅ Point de Contrôle
- [ ] Toutes les fonctions sont définies dans App.vue
- [ ] Aucune erreur TypeScript
- [ ] Les fonctions sont correctement typées

---

## 📝 Phase 5 : Construire le Composant TaskForm (45 minutes)

### Objectif
Créer un formulaire pour ajouter de nouvelles tâches.

### Tâches

- [ ] **5.1** - Mets à jour le template de TaskForm.vue
  ```vue
  <template>
    <div class="task-form">
      <h2>Créer une nouvelle tâche</h2>
      
      <form @submit.prevent="createTask">
        <div class="form-group">
          <label for="title">Titre de la tâche</label>
          <input
            id="title"
            v-model="newTaskTitle"
            type="text"
            placeholder="Entre ta tâche..."
            class="input"
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary">Ajouter une Tâche</button>
      </form>
    </div>
  </template>
  ```

- [ ] **5.2** - Mets à jour le script de TaskForm.vue
  ```typescript
  <script setup lang="ts">
  defineProps<{
    newTaskTitle: string
    errorMessage: string
  }>()

  defineEmits<{
    createTask: []
  }>()
  </script>
  ```

- [ ] **5.3** - Ajoute le style de TaskForm
  ```css
  <style scoped>
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

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  </style>
  ```

- [ ] **5.4** - Mets à jour App.vue pour utiliser TaskForm
  ```vue
  <TaskForm 
    :newTaskTitle="newTaskTitle"
    :errorMessage="errorMessage"
    @createTask="createTask"
  />
  ```

### ✅ Point de Contrôle
- [ ] TaskForm s'affiche dans le navigateur
- [ ] Le formulaire accepte les entrées
- [ ] Le message d'erreur apparaît quand on soumet une tâche vide
- [ ] De nouvelles tâches peuvent être créées

---

## 📋 Phase 6 : Construire TaskList et TaskItem (1 heure)

### Objectif
Afficher les tâches dans une liste agréable avec la possibilité de changer le statut et de supprimer.

### Tâches

- [ ] **6.1** - Mets à jour le template de TaskItem.vue
  ```vue
  <template>
    <div class="task-item" :class="`task-${task.status}`">
      <div class="task-header">
        <h3>{{ task.title }}</h3>
        <span class="task-status" :class="`status-${task.status}`">
          {{ task.status }}
        </span>
      </div>

      <div class="task-actions">
        <button
          v-if="task.status !== 'à faire'"
          @click="$emit('updateStatus', 'à faire')"
          class="btn btn-small"
        >
          À Faire
        </button>

        <button
          v-if="task.status !== 'en cours'"
          @click="$emit('updateStatus', 'en cours')"
          class="btn btn-small"
        >
          En Cours
        </button>

        <button
          v-if="task.status !== 'terminé'"
          @click="$emit('updateStatus', 'terminé')"
          class="btn btn-small"
        >
          Terminé
        </button>

        <button
          @click="$emit('deleteTask')"
          class="btn btn-small btn-danger"
        >
          Supprimer
        </button>
      </div>
    </div>
  </template>
  ```

- [ ] **6.2** - Mets à jour le script de TaskItem.vue
  ```typescript
  <script setup lang="ts">
  import type { Task } from '../types/Task'
  
  defineProps<{
    task: Task
  }>()

  defineEmits<{
    updateStatus: [status: string]
    deleteTask: []
  }>()
  </script>
  ```

- [ ] **6.3** - Ajoute le style de TaskItem
  ```css
  <style scoped>
  .task-item {
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .task-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .task-item.task-à\ faire {
    border-left: 4px solid #95a5a6;
  }

  .task-item.task-en\ cours {
    border-left: 4px solid #f39c12;
  }

  .task-item.task-terminé {
    border-left: 4px solid #27ae60;
    background: #f0fdf4;
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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

  .status-à\ faire {
    background: #ecf0f1;
    color: #7f8c8d;
  }

  .status-en\ cours {
    background: #fef3c7;
    color: #d97706;
  }

  .status-terminé {
    background: #dcfce7;
    color: #16a34a;
  }

  .task-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
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
  }

  .btn-small:hover {
    background: #5568d3;
  }

  .btn-danger {
    background: #e74c3c;
  }

  .btn-danger:hover {
    background: #c0392b;
  }
  </style>
  ```

- [ ] **6.4** - Mets à jour le template de TaskList.vue
  ```vue
  <template>
    <div class="task-list">
      <h2>Tes Tâches ({{ tasks.length }})</h2>

      <div v-if="tasks.length === 0" class="empty-state">
        <p>Pas de tâches pour le moment. Crée-en une pour commencer ! 🚀</p>
      </div>

      <div v-else>
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @updateStatus="(status) => $emit('updateStatus', task.id, status)"
          @deleteTask="$emit('deleteTask', task.id)"
        />
      </div>
    </div>
  </template>
  ```

- [ ] **6.5** - Mets à jour le script de TaskList.vue
  ```typescript
  <script setup lang="ts">
  import type { Task } from '../types/Task'
  import TaskItem from './TaskItem.vue'

  defineProps<{
    tasks: Task[]
  }>()

  defineEmits<{
    updateStatus: [id: string | number, status: string]
    deleteTask: [id: string | number]
  }>()
  </script>
  ```

- [ ] **6.6** - Ajoute le style de TaskList
  ```css
  <style scoped>
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
  ```

- [ ] **6.7** - Mets à jour App.vue pour utiliser TaskList
  ```vue
  <TaskList 
    :tasks="tasks"
    @updateStatus="updateTaskStatus"
    @deleteTask="deleteTask"
  />
  ```

### ✅ Point de Contrôle
- [ ] Les tâches apparaissent comme une liste dans le navigateur
- [ ] Le statut de la tâche peut être changé en cliquant sur les boutons
- [ ] Les tâches peuvent être supprimées
- [ ] Le message d'état vide s'affiche quand il n'y a pas de tâches
- [ ] Le style semble propre et professionnel

---

## 💾 Phase 7 : Ajouter la Persistance localStorage (45 minutes)

### Objectif
Sauvegarder les tâches pour qu'elles persistent quand la page est rafraîchie.

### Tâches

- [ ] **7.1** - Crée les fonctions utilitaires localStorage dans App.vue
  ```typescript
  import { onMounted } from 'vue'

  const STORAGE_KEY = 'tasks'

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
          const maxId = Math.max(...tasks.value.map(t => 
            typeof t.id === 'number' ? t.id : 0
          ))
          nextId.value = maxId + 1
        }
      } catch (e) {
        console.error('Erreur lors du chargement des tâches:', e)
      }
    }
  }
  ```

- [ ] **7.2** - Charge les tâches au montage du composant
  ```typescript
  onMounted(() => {
    loadTasks()
  })
  ```

- [ ] **7.3** - Sauvegarde les tâches après en créer une nouvelle
  Mets à jour `createTask()`:
  ```typescript
  const createTask = (): void => {
    if (!validateInput()) return

    const task: Task = {
      id: nextId.value,
      title: newTaskTitle.value.trim(),
      status: Status.TODO
    }

    tasks.value.push(task)
    saveTasks()  // Ajoute cette ligne
    newTaskTitle.value = ''
    nextId.value++
  }
  ```

- [ ] **7.4** - Sauvegarde les tâches après suppression
  Mets à jour `deleteTask()`:
  ```typescript
  const deleteTask = (id: string | number): void => {
    tasks.value = tasks.value.filter(task => task.id !== id)
    saveTasks()  // Ajoute cette ligne
  }
  ```

- [ ] **7.5** - Sauvegarde les tâches après mise à jour du statut
  Mets à jour `updateTaskStatus()`:
  ```typescript
  const updateTaskStatus = (id: string | number, newStatus: Status): void => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.status = newStatus
      saveTasks()  // Ajoute cette ligne
    }
  }
  ```

- [ ] **7.6** - Teste localStorage
  - Ajoute une tâche
  - Rafraîchis la page (F5)
  - La tâche devrait toujours être là
  - Essaie de changer le statut et de supprimer - les changements devraient persister

### ✅ Point de Contrôle
- [ ] Les tâches persistent après rafraîchissement de la page
- [ ] localStorage n'a pas d'erreurs dans la console
- [ ] Tous les changements de tâche (créer, supprimer, statut) sont sauvegardés

---

## 🎨 Phase 8 : Peaufiner et Finitions (1 heure)

### Objectif
Rendre l'application soignée et professionnelle.

### Tâches

- [ ] **8.1** - Mets à jour les styles globaux dans App.vue
  ```css
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                 'Helvetica Neue', Arial, sans-serif;
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
  ```

- [ ] **8.2** - Ajoute le design réactif
  - Teste l'app sur mobile (DevTools du navigateur)
  - Tous les boutons doivent être lisibles
  - Pas de défilement horizontal
  - Les formulaires doivent être faciles à utiliser

- [ ] **8.3** - Vérifie la palette de couleurs
  - En-tête : Gradient violet ✓
  - Boutons : Bleu au survol ✓
  - Indicateurs de statut : Couleurs différentes ✓
  - Arrière-plan : Gris clair ✓

- [ ] **8.4** - Vérifie l'accessibilité
  - Tous les boutons ont des labels
  - Les entrées de formulaire ont des labels
  - Les messages d'erreur sont clairs
  - Le contraste des couleurs est bon

- [ ] **8.5** - Teste toutes les fonctionnalités
  - [ ] Crée une tâche avec une entrée vide → Erreur affichée
  - [ ] Crée une tâche valide → Tâche ajoutée à la liste
  - [ ] Change le statut de la tâche → La liste se met à jour immédiatement
  - [ ] Supprime une tâche → La tâche est retirée de la liste
  - [ ] Rafraîchis la page → Toutes les tâches sont toujours là
  - [ ] Supprime une tâche et rafraîchis → La tâche a disparu

### ✅ Point de Contrôle
- [ ] L'application semble professionnelle
- [ ] Responsive sur mobile et desktop
- [ ] Toutes les fonctionnalités fonctionnent comme prévu
- [ ] Aucune erreur dans la console

---

## ✅ Phase 9 : Vérification Finale (30 minutes)

### Objectif
S'assurer que tout répond aux exigences du projet.

### Liste de Vérification

**Exigences Fonctionnelles :**
- [ ] Peut créer des tâches en utilisant un formulaire
- [ ] Peut supprimer des tâches
- [ ] Peut voir la liste des tâches avec titre et statut
- [ ] Peut changer le statut de la tâche (À Faire → En Cours → Terminé)
- [ ] Un en-tête est présent
- [ ] Un pied de page est présent

**Exigences Techniques :**
- [ ] TypeScript est utilisé partout
- [ ] L'interface Task avec id, title, status existe
- [ ] L'enum Status avec 3 valeurs existe
- [ ] Les composants sont modulaires et réutilisables
- [ ] localStorage est utilisé pour la persistance
- [ ] Aucune API externe n'est appelée
- [ ] La validation des entrées est présente
- [ ] Les messages d'erreur s'affichent sur les entrées invalides

**Qualité du Code :**
- [ ] ESLint : `npm run lint` passe
- [ ] Vérification de type : `npm run type-check` passe
- [ ] Code formaté : `npm run format`
- [ ] Pas d'erreurs dans la console

**Documentation :**
- [ ] README.md est complet
- [ ] ROADMAP.md est en place
- [ ] Le code est commenté où nécessaire

### Tests Finaux

- [ ] **Test 1 :** Crée 3 tâches avec des noms différents
- [ ] **Test 2 :** Déplace toutes les tâches à travers différents statuts
- [ ] **Test 3 :** Supprime la tâche du milieu
- [ ] **Test 4 :** Rafraîchis la page
- [ ] **Test 5 :** Vérifie que toutes les tâches restantes sont toujours là
- [ ] **Test 6 :** Essaie de créer une tâche avec une entrée vide
- [ ] **Test 7 :** Vérifie que le message d'erreur apparaît

### ✅ Point de Contrôle Final
- [ ] Toutes les exigences sont respectées
- [ ] L'application est fonctionnelle
- [ ] Le code est propre et typé
- [ ] Prêt pour la soumission

---

## 🚀 Déploiement

Une fois que tout est terminé et testé :

```bash
# Construis pour la production
npm run build

# Le dossier dist contient maintenant ton app de production
# Cela peut être déployé sur n'importe quel service d'hébergement statique
```

---

## 📚 Ressources Utiles

- **Docs Vue 3 :** https://vuejs.org/guide/introduction.html
- **Manuel TypeScript :** https://www.typescriptlang.org/docs/
- **Guide localStorage :** https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
- **Guide Vite :** https://vitejs.dev/guide/

---

## 💡 Conseils pour Réussir

1. **Travaille à travers les phases dans l'ordre** - Ne saute pas !
2. **Teste souvent** - Vérifie ton navigateur après chaque changement
3. **Lis les messages d'erreur** - Ils te disent ce qui ne va pas
4. **Utilise le débogage VS Code** - Cela aide à attraper les problèmes tôt
5. **Garde les composants simples** - Une responsabilité par composant
6. **Demande de l'aide** - Quand tu es bloqué, prends une pause et reviens
7. **Sauvegarde fréquemment** - Utilise `Ctrl+S` ou `Cmd+S` souvent

---

## ❌ Erreurs Courantes à Éviter

- ❌ Ne pas définir correctement les types TypeScript
- ❌ Oublier de sauvegarder dans localStorage après chaque changement
- ❌ Ne pas valider les entrées du formulaire avant de créer des tâches
- ❌ Mélanger la logique des composants avec le template
- ❌ Oublier de passer correctement les props et emits
- ❌ Ne pas tester dans le navigateur après chaque phase

---

**Bonne chance ! Tu peux le faire ! 💪**

Pour des questions ou des problèmes, consulte le README.md ou les liens de ressources ci-dessus.