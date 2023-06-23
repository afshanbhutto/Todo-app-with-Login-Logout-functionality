/* eslint-disable @next/next/no-img-element */
// components/TodoForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions/todoActions";
//for QR Code generation

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
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2 m-2">
      <input
        type="text"
        placeholder="ENTER TODO"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="w-full py-2 px-2 text-sm border-yellow-400 border-b-2 focus:outline-none "
      />
      <div className="flex">
        <button
          type="submit"
          className="bg-yellow-400 uppercase py-4 px-2 w-auto lg:w-36 text-sm lg:text-lg font-semibold tracking-[2px] hover:text-xl   hover:transition-all rounded-xl"
        >
          <span>Add TODO</span>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
