import { useState } from "react";
import { View } from "react-native";
import {
  IconButton,
  MD3Colors,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddScore: (score: number) => void;
};

export const AddScore = ({ isOpen, onClose, onAddScore }: Props) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [score, setScore] = useState("");
  const resetModalAndAddScore = (score: number) => {
    setScore("");
    onAddScore(score);
  };
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={onClose}
        contentContainerStyle={containerStyle}
      >
        <TextInput
          keyboardType="decimal-pad"
          label="Score"
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
            icon="minus-circle"
            iconColor={MD3Colors.error50}
            size={20}
            onPress={() => resetModalAndAddScore(-Number.parseInt(score, 10))}
          />
          <IconButton
            icon="plus-circle"
            iconColor={MD3Colors.primary10}
            size={20}
            onPress={() => resetModalAndAddScore(Number.parseInt(score, 10))}
          />
        </View>
      </Modal>
    </Portal>
  );
};
