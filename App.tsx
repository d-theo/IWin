import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { theme } from "./src/theme/theme";
import { Appearance } from "react-native";

export default function App() {
  Appearance.setColorScheme("light");
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
