import { FlatList, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export default function HistoryScreen({ route, navigation }: Props) {
  const { playerId } = route.params;
  const game = useGameStore((s) => s.game);
  const deleteScore = useGameStore((s) => s.deleteScore);
  const theme = useTheme();

  const player = game?.players.find((p) => p.id === playerId);
  if (!player) return null;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 16, gap: 12 }}
        data={[...player.scores].reverse()}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <Card
            style={{
              backgroundColor: "white",
              borderColor: theme.colors.primary,
              borderWidth: 2,
            }}
          >
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: 15,
                    fontWeight: "bold",
                    fontSize: 28,
                    color: `${item.value > 0 ? theme.colors.tertiary : theme.colors.secondary}`,
                  }}
                >
                  {item.value > 0 ? "+" : ""}
                  {item.value}
                </Text>
                <View
                  style={{
                    alignSelf: "flex-end",
                    flexDirection: "row",
                    marginLeft: "auto",
                  }}
                >
                  <IconButton
                    icon="pencil"
                    mode="contained"
                    containerColor={theme.colors.primary}
                    iconColor="white"
                    size={30}
                    onPress={() =>
                      navigation.navigate("EditScore", {
                        playerId,
                        scoreId: item.id,
                      })
                    }
                  />
                  <IconButton
                    icon="delete"
                    mode="contained"
                    containerColor={theme.colors.secondary}
                    iconColor="white"
                    size={30}
                    onPress={() => deleteScore(playerId, item.id)}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
