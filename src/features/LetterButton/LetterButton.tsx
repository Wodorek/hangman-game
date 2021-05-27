import React, { useEffect, useState } from 'react';
import { crossedOutSvgs } from '../../common/UIElements/CrossedOutSvgs';

import classes from './LetterButton.module.css';

interface IProps {
  letter: string;
  select: Function;
  word: string;
  gameOver: boolean;
}

const LetterButton: React.FC<IProps> = (props) => {
  const [disabled, setDisabled] = useState(false);
  const [randInt, setRandInt] = useState(0);

  const letterSelectHandler = () => {
    props.select();
    setDisabled(true);
  };

  useEffect(() => {
    setDisabled(false);
    setRandInt(Math.floor(Math.random() * crossedOutSvgs.length));
  }, [props.word]);

  return (
    <div>
      {disabled ? (
        <svg
          className={`${classes.crossed}`}
          id={crossedOutSvgs[randInt].id}
          viewBox={crossedOutSvgs[randInt].viewBox}
        >
          <path d={crossedOutSvgs[randInt].d} fill="#ed1c24" />
        </svg>
      ) : null}

      <button
        disabled={props.word.length === 0 || disabled || props.gameOver}
        className={`${classes.container} ${
          disabled || props.word.length === 0 || props.gameOver
            ? classes.disabled
            : ''
        }`}
        onClick={() => letterSelectHandler()}
      >
        <div className={classes.letter}>{props.letter}</div>
      </button>
    </div>
  );
};

export default LetterButton;
