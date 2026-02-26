import { Pressable, View } from "react-native";
import { useTheme, Text, Chip, Icon, Surface } from "react-native-paper";
import { AppTheme } from "../theme/theme";
import { Game } from "../types/game";

type Props = {
  game: Game;
  onPress: () => void;
};

export const GameHistoryCard = ({ game, onPress }: Props) => {
  const { spacing, colors, fontSize, fontWeight } = useTheme<AppTheme>();
  const winner = game.players.reduce(
    (acc, val) => (val.scores > acc.scores ? val : acc),
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
