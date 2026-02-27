import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/theme/theme";
import { Appearance } from "react-native";
import i18n from "./src/i18n";
import * as Localization from "expo-localization";
import { usePhoneLocale } from "./src/hooks/useLocale";

export default function App() {
  Appearance.setColorScheme("light");
  const { init } = usePhoneLocale();
  init();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
