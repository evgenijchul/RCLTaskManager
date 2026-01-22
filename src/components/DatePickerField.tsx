import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../theme';
import { ms, s, vs } from '../utils/scale';
import {
  getFormattedDateForDisplay,
  getFormattedDateYYYYMMDD,
  getParsedDateYYYYMMDD,
  getStartOfToday,
} from '../utils/date';

type Props = {
  label: string;
  value: string | null;
  onChange: (nextValue: string) => void;
};

export const DatePickerField = ({ label, value, onChange }: Props) => {
  const today = getStartOfToday();
  const parsed = value ? getParsedDateYYYYMMDD(value) : null;

  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState<Date>(parsed ?? today);
  const textValue = value ? getFormattedDateForDisplay(value) : 'Select date';

  const { theme } = useTheme();

  const open = () => {
    setDraft(parsed ?? today);
    setVisible(true);
  };

  const close = () => setVisible(false);

  const commit = (date: Date) => {
    onChange(getFormattedDateYYYYMMDD(date));
  };

  const onAndroidChange = (_event: DateTimePickerEvent, date?: Date) => {
    // Android shows a dialog; close immediately after selection/cancel.
    close();
    if (date) commit(date);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.mutedText }]}>
        {label}
      </Text>

      <Pressable
        onPress={open}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.colors.inputBackground,
            borderColor: theme.colors.border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text
          style={{ color: value ? theme.colors.text : theme.colors.mutedText }}
        >
          {textValue}
        </Text>
      </Pressable>

      {Platform.OS === 'android' && visible ? (
        <DateTimePicker
          value={draft}
          mode="date"
          minimumDate={today}
          onChange={onAndroidChange}
        />
      ) : null}

      {Platform.OS === 'ios' ? (
        <Modal
          visible={visible}
          transparent
          animationType="slide"
          onRequestClose={close}
        >
          <View style={styles.backdrop} pointerEvents="box-none">
            <Pressable
              onPress={close}
              style={StyleSheet.absoluteFill}
            />

            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.modalHeader}>
                <Pressable onPress={close}>
                  <Text
                    style={{ color: theme.colors.primary, fontWeight: '700' }}
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    commit(draft);
                    close();
                  }}
                >
                  <Text
                    style={{ color: theme.colors.primary, fontWeight: '700' }}
                  >
                    Done
                  </Text>
                </Pressable>
              </View>

              <DateTimePicker
                value={draft}
                mode="date"
                display="spinner"
                minimumDate={today}
                onChange={(_event, date) => {
                  if (date) setDraft(date);
                }}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: vs(6),
  },
  label: {
    fontSize: ms(12),
    fontWeight: '600',
  },
  button: {
    paddingHorizontal: s(12),
    paddingVertical: vs(12),
    borderRadius: s(4),
    borderWidth: StyleSheet.hairlineWidth,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalCard: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: vs(12),
    paddingBottom: vs(24),
    paddingHorizontal: s(12),
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: s(8),
    paddingBottom: vs(10),
  },
});
