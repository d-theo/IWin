// src/theme/theme.ts
import { createTheme } from "@shopify/restyle";

const palette = {
  orangeVibrant: "#FF9F1C",
  pink: "#FF4081",
  mint: "#2EC4B6",
  purple: "#2B1B52",
  blanc: "#FFFFFF",
  yellowLight: "#FFF9E1",
  orangeLight: "#FFECB3",
  greyLight: "#F0F0F0",
};

const theme = createTheme({
  colors: {
    primary: palette.orangeVibrant,
    secondary: palette.pink,
    tertiary: palette.mint,
    background: palette.yellowLight,
    surface: palette.blanc,
    text: palette.purple,
    cardPrimaryBackground: palette.orangeLight,
    onSurface: palette.purple,
    primaryContainer: palette.orangeLight,
    surfaceVariant: palette.greyLight,
    outline: palette.orangeLight,
    tertiaryContainer: palette.mint,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
    xxxl: 128,
    xxxxl: 256,
  },
  fontWeights: {
    s: "400",
    m: "500",
    l: "700",
    xl: "900",
  },
  borderRadii: {},
  fontSizes: {
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
  },
  textVariants: {
    title: {
      fontSize: 24,
      fontWeight: "xl",
      color: "text", // Fait référence à la couleur 'text' définie plus haut
    },
    body: {
      fontSize: 16,
      color: "text",
    },
    // On peut en ajouter d'autres : button, caption, etc.
    defaults: {
      // default for all <Text>
      fontSize: 14,
      color: "text",
    },
  },
  iconButtonVariants: {
    defaults: {
      color: "surface",
      backgroundColor: "primary",
    },
  },
});

export type Theme = typeof theme;
export default theme;
