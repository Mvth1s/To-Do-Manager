# To-Do Manager Application

A comprehensive task management web application designed for Code2Work, a startup dedicated to helping alternation students stay organized and productive. This To-Do Manager helps users centralize daily tasks, track progress, manage subtasks, and accomplish their projects efficiently.

## Project Description

**To-Do Manager** is a Vue 3 + TypeScript single-page application that enables users to:
- Create and manage daily tasks with a clear, intuitive interface
- Organize tasks across three status categories: To Do, In Progress, and Done
- Add optional descriptions and details to tasks
- Create and track subtasks with completion percentage
- Modify task status with a single click
- Edit task titles, descriptions, and subtasks
- Filter tasks by status (All, To Do, In Progress, Done)
- Delete completed or unwanted tasks
- Persist all task data locally using browser localStorage
- Experience a responsive, type-safe, and accessible application built with modern web technologies

This project serves as a functional prototype demonstrating the power of Vue.js 3 combined with TypeScript for building reactive, maintainable, and accessible frontend applications.

### Context

**Code2Work** is a young startup founded by former ETNA students passionate about technology and innovation. The mission is to help alternation students better organize their projects, missions, and learning. The To-Do Manager is the company's first web application, designed to centralize daily tasks, track progress, and encourage productivity among users.

## Technologies Used

### Core Framework
- **Vue 3** (^3.5.31) - Progressive JavaScript framework for building user interfaces with reactive data binding
- **TypeScript** (~6.0.0) - Typed superset of JavaScript providing compile-time type safety and better IDE support

### Build Tool
- **Vite** (^8.0.3) - Next-generation frontend build tool offering lightning-fast Hot Module Replacement (HMR) and optimized production builds

### Testing Framework
- **Vitest** (^4.1.2) - Unit testing framework powered by Vite
- **@vue/test-utils** (^2.4.6) - Official Vue testing library
- **happy-dom** (^20.8.9) - Lightweight DOM implementation for testing

### Development Tools
- **ESLint** (^10.1.0) - Code quality and consistency linting
- **Prettier** (3.8.1) - Automatic code formatter for consistent code style
- **Oxlint** (~1.57.0) - High-performance JavaScript linter
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

### Testing

**Run unit tests:**
```
npm run test
```

**Run tests with interactive UI:**
```
npm run test:ui
```

**Run tests with coverage report:**
```
npm run test:coverage
```

## Project Structure

```
to-do-manager/
├── src/
│   ├── components/              # Reusable Vue components
│   │   ├── AppHeader.vue        # Application header with branding
│   │   ├── AppFooter.vue        # Application footer with information
│   │   ├── TaskForm.vue         # Task creation/edit modal form
│   │   ├── TaskList.vue         # Task list container
│   │   └── TaskItem.vue         # Individual task component with actions
│   ├── types/
│   │   └── Task.ts              # TypeScript interfaces and enums
│   ├── __tests__/               # Unit tests
│   │   ├── taskLogic.spec.ts    # Business logic tests
│   │   ├── TaskForm.spec.ts     # TaskForm component tests
│   │   └── TaskItem.spec.ts     # TaskItem component tests
│   ├── App.vue                  # Root component with main logic
│   ├── main.ts                  # Application entry point
│   └── style.css                # Global styles
├── public/
│   ├── favicon.ico              # Application favicon
│   ├── todomanager.webp         # Application logo (webp format)
│   └── todomanager.png          # Application logo (png format)
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Locked dependency versions
├── tsconfig.json                # Root TypeScript configuration
├── tsconfig.app.json            # Application TypeScript configuration
├── tsconfig.node.json           # Build tool TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── vitest.config.ts             # Vitest configuration
├── eslint.config.ts             # ESLint configuration
├── .prettierrc.json             # Prettier formatting configuration
├── .gitignore                   # Git ignore rules
├── README.md                    # This file
├── ROADMAP.md                   # Project development guide
└── TESTS.md                     # Testing documentation
```

## Key Features

### Core Task Management
- ✅ **Create Tasks** - Users can add new tasks through an intuitive modal form with validation
- ✅ **View Tasks** - Display all tasks with title, status, and details in an organized list
- ✅ **Update Status** - Change task status between To Do, In Progress, and Done states with single click
- ✅ **Edit Tasks** - Modify task titles, descriptions, and subtasks using the modal form
- ✅ **Delete Tasks** - Remove tasks from the list with a delete action
- ✅ **Filter Tasks** - Filter displayed tasks by status (All, To Do, In Progress, Done)

