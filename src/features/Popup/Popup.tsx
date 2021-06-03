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
      <p className={classes.popupText}>{username} wants to join your game!</p>
      <div className={classes.buttonsGroup}>
        <button onClick={acceptKnockingHandler} className={classes.popupButton}>
          Accept
        </button>
        <button
          onClick={() => props.declineEntrance()}
          className={classes.popupButton}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Popup;
