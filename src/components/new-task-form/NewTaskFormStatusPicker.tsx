import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { TaskStatus, TASK_STATUSES } from '../../types';
import { ms, s, vs } from '../../utils/scale';

type Props = {
  value: TaskStatus;
  onChange: (next: TaskStatus) => void;
};

export const NewTaskFormStatusPicker = ({ value, onChange }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles.row}>
      {TASK_STATUSES.map(status => {
        const selected = value === status;
        return (
          <Pressable
            key={status}
            onPress={() => onChange(status)}
            style={({ pressed }) => [
              styles.btn,
              {
                backgroundColor: selected
                  ? theme.colors.inputBackground
                  : theme.colors.buttonFill,
                borderColor: selected ? theme.colors.primary : theme.colors.border,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[styles.label, { color: theme.colors.text }]}
            >
              {status}
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
    flexWrap: 'wrap',
    marginTop: vs(2),
  },
  btn: {
    paddingVertical: vs(8),
    paddingHorizontal: s(10),
    borderRadius: s(4),
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: s(8),
    marginBottom: vs(8),
  },
  label: {
    fontWeight: '400',
    fontSize: ms(12),
  },
});
