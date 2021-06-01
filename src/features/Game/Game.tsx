import React, { useEffect, useState } from 'react';
import Guessing from '../Guessing/Guessing';
import Hangman from '../Hangman/Hangman';
import WordSelect from '../WordSelect/WordSelect';
import socket from '../socket/socket';
import { useHistory, useLocation } from 'react-router-dom';
import GameOverScreen from '../GameOverScreen/GameOverScreen';
import penStroke from '../../sounds/penStroke.mp3';
import useSound from 'use-sound';
import useConnectionState from '../../common/hooks/useConnectionState';

interface LocationState {
  isHost: boolean;
}

const Game = () => {
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [word, setWord] = useState('');
  const [play] = useSound(penStroke);
  const checkConnection = useConnectionState();

  const location = useLocation<LocationState>();
  const history = useHistory();

  useEffect(() => {
    if (location.state === undefined) {
      return history.replace('/');
    }

    if (isHost === null) {
      setIsHost(location.state.isHost);
    }

    checkConnection();

    socket.on('user disconnected', () => {
      alert(
        'Whoops, seems like your opponent left, or got disconnected, please create a new game'
      );
      history.push('/lobby');
    });

    socket.on('game over', (won: boolean) => {
      setGameOver(true);
      setGuessedCorrectly(won);
    });

    socket.on('game reset', (swap) => {
      if (swap) {
        setIsHost((prev) => !prev);
      }
      setWord('');
      setIncorrectGuesses(0);
      setGameOver(false);
      setGuessedLetters([]);
    });

    socket.on('word select', (word) => {
      setWord(word);
    });

    socket.on('pick letter', ({ letter, correct }) => {
      console.log(correct);
      if (!correct) {
        play();
        setIncorrectGuesses((prev) => prev + 1);
      }
      setGuessedLetters((prev) => [...prev, letter]);
    });

    return () => {
      socket.off('word select');
      socket.off('game over');
      socket.off('game reset');
      socket.off('pick letter');
      socket.off('user disconnected');
    };
  }, [
    checkConnection,
    history,
    incorrectGuesses,
    isHost,
    location.state,
    play,
  ]);

  return (
    <div>
      <Hangman
        isHost={isHost}
        guessedCorrectly={guessedCorrectly}
        word={word}
        gameOver={gameOver}
        incorrectGuesses={incorrectGuesses}
      />
      {isHost ? (
        <>
          {gameOver ? (
            <GameOverScreen />
          ) : (
            <WordSelect
              guessedLetters={guessedLetters}
              word={word}
              gameOver={gameOver}
            />
          )}
        </>
      ) : (
        <Guessing
          word={word}
          gameOver={gameOver}
          incorrectGuesses={incorrectGuesses}
        />
      )}
    </div>
  );
};

export default Game;
