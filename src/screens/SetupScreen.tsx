import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SetupModal } from "../components/Setup/SetupModal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../store/gameStore";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 50,
  },
});

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;

export default function SetupScreen({ route, navigation }: Props) {
  const shouldCreateGame = route?.params?.shouldSetupNewGame ?? true;
  const [visible, setVisible] = useState(shouldCreateGame);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const createGame = useGameStore((s) => s.createGame);

  const handleCreateGame = (gameName: string, playerNames: string[]) => {
    const game = createGame(gameName, playerNames);
    navigation.replace("Game", { readonly: false, gameId: game.id });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SetupModal
        onGameCreate={handleCreateGame}
        onDismiss={() => setVisible(false)}
        visible={visible}
      />
      <Button mode="contained" onPress={() => setVisible(true)}>
        {t("app.startGame")}
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("GamesHistory")}
      >
        {t("app.seePreviousGame")}
      </Button>
    </View>
  );
}
