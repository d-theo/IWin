import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import BaseModal from "./BaseModal";
import { IconButton } from "./atoms/IconButton";

export type AddScoreOption = {
  shouldCloseModal: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddScore: (score: number, { shouldCloseModal }: AddScoreOption) => void;
};

export const AddScore = ({ isOpen, onClose, onAddScore }: Props) => {
  const [score, setScore] = useState("");
  const closeModalAndAddScore = (score: number) => {
    if (isNaN(score)) {
      onClose();
    } else {
      setScore("");
      onAddScore(score, { shouldCloseModal: true });
    }
  };
  const addScore = (score: number) => {
    if (isNaN(score)) return;
    setScore("");
    onAddScore(score, { shouldCloseModal: false });
  };
  return (
    <BaseModal visible={isOpen} onDismiss={onClose}>
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
          onPress={() => closeModalAndAddScore(Number.parseInt(score, 10))}
        />
      </View>
    </BaseModal>
  );
};
