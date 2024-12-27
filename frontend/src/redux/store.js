import userReducer from './userSlice';
import courseReducer from './courseSlice';
import quizReducer from './quizSlice'; // Import quizReducer
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  quiz: quizReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ensure compatibility with redux-persist
    }),
});

export const persistor = persistStore(store);
