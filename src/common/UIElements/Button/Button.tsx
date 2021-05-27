import classes from './Button.module.css';
import React from 'react';

interface IProps {
  onClick?: Function;
  type?: 'submit' | 'button';
}

const Button: React.FC<IProps> = (props) => {
  const { onClick, type } = props;

  return (
    <button
      className={classes.button}
      type={type}
      onClick={onClick ? () => onClick() : undefined}
    >
      {props.children}
    </button>
  );
};

export default Button;
