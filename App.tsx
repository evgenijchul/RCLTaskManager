import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskManagerScreen } from './src/screens';
import { useThemeController } from './src/theme/useThemeController';

const App = () => {
  const { isDarkMode, setIsDarkMode, theme, barStyle } = useThemeController();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={barStyle} />
      <TaskManagerScreen
        theme={theme}
        isDarkMode={isDarkMode}
        onToggleDarkMode={setIsDarkMode}
      />
    </SafeAreaProvider>
  );
};

export default App;
