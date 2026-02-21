import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useGameStore } from "../store/gameStore";

export default function EditScoreModal({ route, navigation }: any) {
  const { playerId, scoreId } = route.params;

  const game = useGameStore((s) => s.game);
  const updateScore = useGameStore((s) => s.updateScore);

  const player = game?.players.find((p) => p.id === playerId);
  const score = player?.scores.find((s) => s.id === scoreId);

  const [value, setValue] = useState(score ? String(score.value) : "");

  const save = async () => {
    await updateScore(playerId, scoreId, Number(value));
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        label="Score"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <Button mode="contained" onPress={save}>
        Sauvegarder
      </Button>
    </View>
  );
}
