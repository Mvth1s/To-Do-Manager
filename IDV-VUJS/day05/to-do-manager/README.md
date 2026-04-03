# To-Do Manager Application

A task management web application designed for Code2Work, a startup dedicated to helping alternation students stay organized and productive. This To-Do Manager helps users centralize daily tasks, track progress, and manage their projects efficiently.

## Project Description

**To-Do Manager** is a Vue 3 + TypeScript single-page application that enables users to:
- Create and manage daily tasks with a clear, intuitive interface
- Organize tasks across three status categories: To Do, In Progress, and Done
- Modify task status with a single click
- Delete completed or unwanted tasks
- Persist all task data locally using browser localStorage
- Experience a responsive, type-safe application built with modern web technologies

This project serves as a functional prototype demonstrating the power of Vue.js 3 combined with TypeScript for building reactive, maintainable frontend applications.

### Context

**Code2Work** is a young startup founded by former ETNA students passionate about technology and innovation. The mission is to help alternation students better organize their projects, missions, and learning. The To-Do Manager is the company's first web application, designed to centralize daily tasks, track progress, and encourage productivity among users.

## Technologies Used

### Core Framework
- **Vue 3** (^3.5.31) - Progressive JavaScript framework for building user interfaces with reactive data binding
- **TypeScript** (~6.0.0) - Typed superset of JavaScript providing compile-time type safety and better IDE support

### Build Tool
- **Vite** (^8.0.3) - Next-generation frontend build tool offering lightning-fast Hot Module Replacement (HMR) and optimized production builds

### Development Tools
- **ESLint** (^10.1.0) - Code quality and consistency linting
- **Prettier** (3.8.1) - Automatic code formatter for consistent code style
- **Oxlint** (~1.57.0) - High-performance JavaScript linter

### Build and Development Dependencies
- **@vitejs/plugin-vue** (^6.0.5) - Vue 3 integration for Vite
- **vue-tsc** (^3.2.6) - TypeScript type checker for Vue components
- **@vue/tsconfig** (^0.9.1) - Recommended TypeScript configuration for Vue projects
- **npm-run-all2** (^8.0.4) - Run multiple npm scripts in parallel or sequential order

### Runtime Requirements
- **Node.js** ^20.19.0 or >=22.12.0
- Modern web browser with ES6+ support (Chrome, Firefox, Safari, Edge)

