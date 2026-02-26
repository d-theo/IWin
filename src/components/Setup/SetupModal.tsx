import React, { useState, useRef, useEffect } from "react";
import { FlatList, Animated } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useNavigation } from "@react-navigation/native";
import BaseModal from "../BaseModal";
import { StepItem } from "./Steps";
import { STEPS } from "./constants";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export const SetupModal = ({ visible, onDismiss }: Props) => {
  const flatListRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  const [gameObj, setGameObj] = useState({
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

  const createGame = useGameStore((s) => s.createGame);

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
    setGameObj((prev) => ({ ...prev, name: text }));
    goToNext();
  };

  const handleAddPlayer = () => {
    setGameObj((prev) => {
      const playerNames = [...prev.playerNames];
      playerNames[currentIndex - 1] = text;
      return { ...prev, playerNames };
    });
    goToNext();
  };

  const handleEndConfig = () => {
    const playerNames = [...gameObj.playerNames, text].filter(
      (name) => name !== "",
    );
    const game = createGame(gameObj.name, playerNames);
    navigation.replace("Game", { readonly: false, game });
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
