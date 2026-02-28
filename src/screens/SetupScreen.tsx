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
  const game = useGameStore((s) => s.game);

  if (game) {
    navigation.replace("Game", { readonly: false, gameId: game.id });
  }

  const handleCreateGame = (gameName: string, playerNames: string[]) => {
    const game = createGame(gameName, playerNames);
    navigation.replace("Game", { readonly: false, gameId: game.id });
  };

  return (
    <SetupModal
      onGameCreate={handleCreateGame}
      onDismiss={() => setVisible(false)}
      visible={visible}
    />
  );
}
