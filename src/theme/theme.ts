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
    background: "#FFF9E1", // <--- FOND JAUNE VANILLE (Adieu le blanc triste)
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
};
