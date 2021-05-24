import React, { useEffect, useState } from 'react';
import Guessing from '../Guessing/Guessing';
import Hangman from '../Hangman/Hangman';
import WordSelect from '../WordSelect/WordSelect';
import socket from '../socket/socket';
import { useLocation } from 'react-router-dom';

interface LocationState {
  isHost: boolean;
}

const Game = () => {
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const [word, setWord] = useState('');
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const location = useLocation<LocationState>();

  const incorrectGuessHandler = () => {
    setIncorrectGuesses((prev) => prev + 1);
  };

  useEffect(() => {
    if (isHost === null) {
      setIsHost(location.state.isHost);
    }

    socket.on('game reset', (swap) => {
      if (swap) {
        setIsHost((prev) => !prev);
        setIncorrectGuesses(0);
      }
    });

    return () => {
      socket.off('game reset');
    };
  }, [isHost, location.state.isHost]);

  return (
    <div>
      <Hangman incorrectGuesses={incorrectGuesses} />
      {isHost ? (
        <WordSelect selectWord={(word: string) => setWord(word)} />
      ) : (
        <Guessing
          guessIncorrect={() => incorrectGuessHandler()}
          incorrectGuesses={incorrectGuesses}
        />
      )}
    </div>
  );
};

export default Game;
