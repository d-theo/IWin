import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SetupModal } from "../components/SetupModal";

export default function SetupScreen() {
  const [visible, setVisible] = useState(true);

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SetupModal onDismiss={() => setVisible(false)} visible={visible} />
      <Button mode="contained" onPress={() => setVisible(true)}>
        Démarrer
      </Button>
    </View>
  );
}
