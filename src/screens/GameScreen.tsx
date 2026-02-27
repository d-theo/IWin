import { FlatList, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { AddScore, AddScoreOption } from "../components/AddScore";
import { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { AppTheme } from "../theme/theme";
import { useTranslation } from "react-i18next";

const total = (scores: any[]) => scores.reduce((sum, s) => sum + s.value, 0);

type Props = NativeStackScreenProps<RootStackParamList, "Game">;
export type Step = {
  id: string;
  question: string;
};

export default function GameScreen({ navigation, route }: Props) {
  const { readonly, gameId } = route.params;
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();

  const game = useGameStore((s) => {
    const game = s.game;
    if (game?.id === gameId) return game;
    const pastGame = s.gamesHistory.find((history) => history.id === gameId);
    if (pastGame) return pastGame;
    return null;
  });
  const endGame = useGameStore((s) => s.endGame);
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

  const handleAddScore = (
    score: number,
    { shouldCloseModal }: AddScoreOption,
  ) => {
    const currentPlayerId = scoreAdder.currentPlayerId;
    addScore(currentPlayerId, score);
    if (shouldCloseModal) handleCloseScoreAdder();
  };

  const handleEndGame = () => {
    endGame();
    navigation.replace("Setup", { shouldSetupNewGame: false });
  };

  if (!game) {
    navigation.replace("Setup", { shouldSetupNewGame: false });
    return null;
  }

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <AddScore
        onAddScore={handleAddScore}
        isOpen={scoreAdder.adding}
        onClose={handleCloseScoreAdder}
      />
      <Text
        variant="headlineMedium"
        style={{
          textAlign: "center",
          padding: theme.spacing.m,
          fontWeight: theme.fontWeight.black,
          color: theme.colors.primary,
          marginTop: readonly ? theme.spacing.s : theme.spacing.xl,
        }}
      >
        {game.name}
      </Text>
      <FlatList
        data={game.players}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onAdd={() => handleOpenScoreAdder(item.id)}
            onHistory={() =>
              navigation.navigate("ScoresHistory", { playerId: item.id })
            }
            score={total(item.scores)}
            readonly={readonly}
          />
        )}
      />
      {!readonly && (
        <Button mode="contained" style={{ margin: 40 }} onPress={handleEndGame}>
          {t("app.endGame")}
        </Button>
      )}
    </View>
  );
}
