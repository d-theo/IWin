export type RootStackParamList = {
  Setup: {
    shouldSetupNewGame: boolean | undefined;
  };

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
