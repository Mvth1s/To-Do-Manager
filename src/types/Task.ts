// Les trois états possibles d'une tâche
export enum Status {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

// Une petite tâche qui fait partie d'une tâche plus grande
export interface Subtask {
  title: string
  completed: boolean
  weight?: number
}

// Une tâche avec titre, description optionnelle et sous-tâches optionnelles
export interface Task {
  id: string | number
  title: string
  status: Status
  description?: string
  subtasks?: Subtask[]
}
