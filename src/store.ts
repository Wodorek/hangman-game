import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UsernameSelect/userSlice';
import gameReducer from './features/Game/gameSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});
