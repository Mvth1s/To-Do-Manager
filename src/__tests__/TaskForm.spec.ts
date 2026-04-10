import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '@/components/TaskForm.vue'

describe('TaskForm Component', () => {
  describe('Rendering', () => {
    it('should render the form with title for creation mode', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      expect(wrapper.find('h2').text()).toContain('Créer une nouvelle tâche')
    })

    it('should render the form with title for edit mode', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'Test Task',
            status: 'to do',
          },
        },
      })

      expect(wrapper.find('h2').text()).toContain('Modifier la tâche')
    })

    it('should render title input field', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const titleInput = wrapper.find('input[type="text"]')
      expect(titleInput.exists()).toBe(true)
    })

    it('should render description textarea', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.exists()).toBe(true)
    })

    it('should render submit button with correct text for creation', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const button = wrapper.find('button[type="submit"]')
      expect(button.text()).toContain('Ajouter une Tâche')
    })

    it('should render submit button with correct text for editing', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'Test',
            status: 'to do',
          },
        },
      })

      const button = wrapper.find('button[type="submit"]')
      expect(button.text()).toContain('Mettre à jour')
    })
  })

  describe('Title Input', () => {
    it('should populate title field when editing task', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'My Task',
            status: 'to do',
          },
        },
      })

      await wrapper.vm.$nextTick()
      const titleInput = wrapper.find('input[type="text"]')
      expect(titleInput.element.value).toBe('My Task')
    })

    it('should populate description field when editing task', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'My Task',
            status: 'to do',
            description: 'Task description',
          },
        },
      })

      await wrapper.vm.$nextTick()
      const textarea = wrapper.find('textarea')
      expect(textarea.element.value).toContain('Task description')
    })

    it('should clear title field when editingTask becomes null', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'My Task',
            status: 'to do',
          },
        },
      })

      await wrapper.setProps({
        editingTask: null,
      })

      await wrapper.vm.$nextTick()
      const titleInput = wrapper.find('input[type="text"]')
      expect(titleInput.element.value).toBe('')
    })
  })

  describe('Subtasks Management', () => {
    it('should add a subtask when clicking add button', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const newSubtaskInput = wrapper.find('#new-subtask')
      await newSubtaskInput.setValue('New Subtask')

      const addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      const subtaskItems = wrapper.findAll('.subtask-item')
      expect(subtaskItems).toHaveLength(1)
    })

    it('should add multiple subtasks', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const newSubtaskInput = wrapper.find('#new-subtask')

      await newSubtaskInput.setValue('Subtask 1')
      let addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      await newSubtaskInput.setValue('Subtask 2')
      addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      const subtaskItems = wrapper.findAll('.subtask-item')
      expect(subtaskItems).toHaveLength(2)
    })

    it('should remove a subtask when clicking delete button', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const newSubtaskInput = wrapper.find('#new-subtask')
      await newSubtaskInput.setValue('Subtask 1')
      const addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      let subtaskItems = wrapper.findAll('.subtask-item')
      expect(subtaskItems).toHaveLength(1)

      const deleteButton = wrapper.find('.btn-danger')
      await deleteButton.trigger('click')

      subtaskItems = wrapper.findAll('.subtask-item')
      expect(subtaskItems).toHaveLength(0)
    })

    it('should toggle subtask completion', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const newSubtaskInput = wrapper.find('#new-subtask')
      await newSubtaskInput.setValue('Subtask 1')
      const addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      const checkbox = wrapper.find('.checkbox')
      await checkbox.setValue(true)

      expect(checkbox.element.checked).toBe(true)
    })

    it('should populate subtasks when editing task', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'Task with subtasks',
            status: 'to do',
            subtasks: [
              { title: 'Sub 1', completed: false },
              { title: 'Sub 2', completed: true },
            ],
          },
        },
      })

      await wrapper.vm.$nextTick()
      const subtaskItems = wrapper.findAll('.subtask-item')
      expect(subtaskItems).toHaveLength(2)
    })

    it('should not add empty subtask', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const newSubtaskInput = wrapper.find('#new-subtask')
      await newSubtaskInput.setValue('   ')

      const addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      const subtaskItems = wrapper.findAll('.subtask-item')
      expect(subtaskItems).toHaveLength(0)
    })
  })

  describe('Form Submission', () => {
    it('should emit createTask event with task data', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const titleInput = wrapper.find('input[type="text"]')
      await titleInput.setValue('New Task')

      const form = wrapper.find('form')
      await form.trigger('submit')

      expect(wrapper.emitted('createTask')).toBeTruthy()
      expect(wrapper.emitted('createTask')[0]).toEqual([
        {
          title: 'New Task',
        },
      ])
    })

    it('should emit createTask with description', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const titleInput = wrapper.find('input[type="text"]')
      await titleInput.setValue('Task with description')

      const textarea = wrapper.find('textarea')
      await textarea.setValue('This is a description')

      const form = wrapper.find('form')
      await form.trigger('submit')

      const emitted = wrapper.emitted('createTask')[0][0]
      expect(emitted.title).toBe('Task with description')
      expect(emitted.description).toBe('This is a description')
    })

    it('should emit createTask with subtasks', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const titleInput = wrapper.find('input[type="text"]')
      await titleInput.setValue('Task with subtasks')

      const newSubtaskInput = wrapper.find('#new-subtask')
      await newSubtaskInput.setValue('Subtask 1')
      const addButton = wrapper.findAll('button').find((b) => b.text() === 'Ajouter')
      await addButton!.trigger('click')

      const form = wrapper.find('form')
      await form.trigger('submit')

      const emitted = wrapper.emitted('createTask')[0][0]
      expect(emitted.subtasks).toHaveLength(1)
      expect(emitted.subtasks[0].title).toBe('Subtask 1')
    })

    it('should clear form after submission', async () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const titleInput = wrapper.find('input[type="text"]')
      await titleInput.setValue('Test Task')

      const form = wrapper.find('form')
      await form.trigger('submit')

      await wrapper.vm.$nextTick()

      expect(titleInput.element.value).toBe('')
    })
  })

  describe('Error Handling', () => {
    it('should display error message when provided', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: 'Le titre ne peut pas être vide',
          editingTask: null,
        },
      })

      const errorDiv = wrapper.find('.error-message')
      expect(errorDiv.exists()).toBe(true)
      expect(errorDiv.text()).toContain('Le titre ne peut pas être vide')
    })

    it('should not display error message when empty', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const errorDiv = wrapper.find('.error-message')
      expect(errorDiv.exists()).toBe(false)
    })
  })

  describe('Accessibility', () => {
    it('should have aria-label on new subtask input', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const input = wrapper.find('#new-subtask')
      expect(input.attributes('aria-label')).toBeTruthy()
    })

    it('should have aria-required on title input', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: null,
        },
      })

      const titleInput = wrapper.find('input[type="text"]')
      expect(titleInput.attributes('aria-required')).toBe('true')
    })

    it('should have role="list" on subtasks container', () => {
      const wrapper = mount(TaskForm, {
        props: {
          errorMessage: '',
          editingTask: {
            id: 1,
            title: 'Task',
            status: 'to do',
            subtasks: [{ title: 'Sub 1', completed: false }],
          },
        },
      })

      const list = wrapper.find('.subtasks-list')
      expect(list.attributes('role')).toBe('list')
    })
  })
})
