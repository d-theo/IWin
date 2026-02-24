import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { IconButton } from "./atoms/IconButton";
import { AppTheme } from "../theme/theme";

type Props = {
  name: string;
  score: number;
  onAdd: () => void;
  onHistory: () => void;
};

export default function PlayerCard({ name, score, onAdd, onHistory }: Props) {
  const theme = useTheme<AppTheme>();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (score !== 0) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 12, stiffness: 200 }),
        withSpring(1),
      );
    }
  }, [score]);

  const animatedScoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Surface
      style={{
        marginHorizontal: theme.spacing.m,
        marginVertical: theme.spacing.xxs,
        borderRadius: theme.borderRadius.m,
        borderWidth: theme.borderWidth.m,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.surface,
        overflow: "hidden",
      }}
      elevation={2}
    >
      <Pressable
        onPress={onHistory}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing.s,
        }}
      >
        <Surface style={{ flex: 1 }} elevation={0}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: theme.fontWeight.black,
              textTransform: "uppercase",
              fontSize: theme.fontSize.m,
            }}
          >
            {name}
          </Text>
        </Surface>

        <Surface style={{ flex: 1, alignItems: "flex-end" }} elevation={0}>
          <Animated.Text
            style={[
              {
                fontSize: theme.fontSize.xl,
                fontWeight: theme.fontWeight.black,
                color: theme.colors.secondary,
              },
              animatedScoreStyle,
            ]}
          >
            {score}
          </Animated.Text>
        </Surface>

        <Surface style={{ flex: 1, alignItems: "flex-end" }} elevation={0}>
          <IconButton
            icon="plus"
            variant="tertiary"
            size="l"
            onPress={onAdd}
            style={{ margin: 0, borderRadius: theme.borderRadius.s }}
          />
        </Surface>
      </Pressable>
    </Surface>
  );
}
