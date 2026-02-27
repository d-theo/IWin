import { Pressable, View } from "react-native";
import { useTheme, Text, Chip, Icon } from "react-native-paper";
import { AppTheme } from "../theme/theme";
import { Game, ScoreEntry } from "../types/game";

type Props = {
  game: Game;
  onPress: () => void;
};

const sumAllScores = (acc: number, val: ScoreEntry) => acc + val.value;

export const GameHistoryCard = ({ game, onPress }: Props) => {
  const { spacing, colors, fontSize, fontWeight } = useTheme<AppTheme>();
  const winner = game.players.reduce(
    (currentWinner, challenger) =>
      challenger.scores.reduce(sumAllScores, 0) >
      currentWinner.scores.reduce(sumAllScores, 0)
        ? challenger
        : currentWinner,
    game.players[0],
  );

  return (
    <Pressable
      onPress={onPress}
      style={{
        gap: spacing.m,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: fontWeight.bold,
            fontSize: fontSize.m,
            color: colors.primary,
            marginRight: spacing.m,
          }}
        >
          {game.name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexWrap: "wrap",
          gap: spacing.xs,
          flexDirection: "row",
          alignSelf: "flex-start",
        }}
      >
        {game.players.map((player) => (
          <Chip
            avatar={
              winner.id === player.id && (
                <Icon source="trophy" color={colors.primary} size={15} />
              )
            }
            textStyle={{
              fontSize: 12,
              marginVertical: 0,
              color: colors.background,
            }}
            selectedColor={colors.background}
            style={{
              backgroundColor:
                winner.id === player.id ? colors.tertiary : colors.secondary,
            }}
            key={player.id}
          >
            {player.name}
          </Chip>
        ))}
      </View>
    </Pressable>
  );
};
