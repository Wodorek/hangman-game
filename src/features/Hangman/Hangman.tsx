import classes from './Hangman.module.css';
import React from 'react';

interface IProps {
  incorrectGuesses: number;
}

const Hangman: React.FC<IProps> = (props) => {
  //I really backed myself into a corner with how I chose to display the "parts"
  //Redo this later?

  const { incorrectGuesses } = props;

  return (
    <div className={classes.container}>
      <div
        className={`${classes.leg} ${classes.legLeft} ${
          incorrectGuesses < 10 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.leg} ${incorrectGuesses < 9 ? classes.hide : ''}`}
      ></div>
      <div
        className={`${classes.arm} ${incorrectGuesses < 8 ? classes.hide : ''}`}
      ></div>
      <div
        className={`${classes.arm} ${classes.armLeft} ${
          incorrectGuesses < 7 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.torso} ${
          incorrectGuesses < 6 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.head} ${
          incorrectGuesses < 5 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.rope} ${
          incorrectGuesses < 4 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.support} ${
          incorrectGuesses < 3 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.pole} ${
          incorrectGuesses < 2 ? classes.hide : ''
        }`}
      ></div>
      <div
        className={`${classes.stand} ${
          incorrectGuesses < 1 ? classes.hide : ''
        }`}
      ></div>
    </div>
  );
};

export default Hangman;
