import { IconButton } from "./atoms/IconButton";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { AppTheme } from "../theme/theme";
import { Game, ScoreEntry } from "../types/game";

type Props = {
  score: ScoreEntry;
  onEditScore: () => void;
  onDeleteScore: () => void;
};

export const ScoreHistoryCard = ({
  score,
  onEditScore,
  onDeleteScore,
}: Props) => {
  const { colors, fontSize, spacing } = useTheme<AppTheme>();
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
          fontWeight: "bold",
          fontSize: fontSize.l,
          color: `${score.value > 0 ? colors.tertiary : colors.secondary}`,
        }}
      >
        {score.value > 0 ? "+" : ""}
        {score.value}
      </Text>
      <View
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          marginLeft: "auto",
        }}
      >
        <IconButton
          icon="pencil"
          variant="primary"
          size="l"
          onPress={onEditScore}
        />
        <IconButton
          icon="delete"
          variant="secondary"
          size="l"
          onPress={onDeleteScore}
        />
      </View>
    </View>
  );
};