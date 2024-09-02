# Guess the Number Game 🎲

[Play the Game](https://alina-guess-number.netlify.app)

## 📹 Video Preview

[![Watch the video](https://img.youtube.com/vi/l3zCP87VFII/0.jpg)](https://youtu.be/l3zCP87VFII)

## 📋 Objective

Welcome to the Guess the Number game! This is a thrilling game based on random number generation, where each round offers a new challenge. The objective is simple: observe the rising Multiplier value, predict when it will freeze, and place your points based on that prediction.

### How to Win

- At the start of each round, every player receives an equal amount of starting points.
- Your task is to guess when the Multiplier will freeze.
- If you guess correctly, you'll win the round and earn points calculated by multiplying the points you placed by the Multiplier (Points x Multiplier).
- If you guess wrong, you lose the points you placed.

## 🎮 Game Mechanics

### Game Board

The game board features a dynamic line graph that represents the Multiplier value's increase during each round. Keep an eye on this to make your prediction!

### Player Inputs

- **Points**: Decide how many points you want to place on your guess.
- **Multiplier**: Predict the value at which the Multiplier will freeze.

### Current Round

A table displays all active players in the current round, showing their respective guesses and points.

### Ranking

Check out the leaderboard! The Ranking table displays the total points of all players, reflecting their performance across all rounds.

### Chat

Communicate with other players in real-time using the chat box. Share strategies, celebrate victories, or simply chat during the game.

## 🚀 Getting Started

To start playing locally, follow these steps:

## Frontend

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the application:**
   ```bash
   npm run build
   ```
4. **Create .env file and put URL**:
   ```bash
   NEXT_PUBLIC_SERVER_URL=
   ```
5. **Run:**
   ```bash
   npm run dev
   ```

## Backend

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the application:**
   ```bash
   npm run build
   ```
4. **Create .env file and put URLs**:
   ```bash
   PORT=
   CLIENT_URL=
   DATABASE_URL=
   ```
5. Create and fill in the database with
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run prisma:seed
   ```
6. **Run:**
   ```bash
   npm run start:dev
   ```
