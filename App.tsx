import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/theme/theme";
import { Appearance, AppState } from "react-native";
import i18n from "./src/i18n";
import * as Localization from "expo-localization";
import { useEffect } from "react";
import { useGameStore } from "./src/store/gameStore";

export default function App() {
  Appearance.setColorScheme("light");

  const locales = Localization.useLocales();
  const lang = locales[0].languageCode;

  i18n.changeLanguage(lang ?? "en");

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "background") {
        const { game } = useGameStore.getState();

        if (game) {
          useGameStore.getState().endGame();
        }
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
