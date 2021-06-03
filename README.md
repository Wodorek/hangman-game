# Knowyourvocab

A real time, two player version of the classing word guessing game Hangman.

For the backend see: [hangman-back](https://github.com/Wodorek/hangman-back)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

A real time, two player version of the classic word guessing game Hangman.

This version makes use of websockets technology, to allow connecting players into rooms, and notifying both players about selected word, and letter selections as quick as possible and without refreshing the page, in real time.

Other that that, it plays like any other hangman version.

## Technologies used

- [React](https://github.com/facebook/react) v17.0.2
- [Typescript](https://github.com/microsoft/TypeScript) v4.2.4
- [Socket.io-client](https://github.com/socketio/socket.io-client) v4.1.2

## Setup

To run this project locally, clone it and install using npm:

```
$cd ../hangman-game
$npm install
$npm start
```

Note: For the game to work, you will also need the backend part: [hangman-back](https://github.com/Wodorek/hangman-back), and a .env file with **REACT_APP_BACKEND** variable, pointing to the backend URL.
