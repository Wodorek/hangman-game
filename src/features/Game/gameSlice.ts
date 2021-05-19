import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    roomId: '',
  },
  reducers: {
    saveRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { saveRoomId } = gameSlice.actions;

export default gameSlice.reducer;
