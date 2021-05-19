import classes from './Guessing.module.css';
import React, { useEffect, useState } from 'react';
import LetterButton from '../LetterButton/LetterButton';

interface IProps {
  word: string;
}

const Guessing: React.FC<IProps> = (props) => {
  const [wordToGuess, setWordToGuess] = useState<{}[]>([]);
  const [letter, setLetter] = useState('');
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [alreadyGuessed, setAlreadyGuessed] = useState<string[]>([]);

  const alphabeth = 'abcdefghijklmnopqrstuvwxyz';

  console.log(incorrectGuesses);

  console.log(wordToGuess);

  const { word } = props;

  const guessLetterHandler = (letter: string) => {
    const lowercased = letter.toLowerCase();
    let guessCorrect = false;
    const afterGuess = wordToGuess.map((word: any) => {
      if (word.letter === lowercased) {
        guessCorrect = true;
        word.guessed = true;
      }
      return word;
    });
    if (!guessCorrect) {
      setIncorrectGuesses((prev) => prev + 1);
    }
    setAlreadyGuessed((prev) => [...prev, letter]);
    setWordToGuess(afterGuess);
  };

  useEffect(() => {
    const prepareWord = (word: string) => {
      const prepared: React.SetStateAction<{}[]> = [];
      const lowercased = word.toLowerCase();
      lowercased.split(' ');
      lowercased.split('').forEach((letter) => {
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
      <button onClick={() => guessLetterHandler(letter)}>Wybierz</button>
      <div className={classes.wordToGuess}>
        {wordToGuess.map((el: any) => {
          if (el.letter === ' ') {
            return <p className={classes.wordLetter}>&nbsp;</p>;
          }
          if (el.guessed === false) {
            return <p className={classes.wordLetter}>_</p>;
          }
          return <p className={classes.wordLetter}>{el.letter}</p>;
        })}
      </div>
      <div className={classes.buttonsContainer}>
        {alphabeth.split('').map((el) => {
          return (
            <LetterButton letter={el} select={() => guessLetterHandler(el)} />
          );
        })}
      </div>
    </div>
  );
};

export default Guessing;
