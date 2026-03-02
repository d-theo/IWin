import React, { useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../store/gameStore";
import { StepItem } from "../components/Setup/Steps";
import { Step } from "./GameScreen";
import { AppTheme } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export function SetupScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const theme = useTheme<AppTheme>();
  const createGame = useGameStore((s) => s.createGame);

  const flatListRef = useRef<any>(null);
  const STEPS: Step[] = useMemo(
    () => [
      { id: "1", question: t("app.gameName") },
      { id: "2", question: t("app.playerName") },
      { id: "3", question: t("app.playerName") },
      { id: "4", question: t("app.playerName") },
      { id: "5", question: t("app.playerName") },
      { id: "6", question: t("app.playerName") },
      { id: "7", question: t("app.playerName") },
      { id: "8", question: t("app.playerName") },
    ],
    [],
  );

  const freshGame = {
    name: "",
    playerNames: ["", "", "", "", "", "", "", ""],
  };

  const [newGame, setNewGame] = useState(freshGame);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNext = () => {
    if (currentIndex < STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((i) => i + 1);
    }
  };

  const goToPrev = () => {
    flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    setCurrentIndex((i) => i - 1);
  };

  const handleCancel = () => {
    if (currentIndex === 0)
      navigation.replace("Home", { shouldSetupNewGame: false });
    else goToPrev();
  };

  const handleAddGameName = () => {
    setNewGame((prev) => ({ ...prev, name: text }));
    goToNext();
  };

  const handleAddPlayer = () => {
    setNewGame((prev) => {
      const playerNames = [...prev.playerNames];
      playerNames[currentIndex - 1] = text;
      setText("");
      return { ...prev, playerNames };
    });
    goToNext();
  };

  const handleEndConfig = () => {
    const playerNames = [...newGame.playerNames, text].filter(
      (name) => name !== "",
    );
    const game = createGame(newGame.name, playerNames);
    navigation.replace("Game", { readonly: false, gameId: game.id });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={STEPS}
        renderItem={({ item }) => (
          <StepItem
            item={item}
            currentIndex={currentIndex}
            onChangeText={setText}
            onCancel={handleCancel}
            onNext={handleAddGameName}
            onAddPlayer={handleAddPlayer}
            onEndConfig={handleEndConfig}
          />
        )}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 0, // INTERDIT de mettre du padding ici
          margin: 0,
        }}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
}
