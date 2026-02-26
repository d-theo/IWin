import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupScreen from "../screens/SetupScreen";
import GameScreen from "../screens/GameScreen";
import HistoryScreen from "../screens/HistoryScreen";
import EditScoreModal from "../screens/EditScoreModal";
import { RootStackParamList } from "./types";
import GamesHistoryScreen from "../screens/GamesHistoryScreen";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Setup"
        component={SetupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={({ route }) => ({
          title: t("nav.overview"),
          headerShown: route.params?.readonly,
        })}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: t("nav.counting") }}
      />
      <Stack.Screen
        name="EditScore"
        component={EditScoreModal}
        options={{ presentation: "modal", title: t("nav.modifyScore") }}
      />

      <Stack.Screen
        name="GamesHistory"
        component={GamesHistoryScreen}
        options={{ title: t("nav.allGames") }}
      />
    </Stack.Navigator>
  );
}
