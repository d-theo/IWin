import { Button, Surface, TextInput, useTheme, Text } from "react-native-paper";
import { AppTheme } from "../../theme/theme";
import { Dimensions, View } from "react-native";
import { Step } from "./types";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { throttle } from "lodash";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const WhiteStepItem = () => {
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: "red",
      }}
    ></View>
  );
};
