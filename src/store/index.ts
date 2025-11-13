import { configureStore } from '@reduxjs/toolkit';
import talentsReducer from '../features/talentsSlice';

export const store = configureStore({
  reducer: {
    talents: talentsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;