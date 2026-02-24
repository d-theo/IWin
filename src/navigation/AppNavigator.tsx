import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupScreen from "../screens/SetupScreen";
import GameScreen from "../screens/GameScreen";
import HistoryScreen from "../screens/HistoryScreen";
import EditScoreModal from "../screens/EditScoreModal";
import { RootStackParamList } from "./types";
import GamesHistoryScreen from "../screens/GamesHistoryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "Comptage des points" }}
      />
      <Stack.Screen
        name="EditScore"
        component={EditScoreModal}
        options={{ presentation: "modal", title: "Modifier le score" }}
      />

      <Stack.Screen
        name="GamesHistory"
        component={GamesHistoryScreen}
        options={{ title: "Toutes vos parties" }}
      />
    </Stack.Navigator>
  );
}
