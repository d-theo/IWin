import { IconButton } from "./atoms/IconButton";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { AppTheme } from "../theme/theme";
import { Game } from "../types/game";

type Props = {
  game: Game
}

export const GameHistoryCard = ({ game }: Props) => {
  const { spacing, colors, fontSize, fontWeight } = useTheme<AppTheme>();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacing.xs,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginLeft: spacing.m,
          fontWeight: fontWeight.bold,
          fontSize: fontSize.l,
          color: colors.primary,
        }}
      >
        {game.name}
      </Text>
    </View>
  );
};