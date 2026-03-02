import { Button, Surface, TextInput, useTheme, Text } from "react-native-paper";
import { AppTheme } from "../../theme/theme";
import { Dimensions, View } from "react-native";
import { Step } from "./types";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { throttle } from "lodash";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  const { spacing, colors, borderRadius, borderWidth } = useTheme<AppTheme>();
  const { t } = useTranslation();
  const handleNext = useCallback(throttle(onNext, 500), [onNext, throttle]);
  const handleAddPlayer = useCallback(throttle(onAddPlayer, 500), [
    throttle,
    onAddPlayer,
  ]);

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 100,
          width: SCREEN_WIDTH,
          height: "100%",
          alignItems: "center", // <--- C'EST ÇA QUI CENTRE TON CARRÉ BLANC
          justifyContent: "flex-start", // Garde le marginTop: 100 fonctionnel
          backgroundColor: colors.background,
        }}
      >
        <Surface
          style={{
            backgroundColor: "white",
            marginTop: 100,
            height: 250,
            width: 200,
            padding: 10,
            borderRadius: borderRadius.l,
            borderColor: colors.primary,
            borderWidth: borderWidth.l,
          }}
          elevation={5}
        >
          <Text
            style={{ textAlignVertical: "center", textAlign: "center" }}
            variant="headlineSmall"
          >
            {item.question}
          </Text>
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
              {currentIndex === 0
                ? `${t("app.cancel")}`
                : `${t("app.previous")}`}
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
      </View>
    </View>
  );
};
