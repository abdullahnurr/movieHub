export const theme = {
  colors: {
    primary: "#f5c518",
    background: "#ffffff",
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
    button: {
      background: "#f5f5f5",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadows: {
    default: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  },
};

export type Theme = typeof theme;
