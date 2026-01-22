export const TASK_STATUSES = ['Pending', 'In Progress', 'Done'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_FILTER_ALL = 'All' as const;

export type Task = {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;
  createdAt: number;
};

export type TaskFilter = typeof TASK_FILTER_ALL | TaskStatus;

export type NewTaskInput = Pick<Task, 'title' | 'dueDate' | 'status'>;

export const TASK_FILTERS: readonly TaskFilter[] = [TASK_FILTER_ALL, ...TASK_STATUSES];
