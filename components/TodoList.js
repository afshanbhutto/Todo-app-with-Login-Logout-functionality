// components/TodoList.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, deleteTodo, removeAllTodos } from '../store/actions/todoActions';

const TodoList = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [updatedTodoId, setUpdatedTodoId] = useState('');
  const [updatedTodoText, setUpdatedTodoText] = useState('');

  const handleUpdate = (id, text) => {
    setUpdatedTodoId(id);
    setUpdatedTodoText(text);
  };

  const handleUpdateInputChange = e => {
    setUpdatedTodoText(e.target.value);
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    if (updatedTodoText.trim() !== '') {
      dispatch(updateTodo(updatedTodoId, { text: updatedTodoText }));
      setUpdatedTodoId('');
      setUpdatedTodoText('');
    }
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllTodos());
  };

  return shouldRender ? (
    <div className='mt-5 flex flex-col'>
      <ul className='flex flex-col'>
        {todos.map(todo => (
          <li key={todo.id}
        
          >
            {todo.id === updatedTodoId ? (
              <form onSubmit={handleUpdateSubmit}  className='mt-4 flex gap-2'>
                <div className='flex w-full'>
                <input
                  type="text"
                  value={updatedTodoText}
                  onChange={handleUpdateInputChange}
                  className='w-full py-2 px-2 bg-gray-100 text-sm rounded-xl border-blue-300 border-2' 
                />
                </div>
                <div className='flex justify-end gap-2'>
                <button className='bg-blue-300 py-3 px-3 w-auto text-sm rounded-xl' type="submit">Update</button>
                <button className='bg-black hover:bg-red-700 text-white py-2 px-3 w-auto text-sm rounded-xl' onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </form>
            ) : (
              <div className='mt-4 flex gap-2 '>
                <div className='flex w-full'>
                <span className='w-full py-2 px-2 bg-gray-100 text-sm '  onClick={() => handleUpdate(todo.id, todo.text)}>{todo.text}</span>
                </div>
                
                <div className='flex justify-end gap-2'>
                  <button className='bg-yellow-400 py-3 px-3 w-auto text-sm rounded-xl  hover:bg-yellow-700 hover:text-white' onClick={() => handleUpdate(todo.id, todo.text)}>Update</button>
                  <button className='bg-black  hover:bg-red-700 text-white py-2 px-3 w-auto text-sm rounded-xl' onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {todos.length > 0 && <button
                                className='mt-4 w-auto rounded-xl py-4 px-4 bg-blue-500 text-white hover:bg-white hover:text-blue-700 hover:border-blue-700 hover:border-2 text-lg hover:text-xl hover:transition-all'
                               onClick={handleRemoveAll}>Remove All</button>}
    </div>
  ): null;
};

export default TodoList;
