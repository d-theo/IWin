import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SetupModal } from "../components/Setup/SetupModal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;

export default function SetupScreen({ route, navigation }: Props) {
  const shouldCreateGame = route.params.shouldSetup ?? true;
  const [visible, setVisible] = useState(shouldCreateGame);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SetupModal onDismiss={() => setVisible(false)} visible={visible} />
      <Button mode="contained" onPress={() => setVisible(true)}>
        Démarrer
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Game")}>
        Voir vos parties précédentes
      </Button>
    </View>
  );
}
