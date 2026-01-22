import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { ms, s, vs } from '../utils/scale';

export const TaskManagerEmptyState = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.empty,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No tasks yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.mutedText }]}>
        Add your first task above.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    borderRadius: 0,
    borderWidth: StyleSheet.hairlineWidth,
    padding: s(16),
  },
  emptyTitle: {
    fontWeight: '600',
    fontSize: ms(14),
  },
  emptySubtitle: {
    marginTop: vs(4),
    fontSize: ms(12),
  },
});
