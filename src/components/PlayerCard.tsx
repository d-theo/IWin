import React, { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Surface, Text, IconButton, useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";

type Props = {
  name: string;
  score: number;
  onAdd: () => void;
  onHistory: () => void;
};

export default function PlayerCard({ name, score, onAdd, onHistory }: Props) {
  const theme = useTheme();
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
      style={[styles.card, { borderColor: theme.colors.primary }]}
      elevation={2}
    >
      <Pressable onPress={onHistory} style={styles.pressableArea}>
        <View style={styles.nameSection}>
          <Text variant="titleMedium" style={styles.nameText} numberOfLines={1}>
            {name}
          </Text>
        </View>

        <View style={styles.scoreSection}>
          <Animated.Text
            style={[
              styles.scoreText,
              { color: theme.colors.secondary },
              animatedScoreStyle,
            ]}
          >
            {score}
          </Animated.Text>
        </View>

        <View style={styles.actionSection}>
          <IconButton
            icon="plus"
            mode="contained"
            containerColor={theme.colors.tertiary}
            iconColor="white"
            size={30}
            onPress={onAdd}
            style={styles.addButton}
          />
        </View>
      </Pressable>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6, // Espace réduit pour en mettre plus
    borderRadius: 18,
    borderWidth: 3,
    backgroundColor: "#FFFFFF", // fond du joueur todo
    overflow: "hidden",
  },
  pressableArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12, // Plus compact
  },
  nameSection: {
    flex: 1,
  },
  nameText: {
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: 24,
  },
  scoreSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "900",
  },
  actionSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  addButton: {
    margin: 0,
    borderRadius: 12,
  },
});
