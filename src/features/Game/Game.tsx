import React, { useEffect, useState } from 'react';
import Guessing from '../Guessing/Guessing';
import Hangman from '../Hangman/Hangman';
import WordSelect from '../WordSelect/WordSelect';
import socket from '../socket/socket';
import { useHistory, useLocation } from 'react-router-dom';
import GameOverScreen from '../GameOverScreen/GameOverScreen';

interface LocationState {
  isHost: boolean;
}

const Game = () => {
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [word, setWord] = useState('');

  const location = useLocation<LocationState>();
  const history = useHistory();

  const incorrectGuessHandler = () => {
    setIncorrectGuesses((prev) => prev + 1);
  };

  console.log(isHost);

  useEffect(() => {
    if (location.state === undefined) {
      return history.replace('/');
    }

    if (isHost === null) {
      setIsHost(location.state.isHost);
    }

    socket.on('game over', (won) => {
      setGameOver(true);
    });

    socket.on('game reset', (swap) => {
      console.log('game resetting / game');
      if (swap) {
        setIsHost((prev) => !prev);
      }
      setWord('');
      setIncorrectGuesses(0);
      setGameOver(false);
    });

    socket.on('word select', (word) => {
      setWord(word);
    });

    return () => {
      socket.off('word select');
      socket.off('game over');
      socket.off('game reset');
    };
  }, [history, isHost, location.state]);

  return (
    <div>
      <Hangman
        word={word}
        gameOver={gameOver}
        incorrectGuesses={incorrectGuesses}
      />
      {isHost ? (
        <>
          {gameOver ? <GameOverScreen /> : <WordSelect gameOver={gameOver} />}
        </>
      ) : (
        <Guessing
          word={word}
          gameOver={gameOver}
          guessIncorrect={() => incorrectGuessHandler()}
          incorrectGuesses={incorrectGuesses}
        />
      )}
    </div>
  );
};

export default Game;
