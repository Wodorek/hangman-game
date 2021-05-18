import { io } from 'socket.io-client';

const URL = 'http://localhost:3030';
const socket = io(URL, { autoConnect: false });

export default socket;

socket.onAny((event, ...args) => {
  console.log(event, args);
});
