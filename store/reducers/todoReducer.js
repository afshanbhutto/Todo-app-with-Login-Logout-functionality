// store/reducers/todoReducer.js
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  REMOVE_ALL_TODOS,
} from "../actions/types";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO:
      // Logic to update a specific TODO item
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              ...action.payload.updatedTodo,
            };
          }
          return todo;
        }),
      };
    case DELETE_TODO:
      // Logic to delete a specific TODO item
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case REMOVE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
};

export default todoReducer;
