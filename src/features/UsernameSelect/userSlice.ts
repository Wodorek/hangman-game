import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
  },
  reducers: {
    selectUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { selectUsername } = userSlice.actions;

export default userSlice.reducer;
