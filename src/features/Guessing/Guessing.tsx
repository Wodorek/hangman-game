import classes from './Guessing.module.css';
import React, { useEffect, useState } from 'react';
import LetterButton from '../LetterButton/LetterButton';
import socket from '../socket/socket';
import { RootStateOrAny, useSelector } from 'react-redux';

interface IProps {
  incorrectGuesses: number;
  gameOver: boolean;
  word: string;
}

interface IWord {
  letter: string;
  guessed: boolean;
}

const Guessing: React.FC<IProps> = (props) => {
  const [wordToGuess, setWordToGuess] = useState<IWord[]>([]);

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
    }

    //check for loss
    if (props.incorrectGuesses === 9) {
      socket.emit('game over', { won: false, roomId: gameRoom });
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

    socket.emit('pick letter', {
      letter: letter,
      correct: guessCorrect,
      roomId: gameRoom,
    });
    setWordToGuess(afterGuess);
    checkForGameEnd();
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

    prepareWord(props.word);
  }, [props.word]);

  return (
    <div>
      {wordToGuess.length > 0 ? (
        <div className={classes.wordToGuess}>
          {wordToGuess.map((el: any, idx) => {
            if (el.letter === ' ') {
              return (
                <p key={`${el.letter}${idx}`} className={classes.wordLetter}>
                  &nbsp;
                </p>
              );
            }
            if (el.guessed === false) {
              return (
                <p key={`${el.letter}${idx}`} className={classes.wordLetter}>
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
        <div className={classes.placeholder}>
          <h2>Please wait for the word to be selected</h2>
        </div>
      )}
      <div className={classes.buttonsContainer}>
        {alphabeth.split('').map((el) => {
          return (
            <LetterButton
              gameOver={props.gameOver}
              word={props.word}
              key={el}
              letter={el}
              select={() => guessLetterHandler(el)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Guessing;
