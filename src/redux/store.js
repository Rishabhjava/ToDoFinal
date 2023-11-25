import { configureStore, combineReducers } from '@reduxjs/toolkit';
import boardsSlice from './boardsSlice';
import themeSlice from './themeSlice';

// Define a special action type for loading the entire state
const LOAD_ENTIRE_STATE = 'loadEntireState';

// Combine your existing reducers
const combinedReducer = combineReducers({
  boards: boardsSlice.reducer,
  theme: themeSlice.reducer,
  // ... add other slice reducers here as needed
});

// Create a new root reducer
const rootReducer = (state, action) => {
  // Check if this action is the one to load the entire state
  if (action.type === LOAD_ENTIRE_STATE) {
    // Replace the entire state with the payload
    return action.payload;
  }
  // For all other actions, use the combined reducers
  return combinedReducer(state, action);
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer
});

// Export an action creator for loading the entire state
export const loadEntireState = (newState) => ({
  type: LOAD_ENTIRE_STATE,
  payload: newState,
});

export default store;
