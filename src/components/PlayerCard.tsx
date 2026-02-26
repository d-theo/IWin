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
  readonly: boolean;
};

export default function PlayerCard({
  name,
  score,
  onAdd,
  onHistory,
  readonly,
}: Props) {
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

  const handlePress = () => {
    if (!readonly) onHistory();
  };

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
        onPress={handlePress}
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
              fontSize: 20,
            }}
          >
            {name}
          </Text>
        </Surface>

        <Surface
          style={{
            alignItems: "flex-end",
            marginLeft: theme.spacing.m,
            marginRight: theme.spacing.m,
          }}
          elevation={0}
        >
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

        {!readonly && (
          <Surface style={{ alignItems: "flex-end" }} elevation={0}>
            <IconButton
              icon="plus"
              variant="tertiary"
              size="l"
              onPress={onAdd}
              style={{ margin: 0, borderRadius: theme.borderRadius.s }}
            />
          </Surface>
        )}
      </Pressable>
    </Surface>
  );
}
