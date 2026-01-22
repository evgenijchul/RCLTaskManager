import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TaskFilter, TASK_FILTERS } from '../types';
import { useTheme } from '../theme';
import { s, vs } from '../utils/scale';

type Props = {
  value: TaskFilter;
  onChange: (next: TaskFilter) => void;
};

export const StatusTabs = ({ value, onChange }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.row, { borderColor: theme.colors.border }]}>
      {TASK_FILTERS.map(option => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={({ pressed }) => [
              styles.tab,
              {
                opacity: pressed ? 0.85 : 1,
              },
              selected
                ? { borderBottomColor: theme.colors.text }
                : { borderBottomColor: 'transparent' },
            ]}
          >
            <Text
              style={[styles.label, { color: theme.colors.text }]}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    paddingVertical: vs(8),
    paddingHorizontal: s(10),
    borderBottomWidth: s(2),
  },
  label: {
    fontWeight: '400',
  },
});