### Enhanced Features (Bonus)
- ✅ **Task Descriptions** - Add optional detailed descriptions to tasks
- ✅ **Subtasks** - Create multiple subtasks within a task with:
  - Checkbox completion tracking
  - Edit subtask titles inline
  - Delete subtasks
  - Completion percentage calculation
- ✅ **Progress Visualization** - Visual progress bar showing subtask completion percentage

### Data Persistence
- ✅ **Local Storage** - All tasks are automatically saved to browser localStorage
- ✅ **Automatic Recovery** - Tasks are restored from localStorage on page reload
- ✅ **Persistent State** - Data survives browser refresh and session restarts
- ✅ **Error Handling** - Graceful handling of localStorage errors

### Type Safety & Validation
- ✅ **TypeScript Interfaces** - Strong typing with `Task` interface and `Status` enum
- ✅ **Input Validation** - User input validation before submission
- ✅ **Error Messages** - Clear, visible error messages for invalid input
- ✅ **Compile-time Safety** - Catch type errors before runtime
- ✅ **Better DX** - IDE autocomplete and type hints throughout

### Accessibility & User Experience
- ✅ **ARIA Attributes** - Comprehensive ARIA labels, roles, and live regions
- ✅ **Keyboard Navigation** - Full keyboard support with Escape to close modal
- ✅ **Screen Reader Support** - Descriptive labels for all interactive elements
- ✅ **Semantic HTML** - Proper use of semantic elements (header, footer, main)
- ✅ **Responsive Design** - Seamless experience on desktop and mobile devices
- ✅ **Focus Management** - Clear visual focus indicators

### Code Quality
- ✅ **ESLint** - Code quality and consistency checking
- ✅ **Prettier** - Automatic code formatting
- ✅ **TypeScript** - Strict type checking with noUncheckedIndexedAccess
- ✅ **Unit Tests** - 87+ passing tests with Vitest and @vue/test-utils

## Data Structure

### Task Interface

```typescript
interface Task {
  id: string | number;              // Unique identifier (auto-generated)
  title: string;                     // Task title (required)
  status: Status;                    // Task status (default: "to do")
  description?: string;              // Optional task description
  subtasks?: Subtask[];              // Optional array of subtasks
}
```

### Subtask Interface

```typescript
interface Subtask {
  title: string;                     // Subtask title (required)
  completed: boolean;                // Completion status
  weight?: number;                   // Optional weight for calculation
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

- **Task Title** - Must be a non-empty string (required)
- **Task Status** - Must be one of the three enum values
- **Task ID** - Automatically generated and unique (incremental number)
- **Task Description** - Optional string field
- **Subtasks** - Optional array of subtasks with title and completion status
- **User Input** - Validated before submission; error messages shown on invalid input

## Component Overview

### AppHeader Component
- Displays the application title with branding
- Features gradient background and professional styling
- Provides visual context and navigation

### AppFooter Component
- Displays copyright and company information
- Positioned at the bottom of the page
- Semantic footer element for better accessibility

### TaskForm Component
- Used in a modal for creating and editing tasks
- Features:
  - Input field for task title (required)
  - Textarea for optional task description
  - Subtask management (add, view, toggle, delete)
  - Form validation with error display
  - Conditional button text (Create vs Update)
  - Full ARIA accessibility attributes

### TaskList Component
- Container for displaying all filtered tasks
- Shows empty state message when no tasks exist
- Emits events for task operations (create, edit, delete, status change, subtask operations)
- Semantic `<section>` with `role="region"`

### TaskItem Component
- Individual task display card
- Features:
  - Task title and status badge
  - Optional description display
  - Subtask section with completion percentage
  - Inline subtask editing
  - Status change buttons
  - Edit and delete buttons
  - Responsive layout

### App (Root) Component
- Main application logic and state management
- Handles:
  - Task CRUD operations
  - Modal form state (create vs edit mode)
  - Task filtering by status
  - localStorage persistence
  - Keyboard event handling (Escape to close modal)
  - Subtask operations (toggle, update, delete)

## localStorage Implementation

Tasks are stored in the browser's localStorage under the key `tasks`. The application:

1. **Saves tasks** to localStorage whenever the task list changes
2. **Loads tasks** from localStorage when the application starts
3. **Maintains persistence** across browser sessions and page refreshes
4. **Handles errors** gracefully if localStorage is unavailable
5. **Updates nextId** based on existing tasks to ensure unique IDs

Example localStorage structure:
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "status": "in progress",
      "description": "Write comprehensive documentation for the API",
      "subtasks": [
        { "title": "API overview", "completed": true },
        { "title": "Endpoint reference", "completed": false }
      ]
    }
  ]
}
```

