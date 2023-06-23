// store/actions/todoActions.js
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  REMOVE_ALL_TODOS,
  UPDATE_TODO_ORDER,
} from "./types";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodo = (id, updatedTodo) => ({
  type: UPDATE_TODO,
  payload: { id, updatedTodo },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const removeAllTodos = () => ({
  type: REMOVE_ALL_TODOS,
});

export const updateTodoOrder = (newTodoOrder) => ({
  type: UPDATE_TODO_ORDER,
  payload: newTodoOrder,
});
