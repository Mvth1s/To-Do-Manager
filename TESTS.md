# 🧪 Documentation des Tests Unitaires

## Vue d'ensemble

Ce projet utilise **Vitest** pour les tests unitaires avec **@vue/test-utils** pour tester les composants Vue.

**Statistiques actuelles :**
- ✅ 87 tests au total
- ✅ 100% des tests passent
- 📊 3 suites de tests

---

## 🚀 Installation et Exécution

### Installation des dépendances
```bash
npm install
```

Les packages de test sont déjà inclus :
- `vitest` : Framework de test
- `@vue/test-utils` : Utilitaires pour tester les composants Vue
- `@vitest/ui` : Interface visuelle pour les tests
- `happy-dom` : Environnement DOM léger

### Commandes disponibles

```bash
# Exécuter tous les tests
npm test

# Mode watch (tests automatiques au changement de fichier)
npm test -- --watch

# Interface visuelle (UI)
npm run test:ui

# Couverture de code
npm run test:coverage

# Tests spécifiques
npm test -- TaskForm.spec.ts
```

---

## 📁 Structure des Tests

```
src/__tests__/
├── taskLogic.spec.ts      # Tests de la logique métier
├── TaskForm.spec.ts       # Tests du formulaire
└── TaskItem.spec.ts       # Tests de l'item de tâche
```

---

## 📋 Détail des Suites de Tests

### 1️⃣ `taskLogic.spec.ts` (32 tests)

**Objective :** Tester toute la logique métier indépendamment des composants.

#### Sections :

**Task Creation**
- ✅ Création avec titre et status
- ✅ Création avec description et sous-tâches
- ✅ Création avec titre seul

**Task Modification**
- ✅ Mise à jour du titre
- ✅ Mise à jour du statut
- ✅ Mise à jour de la description
- ✅ Mise à jour des sous-tâches

**Subtasks Management**
- ✅ Ajout de sous-tâches
- ✅ Suppression de sous-tâches
- ✅ Basculer l'état de complétude
- ✅ Renommage de sous-tâches

**Completion Percentage Calculation**
- ✅ Calcul 0%
- ✅ Calcul 50%
- ✅ Calcul 100%
- ✅ Cas sans sous-tâches

**Task Filtering**
- ✅ Filtrage par status (TODO, IN_PROGRESS, DONE)
- ✅ Affichage de toutes les tâches

**Input Validation**
- ✅ Validation titre vide/non-vide
- ✅ Trimming des espaces
- ✅ Description optionnelle

**LocalStorage Persistence**
- ✅ Sauvegarde et récupération
- ✅ Gestion des cas vides
- ✅ Préservation des sous-tâches

**Task Deletion**
- ✅ Suppression par ID
- ✅ Comportement si ID inexistant

**Status Enum**
- ✅ Valeurs correctes
- ✅ Validation des statuts

---

### 2️⃣ `TaskForm.spec.ts` (24 tests)

**Objective :** Tester le composant formulaire de création/modification.

#### Sections :

**Rendering**
- ✅ Affichage titre création
- ✅ Affichage titre modification
- ✅ Champs input et textarea
- ✅ Texte du bouton (création vs modification)

**Title Input**
- ✅ Pré-remplissage au champ titre
- ✅ Pré-remplissage au champ description
- ✅ Nettoyage quand editingTask devient null

**Subtasks Management**
- ✅ Ajout de sous-tâches
- ✅ Ajout multiples
- ✅ Suppression de sous-tâches
- ✅ Basculement de complétude
- ✅ Pré-remplissage au champ sous-tâches
- ✅ Refus des sous-tâches vides

**Form Submission**
- ✅ Émission événement avec données
- ✅ Inclusion description
- ✅ Inclusion sous-tâches
- ✅ Nettoyage après soumission

**Error Handling**
- ✅ Affichage message erreur
- ✅ Masquage si vide

**Accessibility**
- ✅ aria-label présent
- ✅ aria-required sur titre
- ✅ role="list" sur sous-tâches

