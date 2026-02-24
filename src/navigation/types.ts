export type RootStackParamList = {
  Setup: {
    shouldSetup: boolean | undefined;
  };

  Game: undefined;

  GamesHistory: undefined

  History: {
    playerId: string;
  };

  EditScore: {
    playerId: string;
    scoreId: string;
  };
};