## Testing

The project includes comprehensive unit tests using Vitest and @vue/test-utils.

### Test Files
- **taskLogic.spec.ts** - Tests for task creation, validation, status updates, and subtask operations
- **TaskForm.spec.ts** - Component tests for the form including creation, editing, and validation
- **TaskItem.spec.ts** - Component tests for task display and user interactions

### Running Tests
```bash
# Run all tests once
npm run test

# Run tests with interactive UI (useful for development)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- Task creation and validation logic
- Component rendering and prop handling
- Event emission and parent-child communication
- localStorage integration
- Form validation and error display
- Subtask operations (add, delete, toggle, edit)

See `TESTS.md` for detailed testing documentation.

## IDE and Browser Setup

### Recommended IDE Configuration
- **VS Code** with [Vue (Official) extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - Provides Vue 3 syntax highlighting and IntelliSense
  - Official Vue team extension with best support
- Disable Vetur extension if installed (conflicts with Vue official)
- Install ESLint extension for real-time linting feedback
- Install Prettier extension for code formatting on save

### Browser DevTools
- **Chrome/Edge/Brave**: [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

Enable Custom Object Formatter in DevTools settings for enhanced debugging of Vue reactive objects.

## Code Explanation

### Reactive State Management

The application uses Vue 3's Composition API with `ref` for state management:

```typescript
const tasks = ref<Task[]>([]);           // All tasks
const showFormModal = ref<boolean>(false); // Modal visibility
const editingTask = ref<Task | null>(null); // Current task being edited
const selectedFilter = ref<Status | 'all'>('all'); // Active filter
const errorMessage = ref<string>('');    // Form validation error
const nextId = ref<number>(1);           // Next available ID
```

### localStorage Integration

Tasks are persisted using browser's localStorage API:

```typescript
const STORAGE_KEY = 'tasks';

// Save tasks to localStorage
const saveTasks = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
};

// Load tasks from localStorage
const loadTasks = (): void => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      tasks.value = JSON.parse(saved);
      // Update nextId based on highest existing ID
      if (tasks.value.length > 0) {
        const maxId = Math.max(...tasks.value.map(t => typeof t.id === 'number' ? t.id : 0));
        nextId.value = maxId + 1;
      }
    } catch (e) {
      console.error('Error loading tasks:', e);
    }
  }
};
```

### Task Management Methods

- `createTask(taskData)` - Validates input and either creates new task or updates existing task
- `deleteTask(id)` - Removes task by ID and saves to localStorage
- `updateTaskStatus(id, newStatus)` - Changes task status and persists change
- `validateInput(title)` - Ensures task title is not empty, sets error message
- `startEditTask(task)` - Opens modal in edit mode with task data
- `closeModal()` - Closes modal and clears edit state
- `openCreateModal()` - Opens modal in create mode with empty form

### Subtask Operations

- `toggleSubtask(taskId, subtaskIndex)` - Toggle subtask completion status
- `updateSubtask(taskId, subtaskIndex, newTitle)` - Update subtask title
- `deleteSubtask(taskId, subtaskIndex)` - Remove subtask from task
- Completion percentage is calculated as: `(completed count / total count) * 100`

### Computed Properties

```typescript
// Filter tasks based on selected status
const filteredTasks = computed(() => {
  if (selectedFilter.value === 'all') {
    return tasks.value;
  }
  return tasks.value.filter(task => task.status === selectedFilter.value);
});

