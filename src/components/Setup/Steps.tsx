import { Button, Surface, TextInput, useTheme, Text } from "react-native-paper";
import { AppTheme } from "../../theme/theme";
import { Dimensions } from "react-native";
import { Step } from "./types";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { throttle } from "lodash";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_PADDING = 40;
const ITEM_WIDTH = SCREEN_WIDTH - MODAL_PADDING;

type StepItemProps = {
  item: Step;
  currentIndex: number;
  onChangeText: (t: string) => void;
  onCancel: () => void;
  onNext: () => void;
  onAddPlayer: () => void;
  onEndConfig: () => void;
};

export const StepItem = ({
  item,
  currentIndex,
  onChangeText,
  onCancel,
  onNext,
  onAddPlayer,
  onEndConfig,
}: StepItemProps) => {
  const { spacing } = useTheme<AppTheme>();
  const { t } = useTranslation();
  const handleNext = useCallback(throttle(onNext, 500), [onNext, throttle]);
  const handleAddPlayer = useCallback(throttle(onAddPlayer, 500), [
    throttle,
    onAddPlayer,
  ]);

  return (
    <Surface
      style={{
        width: ITEM_WIDTH,
        flexDirection: "column",
        padding: spacing.m,
      }}
      elevation={0}
    >
      <Text variant="headlineSmall">{item.question}</Text>
      <TextInput
        autoFocus={currentIndex === 0}
        mode="outlined"
        label=""
        style={{ marginTop: spacing.s }}
        onChangeText={onChangeText}
      />
      <Surface
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingTop: spacing.s,
        }}
        elevation={0}
      >
        <Button onPress={onCancel}>
          {currentIndex === 0 ? `${t("app.cancel")}` : `${t("app.previous")}`}
        </Button>
        {currentIndex === 0 && (
          <Button mode="contained" onPress={handleNext}>
            {t("app.next")}
          </Button>
        )}
        {currentIndex > 0 && (
          <>
            <Button mode="contained" onPress={handleAddPlayer}>
              {t("app.add")}
            </Button>
            <Button mode="contained" onPress={onEndConfig}>
              {t("app.finish")}
            </Button>
          </>
        )}
      </Surface>
    </Surface>
  );
};
