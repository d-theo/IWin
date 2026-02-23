import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import BaseModal from "./BaseModal";
import { IconButton } from "./atoms/IconButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddScore: (score: number, shouldClose: boolean) => void;
};

export const AddScore = ({ isOpen, onClose, onAddScore }: Props) => {
  const [score, setScore] = useState("");
  const resetModalAndAddScore = (score: number) => {
    if (isNaN(score)) return;
    setScore("");
    onAddScore(score, true);
  };
  const addScore = (score: number) => {
    if (isNaN(score)) return;
    setScore("");
    onAddScore(score, false);
  };
  return (
    <BaseModal visible={isOpen} onDismiss={onClose} title="">
      <TextInput
        keyboardType="decimal-pad"
        label="Score"
        autoFocus
        value={score}
        onChangeText={(text) => setScore(text)}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <IconButton
          icon="plus"
          variant="primary"
          onPress={() => addScore(Number.parseInt(score, 10))}
        />
        <IconButton
          icon="check"
          variant="tertiary"
          onPress={() => resetModalAndAddScore(Number.parseInt(score, 10))}
        />
      </View>
    </BaseModal>
  );
};
