import React, { useEffect, useState } from 'react';
import Guessing from '../Guessing/Guessing';
import Hangman from '../Hangman/Hangman';
import WordSelect from '../WordSelect/WordSelect';
import socket from '../socket/socket';
import { useHistory, useLocation } from 'react-router-dom';
import GameOverScreen from '../GameOverScreen/GameOverScreen';
import penStroke from '../../sounds/penStroke.mp3';
import useSound from 'use-sound';

interface LocationState {
  isHost: boolean;
}

const Game = () => {
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [word, setWord] = useState('');
  const [play] = useSound(penStroke);

  const location = useLocation<LocationState>();
  const history = useHistory();

  const incorrectGuessHandler = () => {
    setIncorrectGuesses((prev) => prev + 1);
    play();
  };

  console.log(isHost);

  useEffect(() => {
    if (location.state === undefined) {
      return history.replace('/');
    }

    if (isHost === null) {
      setIsHost(location.state.isHost);
    }

    socket.on('game over', (won: boolean) => {
      setGameOver(true);
      setGuessedCorrectly(won);
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
        isHost={isHost}
        guessedCorrectly={guessedCorrectly}
        word={word}
        gameOver={gameOver}
        incorrectGuesses={incorrectGuesses}
      />
      {isHost ? (
        <>
          {gameOver ? <GameOverScreen /> : <WordSelect gameOver={gameOver} />}
          {word.length > 0 ? (
            <div>
              <p>You selected: </p>
              <h3>{word}</h3>
            </div>
          ) : null}
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
