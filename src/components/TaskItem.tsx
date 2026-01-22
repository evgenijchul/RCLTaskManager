import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { nextStatus } from '../utils/taskStatus';
import { Task } from '../types';
import { ms, s, vs } from '../utils/scale';
import { getFormattedDateForDisplay } from '../utils/date';

type Props = {
  task: Task;
  onToggleStatus: (id: string, nextStatus: Task['status']) => void;
};

export const TaskItem = ({ task, onToggleStatus }: Props) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {/* Title */}
      <View style={styles.colTitle}>
        <Text
          style={[styles.title, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
      </View>

      {/* Due Date */}
      <View style={styles.colDue}>
        <Text
          style={[styles.metaText, { color: theme.colors.mutedText }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {getFormattedDateForDisplay(task.dueDate)}
        </Text>
      </View>

      {/* Status */}
      <View style={styles.colStatus}>
        <Text
          style={[styles.metaText, { color: theme.colors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {task.status}
        </Text>
      </View>

      {/* Action */}
      <Pressable
        onPress={() => onToggleStatus(task.id, nextStatus(task.status))}
        style={({ pressed }) => [
          styles.action,
          {
            borderColor: theme.colors.border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={[styles.metaText, { color: theme.colors.text }]}>
          Change
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    padding: s(12),
    alignItems: 'center',
    gap: s(3),
  },
  colTitle: {
    flex: 1,
  },
  colDue: {
    width: s(80),
    alignItems: 'center',
  },
  colStatus: {
    width: s(70),
    alignItems: 'center',
  },
  title: {
    fontSize: ms(15),
    fontWeight: '500',
  },
  metaText: {
    fontSize: ms(12),
  },
  action: {
    paddingHorizontal: s(10),
    paddingVertical: vs(6),
    borderWidth: StyleSheet.hairlineWidth,
  },
});
