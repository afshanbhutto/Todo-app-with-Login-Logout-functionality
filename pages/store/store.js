// store/store.js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../store/reducers/todoReducer';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, REMOVE_ALL_TODOS } from './actions/types';

const middlewares = [thunkMiddleware];

export const initializeStore = () => {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  store.subscribe(() => {
    const { todos } = store.getState();
    saveState({
      todos
    });
  });

  return store;
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(process.env.LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(process.env.LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    // Handle errors
  }
};
