import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND as string, {
  autoConnect: false,
});

export default socket;
