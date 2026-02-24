import { FlatList, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { AppTheme } from "../theme/theme";
import { GameHistoryCard } from "../components/GameHistoryCard";
import { formatDistanceToNow } from "date-fns";

type Props = NativeStackScreenProps<RootStackParamList, "GamesHistory">;

export default function GamesHistoryScreen({ navigation }: Props) {
  const games = useGameStore((s) => s.gamesHistory);
  const { colors, spacing, fontSize, fontWeight } = useTheme<AppTheme>();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: spacing.m, gap: spacing.s }}
        data={[...games]}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <>
            <Text
              style={{
                alignSelf: "center",
                marginBottom: 3,
                color: colors.onSurface,
                fontSize: fontSize.xs,
                fontWeight: fontWeight.black,
              }}
            >
              {formatDistanceToNow(new Date(item.createdAt))}
            </Text>
            <Card
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.primary,
                borderWidth: 2,
              }}
            >
              <Card.Content>
                <GameHistoryCard game={item} />
              </Card.Content>
            </Card>
          </>
        )}
      />
    </View>
  );
}
