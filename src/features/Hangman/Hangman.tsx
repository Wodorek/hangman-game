import classes from './Hangman.module.css';
import React, { useEffect, useState } from 'react';
import socket from '../socket/socket';

interface IProps {
  incorrectGuesses: number;
  gameOver: boolean;
  word: string;
}

const Hangman: React.FC<IProps> = (props) => {
  //I really backed myself into a corner with how I chose to display the "parts"
  //Redo this later?

  const { incorrectGuesses, gameOver } = props;

  return (
    <div className={classes.container}>
      {!gameOver ? (
        <>
          <div
            className={`${classes.leg} ${classes.legLeft} ${
              incorrectGuesses < 10 ? classes.hide : ''
            }`}
          ></div>
          <div
            className={`${classes.leg} ${
              incorrectGuesses < 9 ? classes.hide : ''
            }`}
          ></div>
          <div
            className={`${classes.arm} ${
              incorrectGuesses < 8 ? classes.hide : ''
            }`}
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
        </>
      ) : (
        <>
          <h1 className={classes.endMessage}>Zgadłeś !</h1>
          <p>{gameOver ? props.word : null}</p>
        </>
      )}
    </div>
  );
};

export default Hangman;
