export enum Status {
  TODO = "to do",
  IN_PROGRESS = "in progress",
  DONE = "done"
};

export interface Task {
  id: string | number;
  title: string;
  status: Status;
}