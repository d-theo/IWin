import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SetupModal } from "../components/SetupModal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;

export default function SetupScreen({ navigation }: Props) {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <SetupModal onDismiss={() => setVisible(false)} visible={visible} />
      <Button mode="contained" onPress={() => setVisible(true)}>
        Démarrer
      </Button>
    </View>
  );
}
