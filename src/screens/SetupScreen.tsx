import React, { useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../store/gameStore";
import { StepItem } from "../components/Setup/Steps";
import { Step } from "./GameScreen";
import { Dice } from "../components/Dice/Dice";

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;
export function SetupScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const createGame = useGameStore((s) => s.createGame);

  const flatListRef = useRef<any>(null);
  const STEPS: Step[] = useMemo(
    () => [{ id: "1", question: t("app.gameName") }].concat(
      [2,3,4,5,6,7,8,9,10,11,12,13].map((i) => ({
        id: i.toString(),
        question: t("app.playerName")
      })))
  , []);

  const freshGame = {
    name: "",
    playerNames: Array(STEPS.length - 1).fill(""),
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
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
      <View>
        <Dice roll={currentIndex} />
        { currentIndex > 6 && (<Dice roll={currentIndex % 6} />)}
      </View>
    </View>
  );
}
