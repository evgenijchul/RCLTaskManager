import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskManagerScreen } from './src/screens';
import { ThemeProvider, useTheme } from './src/theme';

const AppContent = () => {
  const { barStyle } = useTheme();
  return (
    <>
      <StatusBar barStyle={barStyle} />
      <TaskManagerScreen />
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
