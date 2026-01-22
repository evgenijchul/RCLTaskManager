import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vs } from '../utils/scale';

export const TaskManagerListSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: vs(10),
  },
});
