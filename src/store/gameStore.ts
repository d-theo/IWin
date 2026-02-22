import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Game } from "../types/game";

type GameStore = {
  game: Game | null;
  loadGame: () => Promise<void>;
  createGame: (name: string, players: string[]) => Promise<void>;
  addScore: (playerId: string, value: number) => Promise<void>;
  endGame: () => Promise<void>;
  deleteScore: (playerId: string, scoreId: string) => Promise<void>;
  updateScore: (
    playerId: string,
    scoreId: string,
    value: number,
  ) => Promise<void>;
  gamesHistory: Game[];
};

const ACTIVE_KEY = "active_game";
const HISTORY_KEY = "past_games";

export const useGameStore = create<GameStore>((set, get) => ({
  game: null,
  gamesHistory: [],

  loadGame: async () => {
    const active = await AsyncStorage.getItem(ACTIVE_KEY);
    const history = await AsyncStorage.getItem(HISTORY_KEY);

    set({
      game: active ? JSON.parse(active) : null,
      gamesHistory: history ? JSON.parse(history) : [],
    });

    const raw = await AsyncStorage.getItem(ACTIVE_KEY);
    if (raw) set({ game: JSON.parse(raw) });
  },

  createGame: async (name, playerNames) => {
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
    await AsyncStorage.setItem(ACTIVE_KEY, JSON.stringify(game));
    set({ game });
  },

  addScore: async (playerId, value) => {
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

    await AsyncStorage.setItem(ACTIVE_KEY, JSON.stringify(updated));
    set({ game: updated });
  },

  endGame: async () => {
    await AsyncStorage.removeItem(ACTIVE_KEY);

    const { game, gamesHistory } = get();
    if (!game) return;

    const updatedHistory = [game, ...gamesHistory];

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    await AsyncStorage.removeItem(ACTIVE_KEY);

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

    await AsyncStorage.setItem(ACTIVE_KEY, JSON.stringify(updated));
    set({ game: updated });
  },

  updateScore: async (playerId, scoreId, value) => {
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

    await AsyncStorage.setItem(ACTIVE_KEY, JSON.stringify(updated));
    set({ game: updated });
  },
}));
