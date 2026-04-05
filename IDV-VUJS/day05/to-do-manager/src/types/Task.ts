export enum Status {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export interface Subtask {
  title: string
  completed: boolean
  weight?: number
}

export interface Task {
  id: string | number
  title: string
  status: Status
  description?: string
  subtasks?: Subtask[]
}
