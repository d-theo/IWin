import React, { useState, useRef, useEffect } from "react";
import { FlatList, Animated } from "react-native";
import BaseModal from "../BaseModal";
import { StepItem } from "./Steps";
import { Step } from "./types";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onGameCreate: (gameName: string, playerNames: string[]) => void;
};

export const SetupModal = ({ visible, onDismiss, onGameCreate }: Props) => {
  const { t } = useTranslation();
  const flatListRef = useRef<any>(null);
  const STEPS: Step[] = [
    { id: "1", question: t("app.gameName") },
    { id: "2", question: t("app.playerName") },
    { id: "3", question: t("app.playerName") },
    { id: "4", question: t("app.playerName") },
    { id: "5", question: t("app.playerName") },
    { id: "6", question: t("app.playerName") },
    { id: "7", question: t("app.playerName") },
    { id: "8", question: t("app.playerName") },
  ];
  const [newGame, setNewGame] = useState({
    name: "",
    playerNames: ["", "", "", "", "", "", "", ""],
  });
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }).start();
    } else {
      bounceValue.setValue(0);
    }
  }, [visible]);

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
    if (currentIndex === 0) onDismiss();
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
    onGameCreate(newGame.name, playerNames);
  };

  return (
    <BaseModal visible={visible} onDismiss={onDismiss} title="">
      <Animated.View
        style={{
          transform: [{ scale: bounceValue }],
          opacity: bounceValue,
        }}
      >
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
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </Animated.View>
    </BaseModal>
  );
};
