import classes from './Guessing.module.css';
import React, { useEffect, useState } from 'react';
import LetterButton from '../LetterButton/LetterButton';
import socket from '../socket/socket';
import { RootStateOrAny, useSelector } from 'react-redux';
import GameOverScreen from '../GameOverScreen/GameOverScreen';

interface IProps {
  incorrectGuesses: number;
  guessIncorrect: Function;
}

interface IWord {
  letter: string;
  guessed: boolean;
}

const Guessing: React.FC<IProps> = (props) => {
  const [wordToGuess, setWordToGuess] = useState<IWord[]>([]);
  const [alreadyGuessed, setAlreadyGuessed] = useState<string[]>([]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const gameRoom = useSelector((state: RootStateOrAny) => state.game.roomId);
  const alphabeth = 'abcdefghijklmnopqrstuvwxyz';

  const checkForGameEnd = () => {
    //check for win first
    let alreadyWon = true;

    for (let letter of wordToGuess) {
      if (letter.guessed === false) {
        alreadyWon = false;
        break;
      }
    }

    if (alreadyWon) {
      socket.emit('game over', { won: true, roomId: gameRoom });
      return setWon(true);
    }

    //check for loss
    if (props.incorrectGuesses === 9) {
      socket.emit('game over', { won: false, roomId: gameRoom });
      return setLost(true);
    }
  };

  const guessLetterHandler = (letter: string) => {
    if (wordToGuess.length === 0) {
      return;
    }
    const lowercased = letter.toLowerCase();
    let guessCorrect = false;
    const afterGuess = wordToGuess.map((word: IWord) => {
      if (word.letter === lowercased) {
        guessCorrect = true;
        word.guessed = true;
      }
      return word;
    });
    if (!guessCorrect) {
      props.guessIncorrect((prev: number) => prev + 1);
    }
    socket.emit('pick letter', { letter: lowercased, roomId: gameRoom });
    setAlreadyGuessed((prev) => [...prev, letter]);
    setWordToGuess(afterGuess);
    checkForGameEnd();
    console.log(props.incorrectGuesses);
    console.log(guessCorrect);
  };

  useEffect(() => {
    const prepareWord = (word: string) => {
      const prepared: IWord[] = [];
      const lowercased = word.toLowerCase();
      lowercased.split(' ');
      lowercased.split('').forEach((letter) => {
        //spaces are guessed correctly from the start
        if (letter === ' ') {
          prepared.push({ letter, guessed: true });
        } else {
          prepared.push({ letter, guessed: false });
        }
      });
      setWordToGuess(prepared);
    };

    socket.on('word selected', (word) => {
      prepareWord(word);
    });

    socket.on('letter picked', (letter) => {
      console.log(letter);
    });

    socket.on('game reset', () => {
      console.log('guessing.tsx');
      setWordToGuess([]);
      setAlreadyGuessed([]);
      setWon(false);
      setLost(false);
    });

    return () => {
      socket.off('letter picked');
      socket.off('word selected');
    };
  }, []);
  return (
    <div>
      {!won && !lost ? (
        <>
          {wordToGuess.length > 0 ? (
            <div className={classes.wordToGuess}>
              {wordToGuess.map((el: any, idx) => {
                if (el.letter === ' ') {
                  return (
                    <p
                      key={`${el.letter}${idx}`}
                      className={classes.wordLetter}
                    >
                      &nbsp;
                    </p>
                  );
                }
                if (el.guessed === false) {
                  return (
                    <p
                      key={`${el.letter}${idx}`}
                      className={classes.wordLetter}
                    >
                      _
                    </p>
                  );
                }
                return (
                  <p key={`${el.letter}${idx}`} className={classes.wordLetter}>
                    {el.letter}
                  </p>
                );
              })}
            </div>
          ) : (
            <div>Czekej</div>
          )}

          <div className={classes.buttonsContainer}>
            {alphabeth.split('').map((el) => {
              return (
                <LetterButton
                  alreadyGuessed={alreadyGuessed}
                  key={el}
                  letter={el}
                  select={() => guessLetterHandler(el)}
                />
              );
            })}
          </div>
        </>
      ) : (
        <GameOverScreen won={won ? true : false} />
      )}
    </div>
  );
};

export default Guessing;
