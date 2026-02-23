import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Game } from "../types/game";

type GameStore = {
  game: Game | null;
  createGame: (name: string, players: string[]) => void;
  addScore: (playerId: string, value: number) => void;
  endGame: () => void;
  deleteScore: (playerId: string, scoreId: string) => void;
  updateScore: (
    playerId: string,
    scoreId: string,
    value: number,
  ) => void;
  gamesHistory: Game[];
};


export const useGameStore = create(
  persist<GameStore>(
    (set, get) => ({
    game: null,
    gamesHistory: [],

    createGame:  (name, playerNames) => {
      const game: Game = {
        id: uuid.v4(),
        name,
        createdAt: Date.now(),
        players: playerNames.map((n) => ({
          id: uuid.v4(),
          name: n,
          scores: [],
        })),
      };
      set({ game });
    },

    addScore:  (playerId, value) => {
      const game = get().game;
      if (!game) return;

      const updated = {
        ...game,
        players: game.players.map((p) =>
          p.id === playerId
            ? {
                ...p,
                scores: [
                  ...p.scores,
                  { id: uuid.v4(), value, createdAt: Date.now() },
                ],
              }
            : p,
        ),
      };

      set({ game: updated });
    },

    endGame:  () => {

      const { game, gamesHistory } = get();
      if (!game) return;

      const updatedHistory = [game, ...gamesHistory];


      set({
        game: null,
        gamesHistory: updatedHistory,
      });
    },

    deleteScore: async (playerId, scoreId) => {
      const game = get().game;
      if (!game) return;

      const updated = {
        ...game,
        players: game.players.map((p) =>
          p.id === playerId
            ? {
                ...p,
                scores: p.scores.filter((s) => s.id !== scoreId),
              }
            : p,
        ),
      };

      set({ game: updated });
    },

    updateScore:  (playerId, scoreId, value) => {
      const game = get().game;
      if (!game) return;

      const updated = {
        ...game,
        players: game.players.map((p) =>
          p.id === playerId
            ? {
                ...p,
                scores: p.scores.map((s) =>
                  s.id === scoreId ? { ...s, value } : s,
                ),
              }
            : p,
        ),
      };

      set({ game: updated });
    },
  })
  ,
  {
    name: "game-storage",
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state): any => ({
      game: state.game,
      gamesHistory: state.gamesHistory,
    }),
  }),
);
