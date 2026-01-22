export const TASK_STATUSES = ['Pending', 'In Progress', 'Done'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD
  status: TaskStatus;
  createdAt: number;
};

export type TaskFilter = 'All' | TaskStatus;
