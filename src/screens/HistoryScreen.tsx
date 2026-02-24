import { FlatList, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { AppTheme } from "../theme/theme";
import { ScoreHistoryCard } from "../components/ScoreHistoryCard";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export default function HistoryScreen({ route, navigation }: Props) {
  const { playerId } = route.params;
  const game = useGameStore((s) => s.game);
  const deleteScore = useGameStore((s) => s.deleteScore);
  const { colors, spacing, borderWidth } = useTheme<AppTheme>();

  const player = game?.players.find((p) => p.id === playerId);
  if (!player) return null;

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          padding: spacing.m,
          gap: spacing.s,
        }}
        data={[...player.scores].reverse()}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <Card
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.primary,
              borderWidth: borderWidth.s,
            }}
          >
            <Card.Content>
              <ScoreHistoryCard
                score={item}
                onEditScore={() =>
                  navigation.navigate("EditScore", {
                    playerId: playerId,
                    scoreId: item.id,
                  })
                }
                onDeleteScore={() => deleteScore(playerId, item.id)}
              />
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
