import { Game } from "../types/game";

export type RootStackParamList = {
  Setup: {
    shouldSetupNewGame: boolean | undefined;
  };

  Game: {
    readonly: boolean;
    gameId: string;
  };

  GamesHistory: undefined;

  History: {
    playerId: string;
  };

  EditScore: {
    playerId: string;
    scoreId: string;
  };
};
