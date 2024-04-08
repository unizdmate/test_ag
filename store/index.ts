import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistReducer from 'redux-persist/lib/persistReducer';
import {usersReducer} from './slices/users';

/**
 * Configuration object for redux-persist.
 * Defines how the state should be persisted and rehydrated.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['users'],
  throttle: 1000,
  debug: false,
};

/**
 * The root reducer of the application.
 * It combines all the reducers of the application into a single reducer function.
 * The state produced by rootReducer is persisted using redux-persist.
 */
const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    users: usersReducer,
    // Add more reducers here if needed
  }),
);

/**
 * The Redux store of the application.
 * It is configured with the root reducer and middleware.
 * The middleware is configured to ignore certain actions for serializability checks.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

//Uncomment the following line to purge state from storage in development
//persistor.purge();
