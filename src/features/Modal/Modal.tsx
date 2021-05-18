import React from 'react';
import socket from '../socket/socket';
import classes from './Modal.module.css';

interface IProps {
  joiningUser: {
    username: string;
    id: string;
  };
}

const Modal: React.FC<IProps> = (props) => {
  const acceptKnockingHandler = () => {
    socket.emit('allow entrance', { userId: props.joiningUser.id });
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalInner}>
        <div
          className={classes.messageContainer}
        >{`${props.joiningUser.username} chce dołączyć do Twojej gry!`}</div>
        <div className={classes.buttonsGroup}>
          <button onClick={acceptKnockingHandler}>Akceptuj</button>
          <button>Odrzuć</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
