export type AppTheme = {
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    text: string;
    mutedText: string;
    border: string;
    primary: string;
    danger: string;
    inputBackground: string;
    buttonFill: string;
  };
};

export function getTheme(isDark: boolean): AppTheme {
  if (isDark) {
    return {
      isDark,
      colors: {
        background: '#000000',
        surface: '#111111',
        text: '#FFFFFF',
        mutedText: '#A0A0A0',
        border: '#333333',
        primary: '#FFFFFF',
        danger: '#FF6B6B',
        inputBackground: '#1A1A1A',
        buttonFill: '#222222',
      },
    };
  }

  return {
    isDark,
    colors: {
      background: '#FFFFFF',
      surface: '#F7F7F7', // gray background for cards
      text: '#111111',
      mutedText: '#666666',
      border: '#E0E0E0',
      primary: '#111111',
      danger: '#B00020',
      inputBackground: '#FFFFFF',
      buttonFill: '#EAEAEA',
    },
  };
}
