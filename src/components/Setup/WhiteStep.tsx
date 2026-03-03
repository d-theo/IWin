import { Button, Surface, TextInput, useTheme, Text } from "react-native-paper";
import { AppTheme } from "../../theme/theme";
import { Dimensions, View } from "react-native";
import { Step } from "./types";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { throttle } from "lodash";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const WhiteStepItem = ({ index, onNext }: any) => {
  return (
    <View
      style={{
        width: SCREEN_WIDTH, // Garde ça, c'est ton ancre
        height: "100%",
        // ÉTAPE CRUCIALE : On dit au parent de centrer son enfant
        alignItems: "center",
        justifyContent: "flex-start", // Pour garder le contrôle sur le marginTop
        borderWidth: 1, // Garde une petite bordure rouge pour le test
        borderColor: "red",
      }}
    >
      <Surface
        style={{
          backgroundColor: "white",
          marginTop: 100,
          height: 250,
          width: 280, // Largeur fixe (plus petite que l'écran)
          borderRadius: 15,
          // On ne met PAS de margin ici, le parent s'en occupe avec alignItems
          elevation: 4,
          justifyContent: "center", // Centre le texte à l'intérieur
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>Étape {index + 1}</Text>

        <Button mode="contained" onPress={onNext}>
          Suivant
        </Button>
      </Surface>
    </View>
  );
};
