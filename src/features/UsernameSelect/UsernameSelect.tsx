import React, { useEffect, useState } from 'react';
import classes from './UsernameSelect.module.css';
import socket from '../socket/socket';
import { useDispatch } from 'react-redux';
import { selectUsername } from './userSlice';
import { useHistory } from 'react-router-dom';
import Hangman from '../Hangman/Hangman';

const UsernameSelect = () => {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('username', username);
    socket.auth = { username };
    socket.connect();
    dispatch(selectUsername(username));
    history.push('/lobby');
  };

  useEffect(() => {
    const existingUsername = localStorage.getItem('username');

    if (existingUsername) {
      setUsername(existingUsername);
    }
  }, []);

  return (
    // <div
    //   onSubmit={(event) => submitHandler(event)}
    //   className={classes.container}
    // >
    //   <form className={classes.form}>
    //     <label htmlFor="username">Twoja nazwa</label>
    //     <input
    //       required
    //       id="username"
    //       value={username}
    //       onChange={(event) => setUsername((prev) => event.target.value)}
    //     />
    //     <button type="submit">Wybierz</button>
    //   </form>
    // </div>
    <Hangman incorrectGuesses={12} gameOver={false} word={'michal'} />
  );
};

export default UsernameSelect;
