import classes from './Guessing.module.css';
import React, { useEffect, useState } from 'react';
import LetterButton from '../LetterButton/LetterButton';

interface IProps {
  word: string;
  incorrectGuesses: number;
  guessIncorrect: Function;
  won: boolean;
  lost: boolean;
  setWon: Function;
  setLost: Function;
}

interface IWord {
  letter: string;
  guessed: boolean;
}

const Guessing: React.FC<IProps> = (props) => {
  const [wordToGuess, setWordToGuess] = useState<IWord[]>([]);
  const [alreadyGuessed, setAlreadyGuessed] = useState<string[]>([]);

  const alphabeth = 'abcdefghijklmnopqrstuvwxyz';

  const { word } = props;

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
      props.setWon(true);
    }

    //check for loss
    if (props.incorrectGuesses === 6) {
      return props.setLost(true);
    }
  };

  const guessLetterHandler = (letter: string) => {
    if (!word) {
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
    prepareWord(word);
  }, [word]);

  return (
    <div>
      {!props.won && !props.lost ? (
        <>
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
          <div className={classes.buttonsContainer}>
            {alphabeth.split('').map((el) => {
              return (
                <LetterButton
                  alreadyGuessed={alreadyGuessed}
                  word={word}
                  key={el}
                  letter={el}
                  select={() => guessLetterHandler(el)}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Guessing;
