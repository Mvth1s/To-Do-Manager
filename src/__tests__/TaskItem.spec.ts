import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/types/Task'
import { Status } from '@/types/Task'

describe('TaskItem Component', () => {
  const createTask = (overrides?: Partial<Task>): Task => ({
    id: 1,
    title: 'Test Task',
    status: Status.TODO,
    ...overrides,
  })

  describe('Rendering', () => {
    it('should render task title', () => {
      const task = createTask({ title: 'My Task' })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('h3').text()).toBe('My Task')
    })

    it('should render task status', () => {
      const task = createTask({ status: Status.IN_PROGRESS })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const statusSpan = wrapper.find('.task-status')
      expect(statusSpan.text()).toContain(Status.IN_PROGRESS)
    })

    it('should render task description when present', () => {
      const task = createTask({ description: 'Task description' })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.task-description').text()).toContain('Task description')
    })

    it('should not render description when not present', () => {
      const task = createTask()
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.task-description').exists()).toBe(false)
    })
  })

  describe('Task Status Display', () => {
    it('should have correct CSS class for TODO status', () => {
      const task = createTask({ status: Status.TODO })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const classes = wrapper.find('.task-item').classes()
      expect(classes).toContain('task-to')
      expect(classes).toContain('do')
    })

    it('should have correct CSS class for IN_PROGRESS status', () => {
      const task = createTask({ status: Status.IN_PROGRESS })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const classes = wrapper.find('.task-item').classes()
      expect(classes).toContain('task-in')
      expect(classes).toContain('progress')
    })

    it('should have correct CSS class for DONE status', () => {
      const task = createTask({ status: Status.DONE })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.task-item').classes()).toContain('task-done')
    })
  })

  describe('Subtasks Display', () => {
    it('should render subtasks section when subtasks exist', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: false },
          { title: 'Sub 2', completed: true },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.subtasks-section').exists()).toBe(true)
    })

    it('should not render subtasks section when no subtasks', () => {
      const task = createTask()
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.subtasks-section').exists()).toBe(false)
    })

    it('should render all subtasks', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: false },
          { title: 'Sub 2', completed: false },
          { title: 'Sub 3', completed: true },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const subtaskRows = wrapper.findAll('.subtask-row')
      expect(subtaskRows).toHaveLength(3)
    })

    it('should display subtask title correctly', () => {
      const task = createTask({
        subtasks: [{ title: 'My Subtask', completed: false }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.text()).toContain('My Subtask')
    })
  })

  describe('Completion Percentage', () => {
    it('should calculate 0% when no subtasks are completed', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: false },
          { title: 'Sub 2', completed: false },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.subtasks-header').text()).toContain('0%')
    })

    it('should calculate 50% when half subtasks are completed', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: true },
          { title: 'Sub 2', completed: false },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.subtasks-header').text()).toContain('50%')
    })

    it('should calculate 100% when all subtasks are completed', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: true },
          { title: 'Sub 2', completed: true },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.subtasks-header').text()).toContain('100%')
    })

    it('should update percentage when subtask is toggled', async () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: false },
          { title: 'Sub 2', completed: false },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.subtasks-header').text()).toContain('0%')

      const updatedTask = createTask({
        subtasks: [
          { title: 'Sub 1', completed: true },
          { title: 'Sub 2', completed: false },
        ],
      })
      await wrapper.setProps({ task: updatedTask })

      expect(wrapper.find('.subtasks-header').text()).toContain('50%')
    })
  })

  describe('Status Change Buttons', () => {
    it('should emit updateStatus event when clicking status button', async () => {
      const task = createTask({ status: Status.TODO })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const button = wrapper.findAll('.btn-small').find((b) => b.text() === 'En cours')
      await button!.trigger('click')

      expect(wrapper.emitted('updateStatus')).toBeTruthy()
      expect(wrapper.emitted('updateStatus')[0]).toEqual([Status.IN_PROGRESS])
    })

    it('should not show button for current status', () => {
      const task = createTask({ status: Status.TODO })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const buttons = wrapper.findAll('.btn-small')
      const todoButton = buttons.find((b) => b.text() === 'A faire')

      expect(todoButton).toBeUndefined()
    })

    it('should show all status buttons except current one', () => {
      const task = createTask({ status: Status.IN_PROGRESS })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const buttons = wrapper.findAll('.btn-small')
      const buttonTexts = buttons.map((b) => b.text())

      expect(buttonTexts).toContain('A faire')
      expect(buttonTexts).toContain('Terminé')
      expect(buttonTexts).not.toContain('En cours')
    })
  })

  describe('Subtask Interactions', () => {
    it('should emit toggleSubtask when clicking checkbox', async () => {
      const task = createTask({
        subtasks: [{ title: 'Sub 1', completed: false }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const checkbox = wrapper.find('.subtask-checkbox')
      await checkbox.trigger('change')

      expect(wrapper.emitted('toggleSubtask')).toBeTruthy()
      expect(wrapper.emitted('toggleSubtask')[0]).toEqual([0])
    })

    it('should emit deleteSubtask when clicking delete button', async () => {
      const task = createTask({
        subtasks: [{ title: 'Sub 1', completed: false }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const deleteBtn = wrapper.find('.subtask-actions .btn-danger')
      await deleteBtn.trigger('click')

      expect(wrapper.emitted('deleteSubtask')).toBeTruthy()
      expect(wrapper.emitted('deleteSubtask')[0]).toEqual([0])
    })

    it('should show edit and delete buttons for each subtask', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: false },
          { title: 'Sub 2', completed: false },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const actionGroups = wrapper.findAll('.subtask-actions')
      expect(actionGroups).toHaveLength(2)
    })
  })

  describe('Edit and Delete Buttons', () => {
    it('should emit editTask when clicking modify button', async () => {
      const task = createTask()
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const editBtn = wrapper.findAll('.btn-small').find((b) => b.text() === 'Modifier')
      await editBtn!.trigger('click')

      expect(wrapper.emitted('editTask')).toBeTruthy()
      expect(wrapper.emitted('editTask')[0][0]).toEqual(task)
    })

    it('should emit deleteTask when clicking delete button', async () => {
      const task = createTask()
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const deleteBtn = wrapper.findAll('.btn-small').find((b) => b.text() === 'Supprimer')
      await deleteBtn!.trigger('click')

      expect(wrapper.emitted('deleteTask')).toBeTruthy()
    })
  })

  describe('Completed Subtask Styling', () => {
    it('should apply completed class to completed subtask', () => {
      const task = createTask({
        subtasks: [{ title: 'Sub 1', completed: true }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const subtaskRow = wrapper.find('.subtask-row')
      expect(subtaskRow.classes()).toContain('completed')
    })

    it('should not apply completed class to incomplete subtask', () => {
      const task = createTask({
        subtasks: [{ title: 'Sub 1', completed: false }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const subtaskRow = wrapper.find('.subtask-row')
      expect(subtaskRow.classes()).not.toContain('completed')
    })
  })

  describe('Accessibility', () => {
    it('should have aria-label on task item', () => {
      const task = createTask({ title: 'My Task' })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.task-item').attributes('aria-label')).toBeTruthy()
    })

    it('should have role="article" on task item', () => {
      const task = createTask()
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      expect(wrapper.find('.task-item').attributes('role')).toBe('article')
    })

    it('should have role="progressbar" on progress bar', () => {
      const task = createTask({
        subtasks: [{ title: 'Sub 1', completed: false }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const progressBar = wrapper.find('.progress-bar')
      expect(progressBar.attributes('role')).toBe('progressbar')
    })

    it('should have aria-valuenow on progress bar', () => {
      const task = createTask({
        subtasks: [
          { title: 'Sub 1', completed: true },
          { title: 'Sub 2', completed: false },
        ],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const progressBar = wrapper.find('.progress-bar')
      expect(progressBar.attributes('aria-valuenow')).toBe('50')
    })

    it('should have aria-label on action buttons', () => {
      const task = createTask()
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const buttons = wrapper.findAll('button')
      buttons.forEach((btn) => {
        expect(btn.attributes('aria-label')).toBeTruthy()
      })
    })

    it('should have role="list" on subtasks list', () => {
      const task = createTask({
        subtasks: [{ title: 'Sub 1', completed: false }],
      })
      const wrapper = mount(TaskItem, {
        props: { task },
      })

      const list = wrapper.find('.subtasks-list')
      expect(list.attributes('role')).toBe('list')
    })
  })
})
