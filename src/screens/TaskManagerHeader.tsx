import React from 'react';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';
import { NewTaskForm, StatusTabs } from '../components';
import { useTheme } from '../theme';
import { NewTaskInput, TaskFilter } from '../types';
import { ms, s, vs } from '../utils/scale';

type Props = {
  isCollapsed: boolean;
  filter: TaskFilter;
  onChangeFilter: (next: TaskFilter) => void;
  onAddTask: (draft: NewTaskInput) => void;
};

export const TaskManagerHeader = ({
  isCollapsed,
  filter,
  onChangeFilter,
  onAddTask,
}: Props) => {
  const { theme, isDarkMode, setIsDarkMode } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Task Manager</Text>
        <View style={styles.themeRow}>
          <Text style={[styles.smallText, { color: theme.colors.mutedText }]}>Dark</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
          />
        </View>
      </View>

      <NewTaskForm onSubmit={onAddTask} isCollapsed={isCollapsed} />

      <View style={styles.filterBlock}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Filter</Text>
        <StatusTabs value={filter} onChange={onChangeFilter} />
      </View>

      <Text style={[styles.smallText, { color: theme.colors.mutedText }]}>
        Tap 'Change' to cycle status
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: vs(12),
    paddingBottom: vs(14),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: ms(20),
    fontWeight: '600',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  filterBlock: {
    gap: vs(8),
  },
  sectionTitle: {
    fontSize: ms(14),
    fontWeight: '600',
  },
  smallText: {
    fontSize: ms(12),
  },
});
