import React, { useEffect, useState } from 'react';
import classes from './UsernameSelect.module.css';
import socket from '../socket/socket';
import { useDispatch } from 'react-redux';
import { selectUsername } from './userSlice';
import { useHistory } from 'react-router-dom';
import Button from '../../common/UIElements/Button/Button';

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
    <div className={classes.container}>
      <h1 className={classes.txtCenter}>Welcome to hangman!</h1>
      <form onSubmit={(event) => submitHandler(event)} className={classes.form}>
        <label className={classes.txtCenter} htmlFor="username">
          To start, first select your username:
        </label>
        <input
          className={classes.txtCenter}
          required
          id="username"
          value={username}
          onChange={(event) => setUsername((prev) => event.target.value)}
        />
        <Button type="submit">Select</Button>
      </form>
    </div>
  );
};

export default UsernameSelect;
