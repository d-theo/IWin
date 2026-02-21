import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupScreen from "../screens/SetupScreen";
import GameScreen from "../screens/GameScreen";
import HistoryScreen from "../screens/HistoryScreen";
import EditScoreModal from "../screens/EditScoreModal";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setup" component={SetupScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="EditScore"
        component={EditScoreModal}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
