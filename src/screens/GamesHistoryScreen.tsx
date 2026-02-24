import { FlatList, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { AppTheme } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "GamesHistory">;

export default function GamesHistoryScreen({ navigation }: Props) {
  const game = useGameStore((s) => s.game);
  const games = useGameStore((s) => s.gamesHistory);
  const { colors, spacing } = useTheme<AppTheme>();

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: spacing.m, gap: spacing.s }}
        data={[...games].reverse()}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <Card
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.primary,
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
                
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
