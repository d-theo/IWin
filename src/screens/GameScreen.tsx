import { FlatList, View } from "react-native";
import {
  Card,
  IconButton,
  MD3Colors,
  PaperProvider,
  Text,
} from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { AddScore } from "../components/AddScore";
import { useState } from "react";

const total = (scores: any[]) => scores.reduce((sum, s) => sum + s.value, 0);

export default function GameScreen({ navigation }: any) {
  const game = useGameStore((s) => s.game);
  const addScore = useGameStore((s) => s.addScore);
  const [scoreAdder, setScoreAdder] = useState({
    adding: false,
    currentPlayerId: "",
  });

  const handleCloseScoreAdder = () => {
    setScoreAdder({
      adding: false,
      currentPlayerId: "",
    });
  };

  const handleOpenScoreAdder = (playerId: string) => {
    setScoreAdder({
      adding: true,
      currentPlayerId: playerId,
    });
  };

  const handleAddScore = (score: number) => {
    const currentPlayerId = scoreAdder.currentPlayerId;
    addScore(currentPlayerId, score);
    handleCloseScoreAdder();
  };

  if (!game) return null;

  return (
    <PaperProvider>
      <AddScore
        onAddScore={handleAddScore}
        isOpen={scoreAdder.adding}
        onClose={handleCloseScoreAdder}
      />
      <FlatList
        contentContainerStyle={{ padding: 16, gap: 12 }}
        data={game.players}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <Card>
            <Card.Content>
              <Text variant="titleLarge">{item.name}</Text>
              <Text variant="headlineMedium">{total(item.scores)}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <IconButton
                  icon="menu"
                  iconColor={MD3Colors.primary10}
                  size={20}
                  onPress={() =>
                    navigation.navigate("History", { playerId: item.id })
                  }
                />
                <IconButton
                  icon="plus-circle"
                  iconColor={MD3Colors.primary10}
                  size={20}
                  onPress={() => handleOpenScoreAdder(item.id)}
                />
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </PaperProvider>
  );
}
