import { Game } from "../types/game";

export type RootStackParamList = {
  Setup: {
    shouldSetup: boolean | undefined;
  };

  Game: {
    readonly: boolean;
    game: Game;
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
