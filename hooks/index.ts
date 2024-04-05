import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';

/**
 * A custom hook that wraps around `useDispatch` from `react-redux`.
 * It provides the dispatch function from the Redux store, typed with `AppDispatch` from our store configuration.
 * This ensures that any dispatched actions are type-checked at compile time.
 *
 * @returns {AppDispatch} The dispatch function from the Redux store.
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
