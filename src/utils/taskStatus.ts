import { TASK_STATUSES, TaskStatus } from '../types';

export const nextStatus = (current: TaskStatus): TaskStatus => {
  const idx = TASK_STATUSES.indexOf(current);
  const nextIdx = (idx + 1) % TASK_STATUSES.length;
  return TASK_STATUSES[nextIdx];
};