## Project Initialization

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** version 20.19.0 or higher (download from [nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js)

### Installation Steps

1. **Navigate to the project directory:**
   ```
   cd IDV-VUJS/day05/to-do-manager
   ```

2. **Install project dependencies:**
   ```
   npm install
   ```

This command installs all required packages listed in `package.json`, including Vue 3, TypeScript, Vite, and all development tools.

## Launching the Project

### Development Server

Start the development server with hot module replacement:

```
npm run dev
```

The application will be available at `http://localhost:5173/` (or another available port if 5173 is in use). The page automatically refreshes when you make changes to your code, allowing for rapid development.

### Production Build

Compile and optimize the application for production deployment:

```
npm run build
```

This generates an optimized production build in the `dist/` directory, ready for deployment to a web server.

### Preview Production Build

Preview your production build locally:

```
npm run preview
```

### Code Quality Tools

**Run type checking:**
```
npm run type-check
```

**Run linting (ESLint and Oxlint):**
```
npm run lint
```

**Format code with Prettier:**
```
npm run format
```

## Project Structure

```
to-do-manager/
├── src/
│   ├── components/              # Reusable Vue components
│   │   ├── Header.vue          # Application header
│   │   ├── Footer.vue          # Application footer
│   │   ├── TaskForm.vue        # Task creation form
│   │   ├── TaskList.vue        # Task list display
│   │   └── TaskItem.vue        # Individual task component
│   ├── types/
│   │   └── Task.ts             # TypeScript interfaces and enums
│   ├── App.vue                 # Root component
│   ├── main.ts                 # Application entry point
│   └── style.css               # Global styles
├── public/
│   └── favicon.ico             # Application favicon
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── eslint.config.ts            # ESLint configuration
└── README.md                   # This file
```

## Key Features

### Task Management
- **Create Tasks** - Users can add new tasks through an intuitive form with validation
- **View Tasks** - Display all tasks with title and status in an organized list
- **Update Status** - Change task status between To Do, In Progress, and Done states
- **Delete Tasks** - Remove tasks from the list with a delete action

### Data Persistence
- **Local Storage** - All tasks are automatically saved to browser localStorage
- **Automatic Recovery** - Tasks are restored from localStorage on page reload
- **Persistent State** - Data survives browser refresh and session restarts

### Type Safety
- **TypeScript Interfaces** - Strong typing with `Task` interface and `Status` enum
- **Compile-time Validation** - Catch type errors before runtime
- **Better Developer Experience** - IDE autocomplete and type hints

### User Interface
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Clear Navigation** - Header and footer for orientation
- **Form Validation** - User input validation with error messages
- **Intuitive Controls** - Clear buttons and interactions for task management

## Data Structure

### Task Interface

```typescript
interface Task {
  id: string | number;        // Unique identifier (auto-generated)
  title: string;              // Task title (required)
  status: Status;             // Task status (default: "to do")
}
```

### Status Enum

```typescript
enum Status {
  TODO = "to do",
  IN_PROGRESS = "in progress",
  DONE = "done"
}
```

### Validation Rules

- **Task Title** - Must be a non-empty string
- **Task Status** - Must be one of the three enum values
- **Task ID** - Automatically generated and unique
- **User Input** - Validated before submission; error messages shown on invalid input

## Component Overview

### Header Component
Displays the application title and provides navigation context.

### TaskForm Component
Provides a form for users to create new tasks. Includes:
- Input field for task title
- Form validation
- Error message display
- Submit button

### TaskList Component
Displays all tasks with their current status. Manages task display and organization.

### TaskItem Component
Individual task component showing:
- Task title
- Current status
- Status change button
- Delete button

### Footer Component
Displays application footer with company/project information.

## localStorage Implementation

Tasks are stored in the browser's localStorage under the key `tasks`. The application:
1. Saves tasks to localStorage whenever the task list changes
2. Loads tasks from localStorage when the application starts
3. Maintains data persistence across browser sessions
4. Handles localStorage errors gracefully

## IDE and Browser Setup

### Recommended IDE Configuration
- **VS Code** with [Vue (Official) extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Disable Vetur extension if installed (conflicts with Vue official)
- Install ESLint and Prettier extensions for better development experience

### Browser DevTools
- **Chrome/Edge/Brave**: [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

Enable Custom Object Formatter in DevTools settings for enhanced debugging.

## Code Explanation

### Reactive State Management
The application uses Vue 3's Composition API with `ref` and `reactive` for state management:

```typescript
const tasks = ref<Task[]>([]);
const newTaskTitle = ref<string>("");
const errorMessage = ref<string>("");
```

### localStorage Integration
Tasks are persisted using browser's localStorage API:

```typescript
// Save tasks
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

// Load tasks
const loadTasks = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks.value = JSON.parse(saved);
  }
};
```

### Task Management Methods
- `createTask()` - Validates input and adds new task
- `deleteTask(id)` - Removes task by ID
- `updateTaskStatus(id, status)` - Changes task status
- `validateInput()` - Ensures task title is not empty

### Computed Properties
Used for dynamic filtering and status-based task grouping.

## Functional Requirements Met

✅ Interface allows creating a task using a form
✅ Interface allows deleting a task
✅ Interface displays the task list (title and status)
✅ Ability to change task status (to do, in progress, done)
✅ Application contains a header
✅ Application contains a footer
✅ Full TypeScript typing with Task interface and Status enum
✅ Local storage persistence
✅ Input validation with error messages
✅ Responsive and intuitive interface
✅ Modular component structure

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future development:
- Task due dates and reminders
- Task categories or tags
- Task priorities
- Dark mode theme
- Drag-and-drop task reordering
- Task statistics and productivity metrics
- Cloud synchronization
- Multi-user support
- Task notes and descriptions
- Recurring tasks

## License

This project is part of the ETNA curriculum and Code2Work startup initiative.

## Author

**aguado_m**

---

**Project Created:** 2024
**Last Updated:** 2024

For more information about Code2Work and the mission to help alternation students succeed, visit the company's official channels.