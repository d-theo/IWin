import { MD3LightTheme } from "react-native-paper";

export const theme = {
  ...MD3LightTheme,
  dark: false,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FF9F1C", // Orange vibrant
    secondary: "#FF4081", // Rose bonbon
    tertiary: "#2EC4B6", // Menthe
    background: "#FFF9E1", //  FOND JAUNE VANILLE
    surface: "#FFFFFF", // Blanc pour les cartes
    onSurface: "#2B1B52", // Texte violet foncé (mieux que noir)
    primaryContainer: "#FFECB3", // Orange très clair pour les fonds de boutons secondaires
    surfaceVariant: "#F0F0F0", // Pour les champs de saisie
    outline: "#FF9F1C", // Bordures oranges
    elevation: {
      level3: "#FFFFFF", // Fond des modales
    },
    tertiaryContainer: "#2EC4B6",
  },
  iconButton: {
    sizes: {
      s: 10,
      m: 20,
      l: 30,
      xl: 40,
    },
  },
  spacing: {
    xxxs: 3,
    xxs: 6,
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 12,
    m: 18,
    l: 24,
  },
  borderWidth: {
    s: 2,
    m: 3,
    l: 4,
  },
  fontSize: {
    xs: 14,
    s: 16,
    m: 24,
    l: 28,
    xl: 32,
  },
  fontWeight: {
    regular: "400",
    bold: "700",
    black: "900",
  },
} as const;

export type AppTheme = typeof theme;
