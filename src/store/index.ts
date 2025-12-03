import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';

// Middleware to save state to localStorage
const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  
  // Save filters state to localStorage after each action
  if (action.type?.startsWith('filters/')) {
    try {
      const state = store.getState();
      localStorage.setItem('filters', JSON.stringify(state.filters));
    } catch (err) {
      console.error('Failed to save state to localStorage:', err);
    }
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
