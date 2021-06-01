import { useHistory } from 'react-router';
import socket from '../../features/socket/socket';

function useConnectionState() {
  const history = useHistory();

  const checkConnection = () => {
    if (!socket.connected) {
      alert('seems like you got disconnected, please reconnect');
      history.replace('/');
    }
  };
  return checkConnection;
}

export default useConnectionState;