---

### 3️⃣ `TaskItem.spec.ts` (31 tests)

**Objective :** Tester l'affichage et interactions des tâches.

#### Sections :

**Rendering**
- ✅ Affichage titre
- ✅ Affichage statut
- ✅ Affichage description si présente
- ✅ Masquage description si absente

**Task Status Display**
- ✅ Classes CSS correctes par statut (TODO, IN_PROGRESS, DONE)

**Subtasks Display**
- ✅ Rendu section sous-tâches
- ✅ Rendu tous les items
- ✅ Affichage titre

**Completion Percentage**
- ✅ Calcul 0%, 50%, 100%
- ✅ Mise à jour dynamique

**Status Change Buttons**
- ✅ Émission d'événements
- ✅ Masquage du statut courant
- ✅ Affichage des autres statuts

**Subtask Interactions**
- ✅ Bascule checkbox
- ✅ Suppression sous-tâche
- ✅ Boutons édition/suppression

**Edit and Delete Buttons**
- ✅ Émission editTask
- ✅ Émission deleteTask

**Completed Subtask Styling**
- ✅ Classe "completed" appliquée
- ✅ Classe masquée si incomplet

**Accessibility**
- ✅ aria-label sur tâche
- ✅ role="article"
- ✅ role="progressbar"
- ✅ aria-valuenow
- ✅ aria-label sur boutons
- ✅ role="list" sur sous-tâches

---

## 📊 Résultats Attendus

Exécution réussie :
```
Test Files  3 passed (3)
Tests  87 passed (87)
```

---

## 🔍 Lire les Résultats

### Format de sortie

```
✓ nom_du_test                    [temps_ms]
× nom_du_test_échoué            [temps_ms]
```

- ✅ `✓` : Test réussi
- ❌ `×` : Test échoué
- 📂 Chemin du fichier affiché entre parenthèses

### Exemple complet

```
✓ src/__tests__/taskLogic.spec.ts (32 tests) 13ms
  ✓ Task Logic (groupe)
    ✓ should create a task with title and status TODO
    ✓ should validate that title is not empty
    × should calculate invalid percentage
```

---

## 📝 Ajouter de Nouveaux Tests

### Étape 1 : Créer le fichier

Créer `src/__tests__/NomduTest.spec.ts`

### Étape 2 : Template de base

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MonComposant from '@/components/MonComposant.vue'

describe('Mon Composant', () => {
  describe('Ma section', () => {
    it('should faire quelque chose', () => {
      // Arrange
      const valeur = 'test'
      
      // Act
      const resultat = valeur.trim()
      
      // Assert
      expect(resultat).toBe('test')
    })
  })
})
```

### Étape 3 : Exécuter

```bash
npm test
```

---

## 🎯 Bonnes Pratiques

✅ **À faire :**
- Un `describe` par feature/composant
- Des tests petits et ciblés
- Utiliser des noms explicites
- Tester les cas nominal ET les cas limites
- Isoler les tests avec `beforeEach`

❌ **À éviter :**
- Tests trop longs (>10 assertions)
- Dépendances entre tests
- Tests flaky (qui échouent aléatoirement)
- Tester l'implémentation au lieu du comportement

---

## 🐛 Déboguer

### Mode verbose
```bash
npm test -- --reporter=verbose
```

### Watch mode sur un fichier
```bash
npm test -- TaskForm.spec.ts --watch
```

### Utiliser console.log
```typescript
it('should do something', () => {
  const result = someFunction()
  console.log('Result:', result)  // Visible dans output
  expect(result).toBe(expected)
})
```

---

## 📚 Ressources

- [Documentation Vitest](https://vitest.dev/)
- [Documentation Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

## 💡 Prochaines Étapes

- Ajouter des tests d'intégration pour les workflows complets
- Ajouter des tests E2E avec Playwright ou Cypress
- Atteindre une couverture >80%
- Ajouter des tests de performance