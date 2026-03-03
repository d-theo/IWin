import { shouldAppear } from "./utils";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Dot } from "./Dot";
import { useEffect, useRef } from "react";

const styles = StyleSheet.create({
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

type Props = {
  roll: number
}

export const Dice = ({roll}: Props) => {
  const rotation = useSharedValue(0);
  const previousRoll = useRef<number>(roll);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    const prev = previousRoll.current;
    if (prev < roll) {
      rotation.value = withTiming(rotation.value + 90, { duration: 200 });
    } else {
      rotation.value = withTiming(rotation.value - 90, { duration: 200 });
    }
    previousRoll.current = roll;
  }, [roll]);

  return (<Animated.View style={[styles.dice, animatedStyle]}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
      <Dot key={n} visible={shouldAppear(n, roll)} />
    ))}
  </Animated.View>)
}

