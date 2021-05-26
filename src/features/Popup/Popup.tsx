import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveRoomId } from '../Game/gameSlice';
import socket from '../socket/socket';
import classes from './Popup.module.css';

interface IProps {
  joiningUser: {
    username: string;
    id: string;
  };
  declineEntrance: Function;
}

const Popup: React.FC<IProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { username, id } = props.joiningUser;

  const acceptKnockingHandler = () => {
    dispatch(saveRoomId(socket.id));
    socket.emit('allow entrance', { userId: id });
    history.push('/game', { isHost: true });
  };

  return (
    <div className={classes.container}>
      <p className={classes.popupText}>
        {username} chce dołączyć do Twojej gry!
      </p>
      <div className={classes.buttonsGroup}>
        <button onClick={acceptKnockingHandler} className={classes.popupButton}>
          Akceptuj
        </button>
        <button className={classes.popupButton}>Odrzuć</button>
      </div>
    </div>
  );
};

export default Popup;
