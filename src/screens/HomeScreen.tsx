import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../store/gameStore";
import { AppTheme } from "../theme/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "black",
    margin: 1,
  },
  dice: {
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: 32,
    height: 32,
    padding: 3,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();
  const game = useGameStore((s) => s.game);
  const [roll, setRool] = useState(1);

  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  if (game) {
    navigation.replace("Game", { readonly: false, gameId: game.id });
  }

  const shouldAppear = (index: number) => {
    const o: any = {
      1: [2, 3, 5, 4, 6],
      2: [6],
      3: [4, 5, 6],
      4: [],
      5: [1, 3, 5],
      6: [],
      7: [4, 5, 6],
      8: [6],
      9: [2, 3, 4, 5, 6],
    };

    const a = o[index] as number[];
    return a.indexOf(roll) !== -1;
  };

  const rollDice = () => {
    setRool((roll) => roll + 1);
    rotation.value = withTiming(rotation.value + 90, { duration: 200 });
  };

  return (
    <Surface
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.l,
        backgroundColor: theme.colors.background,
      }}
    >
      <Button mode="contained" onPress={() => navigation.replace("Setup")}>
        {t("app.startGame")}
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("GamesHistory")}
      >
        {t("app.seePreviousGame")}
      </Button>
      <Button onPress={rollDice}>roll</Button>
      <Animated.View style={[styles.dice, animatedStyle]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <AnimatedDot key={n} style={styles.dot} visible={shouldAppear(n)} />
        ))}
      </Animated.View>
    </Surface>
  );
}

type DotProps = {
  visible: boolean;
  style: any;
};

const AnimatedDot = ({ visible, style }: DotProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animation fluide vers 1 ou 0 dès que la prop 'visible' change
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[style, animatedStyle]} />;
};
