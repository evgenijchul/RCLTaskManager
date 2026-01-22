import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { TaskItem } from '../components';
import { useTheme } from '../theme';
import {
  NewTaskInput,
  Task,
  TaskFilter,
  TaskStatus,
  TASK_FILTER_ALL,
} from '../types';
import { getUniqueId } from '../utils/id';
import { s, vs } from '../utils/scale';
import { TaskManagerEmptyState } from './TaskManagerEmptyState';
import { TaskManagerHeader } from './TaskManagerHeader';
import { TaskManagerListSeparator } from './TaskManagerListSeparator';

export const TaskManagerScreen = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>(TASK_FILTER_ALL);

  const visibleSortedTasks = useMemo(() => {
    const filtered =
      filter === TASK_FILTER_ALL ? tasks : tasks.filter(task => task.status === filter);

    // Sort by earliest due date, then newest created.
    return [...filtered].sort((a, b) => {
      if (a.dueDate === b.dueDate) return b.createdAt - a.createdAt;
      return a.dueDate.localeCompare(b.dueDate);
    });
  }, [tasks, filter]);

  const addTask = (draft: NewTaskInput) => {
    const id = getUniqueId();

    setTasks(prev => [
      {
        id,
        title: draft.title,
        dueDate: draft.dueDate,
        status: draft.status,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  const updateTaskStatus = (id: string, next: TaskStatus) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        return { ...task, status: next };
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={visibleSortedTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <TaskManagerHeader
            isCollapsed={tasks.length > 0}
            filter={filter}
            onChangeFilter={setFilter}
            onAddTask={addTask}
          />
        }
        renderItem={({ item }) => (
          <TaskItem task={item} onToggleStatus={updateTaskStatus} />
        )}
        ItemSeparatorComponent={TaskManagerListSeparator}
        ListEmptyComponent={<TaskManagerEmptyState />}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    padding: s(16),
    paddingBottom: vs(24),
  },
});
