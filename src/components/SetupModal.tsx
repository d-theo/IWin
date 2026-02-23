import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, Animated } from "react-native";
import { Portal, Text, Button, TextInput, useTheme } from "react-native-paper";
import { useGameStore } from "../store/gameStore";
import { useNavigation } from "@react-navigation/native";
import BaseModal from "./BaseModal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MODAL_PADDING = 40;
const ITEM_WIDTH = SCREEN_WIDTH - MODAL_PADDING;
type Step = {
  id: string;
  question: string;
  key: string;
};

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
  const steps: Step[] = [
    { id: "1", question: "Quel est le nom du jeu ?", key: "" },
    { id: "2", question: "Nom du joueur", key: "" },
    { id: "3", question: "Nom du joueur", key: "" },
    { id: "4", question: "Nom du joueur", key: "" },
    { id: "5", question: "Nom du joueur", key: "" },
    { id: "6", question: "Nom du joueur", key: "" },
    { id: "7", question: "Nom du joueur", key: "" },
    { id: "8", question: "Nom du joueur", key: "" },
  ];

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
    if (currentIndex < steps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onCancel = () => {
    if (currentIndex === 0) {
      onDismiss();
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderStep = ({ item }: { item: Step }) => (
    <View style={{ width: ITEM_WIDTH, padding: 20 }}>
      <Text variant="headlineSmall">{item.question}</Text>
      <TextInput
        autoFocus={currentIndex === 0}
        mode="outlined"
        label={item.key}
        style={{ marginTop: 10 }}
        onChangeText={(t) => setText(t)}
      />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingTop: 12,
        }}
      >
        <Button onPress={onCancel}>
          {currentIndex === 0 ? "Annuler" : "Retour"}
        </Button>
        {currentIndex === 0 && (
          <Button mode="contained" onPress={handleAddGameName}>
            Suivant
          </Button>
        )}
        {currentIndex > 0 && (
          <>
            <Button mode="contained" onPress={handleAddPlayer}>
              Ajouter
            </Button>
            <Button mode="contained" onPress={handleEndConfig}>
              Terminer
            </Button>
          </>
        )}
      </View>
    </View>
  );

  const handleAddGameName = () => {
    setGameObj({
      ...gameObj,
      name: text,
    });
    goToNext();
  };
  const handleAddPlayer = () => {
    const copy = gameObj.playerNames;
    copy[currentIndex - 1] = text;
    setGameObj({
      ...gameObj,
      playerNames: copy,
    });
    goToNext();
  };
  const handleEndConfig = () => {
    const copy = gameObj.playerNames;
    copy[currentIndex - 1] = text;
    setGameObj({
      ...gameObj,
      playerNames: copy,
    });
    const playerNames = gameObj.playerNames.filter((name) => name !== "");
    createGame(gameObj.name, playerNames);
    navigation.replace("Game");
  };

  return (
    <Portal>
      <BaseModal visible={visible} onDismiss={onDismiss} title="">
        <Animated.View
          style={{ transform: [{ scale: bounceValue }], opacity: bounceValue }}
        >
          <FlatList
            ref={flatListRef}
            data={steps}
            renderItem={renderStep}
            horizontal
            pagingEnabled
            scrollEnabled={false} // On bloque le swipe manuel pour forcer l'usage des boutons
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          ></View>
        </Animated.View>
      </BaseModal>
    </Portal>
  );
};
