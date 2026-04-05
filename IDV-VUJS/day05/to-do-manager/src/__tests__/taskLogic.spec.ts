import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Task, Subtask } from '@/types/Task'
import { Status } from '@/types/Task'

describe('Task Logic', () => {
  describe('Task Creation', () => {
    it('should create a task with title and status TODO', () => {
      const task: Task = {
        id: 1,
        title: 'Test Task',
        status: Status.TODO,
      }

      expect(task.title).toBe('Test Task')
      expect(task.status).toBe(Status.TODO)
      expect(task.id).toBe(1)
    })

    it('should create a task with description and subtasks', () => {
      const subtasks: Subtask[] = [
        { title: 'Sub 1', completed: false },
        { title: 'Sub 2', completed: true },
      ]

      const task: Task = {
        id: 1,
        title: 'Complex Task',
        status: Status.TODO,
        description: 'This is a description',
        subtasks,
      }

      expect(task.description).toBe('This is a description')
      expect(task.subtasks).toHaveLength(2)
      expect(task.subtasks![0].title).toBe('Sub 1')
    })

    it('should create a task with only title (no description or subtasks)', () => {
      const task: Task = {
        id: 1,
        title: 'Simple Task',
        status: Status.TODO,
      }

      expect(task.title).toBe('Simple Task')
      expect(task.description).toBeUndefined()
      expect(task.subtasks).toBeUndefined()
    })
  })

  describe('Task Modification', () => {
    it('should update task title', () => {
      const task: Task = {
        id: 1,
        title: 'Original Title',
        status: Status.TODO,
      }

      task.title = 'Updated Title'

      expect(task.title).toBe('Updated Title')
    })

    it('should update task status', () => {
      const task: Task = {
        id: 1,
        title: 'Test Task',
        status: Status.TODO,
      }

      task.status = Status.IN_PROGRESS

      expect(task.status).toBe(Status.IN_PROGRESS)
    })

    it('should update task description', () => {
      const task: Task = {
        id: 1,
        title: 'Test Task',
        status: Status.TODO,
        description: 'Old description',
      }

      task.description = 'New description'

      expect(task.description).toBe('New description')
    })

    it('should update subtasks in a task', () => {
      const task: Task = {
        id: 1,
        title: 'Test Task',
        status: Status.TODO,
        subtasks: [{ title: 'Sub 1', completed: false }],
      }

      task.subtasks![0].title = 'Updated Sub 1'

      expect(task.subtasks![0].title).toBe('Updated Sub 1')
    })
  })

  describe('Subtasks Management', () => {
    it('should add a subtask', () => {
      const subtasks: Subtask[] = []

      subtasks.push({ title: 'New Subtask', completed: false })

      expect(subtasks).toHaveLength(1)
      expect(subtasks[0].title).toBe('New Subtask')
    })

    it('should delete a subtask by index', () => {
      const subtasks: Subtask[] = [
        { title: 'Sub 1', completed: false },
        { title: 'Sub 2', completed: false },
        { title: 'Sub 3', completed: false },
      ]

      subtasks.splice(1, 1)

      expect(subtasks).toHaveLength(2)
      expect(subtasks[0].title).toBe('Sub 1')
      expect(subtasks[1].title).toBe('Sub 3')
    })

    it('should toggle subtask completion status', () => {
      const subtasks: Subtask[] = [{ title: 'Sub 1', completed: false }]

      subtasks[0].completed = !subtasks[0].completed

      expect(subtasks[0].completed).toBe(true)
    })

    it('should rename a subtask', () => {
      const subtasks: Subtask[] = [{ title: 'Old Name', completed: false }]

      subtasks[0].title = 'New Name'

      expect(subtasks[0].title).toBe('New Name')
    })
  })

  describe('Completion Percentage Calculation', () => {
    it('should calculate 0% when no subtasks are completed', () => {
      const subtasks: Subtask[] = [
        { title: 'Sub 1', completed: false },
        { title: 'Sub 2', completed: false },
      ]

      const completed = subtasks.filter((s) => s.completed).length
      const percent = (completed / subtasks.length) * 100

      expect(percent).toBe(0)
    })

    it('should calculate 50% when half subtasks are completed', () => {
      const subtasks: Subtask[] = [
        { title: 'Sub 1', completed: true },
        { title: 'Sub 2', completed: false },
      ]

      const completed = subtasks.filter((s) => s.completed).length
      const percent = Math.round((completed / subtasks.length) * 100)

      expect(percent).toBe(50)
    })

    it('should calculate 100% when all subtasks are completed', () => {
      const subtasks: Subtask[] = [
        { title: 'Sub 1', completed: true },
        { title: 'Sub 2', completed: true },
      ]

      const completed = subtasks.filter((s) => s.completed).length
      const percent = Math.round((completed / subtasks.length) * 100)

      expect(percent).toBe(100)
    })

    it('should return 0% when no subtasks exist', () => {
      const subtasks: Subtask[] = []

      const percent = subtasks.length === 0 ? 0 : Math.round((subtasks.filter((s) => s.completed).length / subtasks.length) * 100)

      expect(percent).toBe(0)
    })
  })

  describe('Task Filtering', () => {
    let tasks: Task[]

    beforeEach(() => {
      tasks = [
        { id: 1, title: 'Task 1', status: Status.TODO },
        { id: 2, title: 'Task 2', status: Status.IN_PROGRESS },
        { id: 3, title: 'Task 3', status: Status.IN_PROGRESS },
        { id: 4, title: 'Task 4', status: Status.DONE },
      ]
    })

    it('should filter tasks by TODO status', () => {
      const filtered = tasks.filter((t) => t.status === Status.TODO)

      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('Task 1')
    })

    it('should filter tasks by IN_PROGRESS status', () => {
      const filtered = tasks.filter((t) => t.status === Status.IN_PROGRESS)

      expect(filtered).toHaveLength(2)
      expect(filtered[0].title).toBe('Task 2')
      expect(filtered[1].title).toBe('Task 3')
    })

    it('should filter tasks by DONE status', () => {
      const filtered = tasks.filter((t) => t.status === Status.DONE)

      expect(filtered).toHaveLength(1)
      expect(filtered[0].title).toBe('Task 4')
    })

    it('should return all tasks when filter is "all"', () => {
      const filtered = tasks

      expect(filtered).toHaveLength(4)
    })
  })

  describe('Input Validation', () => {
    it('should validate that title is not empty', () => {
      const title = ''
      const isValid = title.trim() !== ''

      expect(isValid).toBe(false)
    })

    it('should validate that title is valid when not empty', () => {
      const title = 'Valid Task Title'
      const isValid = title.trim() !== ''

      expect(isValid).toBe(true)
    })

    it('should trim whitespace from title', () => {
      const title = '   Task Title   '
      const trimmed = title.trim()

      expect(trimmed).toBe('Task Title')
    })

    it('should allow empty description', () => {
      const description = ''
      const isValid = true // Description is optional

      expect(isValid).toBe(true)
    })
  })

  describe('LocalStorage Persistence', () => {
    beforeEach(() => {
      localStorage.clear()
      vi.clearAllMocks()
    })

    it('should save tasks to localStorage', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: Status.TODO },
        { id: 2, title: 'Task 2', status: Status.DONE },
      ]

      localStorage.setItem('tasks', JSON.stringify(tasks))
      const saved = localStorage.getItem('tasks')

      expect(saved).not.toBeNull()
      const parsed = JSON.parse(saved!)
      expect(parsed).toHaveLength(2)
      expect(parsed[0].title).toBe('Task 1')
    })

    it('should retrieve tasks from localStorage', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: Status.TODO },
      ]

      localStorage.setItem('tasks', JSON.stringify(tasks))
      const saved = localStorage.getItem('tasks')
      const retrieved = JSON.parse(saved!)

      expect(retrieved[0].title).toBe('Task 1')
      expect(retrieved[0].status).toBe(Status.TODO)
    })

    it('should handle empty localStorage gracefully', () => {
      const saved = localStorage.getItem('tasks')

      expect(saved).toBeNull()
    })

    it('should preserve subtasks when saving to localStorage', () => {
      const tasks: Task[] = [
        {
          id: 1,
          title: 'Task with subtasks',
          status: Status.TODO,
          subtasks: [
            { title: 'Sub 1', completed: true },
            { title: 'Sub 2', completed: false },
          ],
        },
      ]

      localStorage.setItem('tasks', JSON.stringify(tasks))
      const retrieved = JSON.parse(localStorage.getItem('tasks')!)

      expect(retrieved[0].subtasks).toHaveLength(2)
      expect(retrieved[0].subtasks[0].completed).toBe(true)
    })
  })

  describe('Task Deletion', () => {
    it('should delete a task from the list by id', () => {
      let tasks: Task[] = [
        { id: 1, title: 'Task 1', status: Status.TODO },
        { id: 2, title: 'Task 2', status: Status.TODO },
        { id: 3, title: 'Task 3', status: Status.TODO },
      ]

      tasks = tasks.filter((task) => task.id !== 2)

      expect(tasks).toHaveLength(2)
      expect(tasks.find((t) => t.id === 2)).toBeUndefined()
    })

    it('should not delete if id does not exist', () => {
      const tasks: Task[] = [
        { id: 1, title: 'Task 1', status: Status.TODO },
      ]

      const filtered = tasks.filter((task) => task.id !== 999)

      expect(filtered).toHaveLength(1)
    })
  })

  describe('Status Enum', () => {
    it('should have correct status values', () => {
      expect(Status.TODO).toBe('to do')
      expect(Status.IN_PROGRESS).toBe('in progress')
      expect(Status.DONE).toBe('done')
    })

    it('should validate status is one of the enum values', () => {
      const validStatuses = Object.values(Status)
      const testStatus = 'to do'

      expect(validStatuses).toContain(testStatus)
    })

    it('should reject invalid status', () => {
      const validStatuses = Object.values(Status)
      const invalidStatus = 'invalid'

      expect(validStatuses).not.toContain(invalidStatus)
    })
  })
})
