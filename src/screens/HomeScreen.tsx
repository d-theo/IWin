import React from "react";
import { Button, Surface, useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useTranslation } from "react-i18next";
import { useGameStore } from "../store/gameStore";
import { AppTheme } from "../theme/theme";
import { Image } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme<AppTheme>();
  const { t } = useTranslation();
  const game = useGameStore((s) => s.game);

  if (game) {
    navigation.replace("Game", { readonly: false, gameId: game.id });
  }

  return (
    <Surface
      style={{
        flex: 1,
        alignItems: "center",
        gap: theme.spacing.l,
        paddingTop: "30%",
        backgroundColor: theme.colors.background,
      }}
    >
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../../assets/iconMenu.png")}
      />
      <Button mode="contained" onPress={() => navigation.replace("Setup")}>
        {t("app.startGame")}
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("GamesHistory")}
      >
        {t("app.seePreviousGame")}
      </Button>
    </Surface>
  );
}
