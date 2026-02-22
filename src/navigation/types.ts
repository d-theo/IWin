export type RootStackParamList = {
  Setup: undefined;

  Game: undefined;

  History: {
    playerId: string;
  };

  EditScore: {
    playerId: string;
    scoreId: string;
  };
};
