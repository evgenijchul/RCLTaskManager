import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../theme';
import { TaskStatus } from '../../types';
import { ms, s, vs } from '../../utils/scale';
import { getParsedDateYYYYMMDD, getStartOfToday } from '../../utils/date';
import { DatePickerField } from '../DatePickerField';
import { NewTaskFormStatusPicker } from './NewTaskFormStatusPicker';

type TaskDraft = {
  title: string;
  dueDate: string | null;
  status: TaskStatus;
};

type SubmitDraft = Omit<TaskDraft, 'dueDate'> & { dueDate: string };

const INITIAL_DRAFT: TaskDraft = {
  title: '',
  dueDate: null,
  status: 'Pending',
};

type Props = {
  onSubmit: (draft: SubmitDraft) => void;
  isCollapsed?: boolean;
};

export const NewTaskForm = ({ onSubmit, isCollapsed = false }: Props) => {
  const [expanded, setExpanded] = useState(!isCollapsed);
  const [draft, setDraft] = useState<TaskDraft>(INITIAL_DRAFT);
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {},
  );

  const canSubmit = draft.title.trim().length > 0 && Boolean(draft.dueDate);

  const { theme } = useTheme();

  const clearState = () => {
    setDraft(INITIAL_DRAFT);
    setErrors({});
    setExpanded(false);
  };

  const submit = () => {
    const nextErrors: typeof errors = {};

    const title = draft.title.trim();
    if (!title) nextErrors.title = 'Title is required';

    if (!draft.dueDate) {
      nextErrors.dueDate = 'Due date is required';
    } else {
      const parsed = getParsedDateYYYYMMDD(draft.dueDate);
      if (!parsed) {
        nextErrors.dueDate = 'Invalid date';
      } else if (parsed < getStartOfToday()) {
        nextErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      title,
      dueDate: draft.dueDate!,
      status: draft.status,
    });

    clearState();
  };

  // Show only "Add" button if list is not empty and form is collapsed.
  if (isCollapsed && !expanded) {
    return (
      <Pressable
        onPress={() => setExpanded(true)}
        style={[
          styles.collapsedCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>
          + Add new task
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
          Add task
        </Text>
        {isCollapsed && (
          <Pressable onPress={() => setExpanded(false)}>
            <Text style={[styles.cancelText, { color: theme.colors.mutedText }]}>
              Cancel
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.mutedText }]}>
          Title
        </Text>
        <TextInput
          value={draft.title}
          onChangeText={text => {
            setDraft(prev => ({ ...prev, title: text }));
            if (errors.title)
              setErrors(prev => ({ ...prev, title: undefined }));
          }}
          placeholder="Enter task title"
          placeholderTextColor={theme.colors.mutedText}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            },
          ]}
          returnKeyType="done"
        />
        {errors.title ? (
          <Text style={[styles.errorText, { color: theme.colors.danger }]}>
            {errors.title}
          </Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <DatePickerField
          label="Due date"
          value={draft.dueDate}
          onChange={next => {
            setDraft(prev => ({ ...prev, dueDate: next }));
            if (errors.dueDate)
              setErrors(prev => ({ ...prev, dueDate: undefined }));
          }}
        />
        {errors.dueDate ? (
          <Text style={[styles.errorText, { color: theme.colors.danger }]}>
            {errors.dueDate}
          </Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.mutedText }]}>
          Status
        </Text>
        <NewTaskFormStatusPicker
          value={draft.status}
          onChange={status => setDraft(prev => ({ ...prev, status }))}
        />
      </View>

      <Pressable
        onPress={submit}
        style={({ pressed }) => [
          styles.submit,
          {
            backgroundColor: canSubmit
              ? theme.colors.primary
              : theme.colors.buttonFill,
            borderColor: canSubmit ? theme.colors.text : theme.colors.border,
          },
          !canSubmit && { opacity: 0.6 },
          pressed && { opacity: 0.9 },
        ]}
      >
        <Text
          style={[
            styles.submitText,
            { color: canSubmit ? theme.colors.background : theme.colors.text },
          ]}
        >
          Add
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collapsedCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: s(4),
    padding: s(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: s(4),
    padding: s(14),
    gap: vs(12),
  },
  cardTitle: {
    fontSize: ms(16),
    fontWeight: '600',
  },
  field: {
    gap: vs(6),
  },
  label: {
    fontSize: ms(12),
    fontWeight: '600',
  },
  cancelText: {
    fontSize: ms(12),
  },
  errorText: {
    fontSize: ms(12),
  },
  input: {
    paddingHorizontal: s(12),
    paddingVertical: vs(12),
    borderRadius: s(4),
    borderWidth: StyleSheet.hairlineWidth,
  },
  submit: {
    borderRadius: s(4),
    paddingVertical: vs(12),
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  submitText: {
    fontWeight: '600',
  },
});
