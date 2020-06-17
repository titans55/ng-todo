export interface Board {
  boardName: string;
  content: TaskSections;
}

export interface TaskSections {
  todo: Array<Task>;
  doing: Array<Task>;
  done: Array<Task>;
}

export interface Task {
  id?: number;
  header: string;
  checklist: Array<Check>;
}

export interface Check {
  label: string;
  checked: boolean;
}
