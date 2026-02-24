import { View } from "react-native";
import { useTheme, Text, Chip, Icon } from "react-native-paper";
import { AppTheme } from "../theme/theme";
import { Game } from "../types/game";

type Props = {
  game: Game;
};

export const GameHistoryCard = ({ game }: Props) => {
  const { spacing, colors, fontSize, fontWeight } = useTheme<AppTheme>();
  const winner = game.players.reduce(
    (acc, val) => (val.scores > acc.scores ? val : acc),
    game.players[0],
  );
  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.xs,
        alignItems: "center",
        position: "relative",
      }}
    >
      <View>
        <Text
          style={{
            marginLeft: spacing.m,
            fontWeight: fontWeight.bold,
            fontSize: fontSize.l,
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
    </View>
  );
};
