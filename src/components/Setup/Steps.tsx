import { Button, Surface, TextInput, useTheme, Text } from "react-native-paper";
import { AppTheme } from "../../theme/theme";
import { Dimensions } from "react-native";
import { Step } from "./constants";

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
          {currentIndex === 0 ? "Annuler" : "Retour"}
        </Button>
        {currentIndex === 0 && (
          <Button mode="contained" onPress={onNext}>
            Suivant
          </Button>
        )}
        {currentIndex > 0 && (
          <>
            <Button mode="contained" onPress={onAddPlayer}>
              Ajouter
            </Button>
            <Button mode="contained" onPress={onEndConfig}>
              Terminer
            </Button>
          </>
        )}
      </Surface>
    </Surface>
  );
};