// Calculate subtask completion percentage
const completionPercent = computed(() => {
  if (!task.subtasks || task.subtasks.length === 0) return 0;
  const completed = task.subtasks.filter(s => s.completed).length;
  return Math.round((completed / task.subtasks.length) * 100);
});
```

### Modal Form Handling

The application uses a single modal form component for both creating and editing:

- When `editingTask.value` is null, form creates a new task
- When `editingTask.value` has a task, form updates that task
- Watchers in TaskForm sync form fields with the task being edited
- Form clears after successful submission

## Accessibility Features

The application implements comprehensive accessibility features:

### ARIA Attributes
- `aria-label` - Descriptive labels for all buttons and interactive elements
- `role="dialog"` and `aria-modal="true"` - Modal dialog semantic
- `role="group"` - Grouping related controls (filters, status buttons)
- `role="alert"` and `aria-live="polite"` - Error messages
- `role="progressbar"` - Subtask progress visualization
- `aria-pressed` - Toggle button states
- `aria-checked` - Checkbox states for subtasks
- `aria-describedby` - Linking inputs to error messages

### Keyboard Navigation
- Full keyboard support with Tab key navigation
- Escape key closes modal
- Enter key submits form

### Screen Reader Support
- All interactive elements have descriptive labels
- Form fields have associated labels
- Error messages are announced to screen readers
- Empty state message is provided when no tasks exist

### Visual Accessibility
- High contrast color scheme
- Clear visual focus indicators
- Responsive text sizing
- Color is not the only means of conveying information (status badges have text labels)

## Functional Requirements Met

✅ Interface allows creating a task using a form  
✅ Interface allows deleting a task  
✅ Interface displays the task list (title and status)  
✅ Ability to change task status (to do, in progress, done)  
✅ Application contains a header  
✅ Application contains a footer  
✅ Full TypeScript typing with Task interface and Status enum  
✅ Automatic ID generation  
✅ Local storage persistence  
✅ Input validation with error messages  
✅ Responsive and intuitive interface  
✅ Modular component structure  
✅ Proper .gitignore configuration  
✅ ESLint and Prettier configured  
✅ Favicon present  

## Bonus Features Implemented

✅ **Task Editing** - Edit task titles, descriptions, and subtasks  
✅ **Status Filtering** - Filter tasks by status with 4 filter options  
✅ **Task Descriptions** - Optional detailed descriptions for tasks  
✅ **Subtasks** - Create and manage subtasks with completion tracking  
✅ **Progress Percentage** - Visual progress bar for subtask completion  
✅ **Accessibility (ARIA)** - Comprehensive ARIA attributes and semantic HTML  
✅ **Responsive Design** - Works seamlessly on desktop and mobile  
✅ **Animations** - CSS animations for modal appearance and transitions  
✅ **Unit Tests** - 87+ tests using Vitest and @vue/test-utils  
✅ **Code Quality** - ESLint, Prettier, and TypeScript strict mode  

## Browser Compatibility

- Chrome/Chromium 90+ (latest)
- Firefox 88+ (latest)
- Safari 14+ (latest)
- Edge 90+ (latest)

## Future Enhancements

Potential features for future development:
- Task due dates and reminders
- Task categories or tags
- Task priorities (High, Medium, Low)
- Dark mode theme
- Drag-and-drop task reordering
- Task statistics and productivity metrics
- Cloud synchronization
- Multi-user support with authentication
- Recurring tasks
- Task search functionality
- Export tasks to various formats (JSON, CSV, PDF)
- Task templates for quick creation

## Development Guidelines

### Code Structure
- Keep components focused on a single responsibility
- Use TypeScript interfaces for all data structures
- Validate user input before processing
- Handle errors gracefully
- Add ARIA attributes to interactive elements

### Testing Strategy
- Write tests for business logic
- Test component rendering and props
- Test event emission and parent-child communication
- Aim for high code coverage
- Test error cases and edge conditions

### Accessibility Best Practices
- Always add aria-labels to icon buttons
- Link form inputs to labels
- Use semantic HTML (header, footer, main, section)
- Ensure keyboard navigation works
- Maintain sufficient color contrast

## License

This project is part of the ETNA curriculum and Code2Work startup initiative.

## Author

**aguado_m**

---

**Project Created:** 2024  
**Last Updated:** 2024  
**Status:** ✅ Complete and Functional

For more information about Code2Work and the mission to help alternation students succeed, visit the company's official channels.

---

**Note:** This To-Do Manager serves as a comprehensive example of Vue 3 + TypeScript best practices, including reactive state management, component composition, form handling, localStorage integration, accessibility compliance, and unit testing.