export type RootStackParamList = {
  Home: {
    shouldSetupNewGame: boolean | undefined;
  };

  Setup: undefined;

  Game: {
    readonly: boolean;
    gameId: string;
  };

  GamesHistory: undefined;

  ScoresHistory: {
    playerId: string;
  };

  EditScore: {
    playerId: string;
    scoreId: string;
  };
};
