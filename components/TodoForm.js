// components/TodoForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions/todoActions";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim() === "") return;
    dispatch(addTodo({ id: Date.now(), text: todoText }));
    setTodoText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        placeholder="Enter a TODO item"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="w-full py-2 px-2 bg-gray-100 text-sm rounded-xl"
      />
      <button
        type="submit"
        className="bg-blue-300 py-2 px-2 w-auto text-sm rounded-xl"
      >
        <span>Add TODO</span>
      </button>
    </form>
  );
};

export default TodoForm;
