# 🏆 IWin

> No pen, no paper — IWin keeps the score for you.

A mobile score tracking app for board games, card games, or any multiplayer game.

---

## 📸 Screenshots

<p align="center">
    <img src="https://github.com/d-theo/IWin/blob/main/assets/p1.jpg" height="300">
    <img src="https://github.com/d-theo/IWin/blob/main/assets/p2.jpg" height="300">
    <img src="https://github.com/d-theo/IWin/blob/main/assets/p3.jpg" height="300">
</p>

---

## ✨ Features

- 🎮 **Game setup** — Name your game and add up to 7 players
- ➕ **Score tracking** — Add positive or negative points during the game
- ✏️ **Edit / delete** — Update or remove any score entry at any time
- 📜 **Game history** — Browse all your past games with the winner highlighted
- 🌍 **Multilingual** — English and French (auto-detected from device language)

---

## 🛠️ Stack

| Technology | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) | Mobile framework |
| [React Native Paper](https://reactnativepaper.com/) | UI components (Material Design 3) |
| [Zustand](https://zustand-demo.pmnd.rs/) + AsyncStorage | State management & persistence |
| [React Navigation](https://reactnavigation.org/) | Screen navigation |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Animations |
| [i18next](https://www.i18next.com/) | Internationalisation |
| [date-fns](https://date-fns.org/) | Date formatting |
| TypeScript | Static typing |

---

## 🚀 Getting started

**Prerequisites:** Node.js

```bash
npm install
npm start
```

Scan the QR code with [Expo Go](https://expo.dev/go) on your phone.

---

## 📦 Build APK

This project uses [EAS Build](https://docs.expo.dev/build/introduction/).

```bash
npm install -g eas-cli
eas build -p android --profile preview
```

---

## 📁 Project structure

```
src/
├── components/       # Reusable components
│   ├── atoms/        # Base components (IconButton)
│   └── Setup/        # Game creation flow
├── navigation/       # React Navigation setup
├── screens/          # App screens
├── store/            # Zustand store
├── theme/            # Global theme (colors, spacing, typography)
├── translations/     # i18n files (en, fr)
└── types/            # Shared TypeScript types
```

