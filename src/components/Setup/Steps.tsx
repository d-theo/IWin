import { Button, Surface, TextInput, useTheme, Text } from "react-native-paper";
import { AppTheme } from "../../theme/theme";
import { Dimensions, View } from "react-native";
import { Step } from "./types";
import { useTranslation } from "react-i18next";

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

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.background,
      }}
    >
      <Surface
        style={{
          backgroundColor: "white",
          marginTop: 100,
          height: 350,
          margin: 20,
          padding: 10,
          borderRadius: borderRadius.l,
          borderColor: colors.primary,
          borderWidth: borderWidth.l,
          overflow: "hidden",
        }}
        elevation={5}
      >
        <View
          style={{
            width: "100%",
            height: 80,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={3}
            variant="headlineSmall"
            style={{
              textAlignVertical: "center",
              textAlign: "center",
            }}
          >
            {item.question}
          </Text>
        </View>
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
            <Button mode="contained" onPress={onNext}>
              {t("app.next")}
            </Button>
          )}
          {currentIndex > 0 && (
            <>
              <Button mode="contained" onPress={onAddPlayer}>
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
  );
};
