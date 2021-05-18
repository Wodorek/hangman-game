import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UsernameSelect/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
