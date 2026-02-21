import { FlatList, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useGameStore } from "../store/gameStore";

export default function HistoryScreen({ route, navigation }: any) {
  const { playerId } = route.params;
  const game = useGameStore((s) => s.game);
  const deleteScore = useGameStore((s) => s.deleteScore);

  const player = game?.players.find((p) => p.id === playerId);
  if (!player) return null;

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={[...player.scores].reverse()}
      keyExtractor={(s) => s.id}
      renderItem={({ item }) => (
        <Card>
          <Card.Content>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Text variant="titleLarge">
                {item.value > 0 ? "+" : ""}
                {item.value}
              </Text>
              <Button
                mode="outlined"
                onPress={() =>
                  navigation.navigate("EditScore", {
                    playerId,
                    scoreId: item.id,
                  })
                }
              >
                Modifier
              </Button>

              <Button
                mode="contained"
                onPress={() => deleteScore(playerId, item.id)}
              >
                Supprimer
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    />
  );
}
