export type ScoreEntry = {
  id: string;
  value: number;
  createdAt: number;
};

export type Player = {
  id: string;
  name: string;
  scores: ScoreEntry[];
};

export type Game = {
  id: string;
  name: string;
  createdAt: number;
  players: Player[];
};
