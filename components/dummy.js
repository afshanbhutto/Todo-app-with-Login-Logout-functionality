/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTodo,
  deleteTodo,
  updateTodoOrder,
  removeAllTodos,
} from "../store/actions/todoActions";

// for drag-and-drop functionality
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//  for generating QR codes.
import { toDataURL } from "qrcode";

const TodoList = () => {
  const [shouldRender, setShouldRender] = useState(false);
  // state variables for storing generated QR codes
  const [qrs, setQRs] = useState({});

  useEffect(() => {
    setShouldRender(true);
  }, []);

  // selector that retrieves the todo list from the Redux store
  const todos = useSelector((state) => state.todos);
  // function used to dispatch Redux actions
  const dispatch = useDispatch();

  // variables for storing the ID of the todo being updated
  const [updatedTodoId, setUpdatedTodoId] = useState("");
  // variables for storing the updated todo text
  const [updatedTodoText, setUpdatedTodoText] = useState("");

  const handleUpdate = (id, text) => {
    setUpdatedTodoId(id);
    setUpdatedTodoText(text);
  };
  // It updates the updatedTodoText state variable based on the input value.
  const handleUpdateInputChange = (e) => {
    setUpdatedTodoText(e.target.value);
  };

  // It dispatches the updateTodo action with the updatedTodoId and updated text as arguments, and then resets the updatedTodoId and updatedTodoText state variables.
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (updatedTodoText.trim() !== "") {
      dispatch(updateTodo(updatedTodoId, { text: updatedTodoText }));

      setUpdatedTodoId("");
      setUpdatedTodoText("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllTodos());
  };

  // called when a drag-and-drop operation is completed
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // updates the order of todos in the todosCopy array based on the source and destination indices provided by result. It then dispatches the updateTodoOrder action with the updated todosCopy array
    const { source, destination } = result;
    const todosCopy = [...todos];
    const [removed] = todosCopy.splice(source.index, 1);
    todosCopy.splice(destination.index, 0, removed);

    dispatch(updateTodoOrder(todosCopy));
  };

  // generates a QR code based on the provided text and id. It uses the toDataURL function to convert the text into a data URL representing the QR code image
  const generateQRCode = async (text, id) => {
    try {
      const dataUrl = await toDataURL(text);
      setQRs((prevQRs) => ({ ...prevQRs, [id]: dataUrl }));
    } catch (error) {
      console.error(error);
    }
  };

  // creates a temporary a element, sets the href attribute to the provided dataUrl, sets the download attribute to "qrcode.png" (the desired file name), and triggers a click event on the element. This initiates the download of the QR code image.
  const downloadQRCode = (id) => {
    const dataUrl = qrs[id];
    if (dataUrl) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return shouldRender ? (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* represents the droppable area where the draggable todos can be dropped. */}
      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            className="mt-5 flex flex-col"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ul className="flex flex-col min-w-min">
              {/* todos are mapped over in reverse order using  */}
              {todos
                .slice()
                .reverse()
                .map((todo, index) => (
                  // The index prop is used to maintain the order of the todos during dragging and dropping
                  <Draggable
                    key={todo.id.toString()}
                    draggableId={todo.id.toString()}
                    index={todos.length - 1 - index}
                  >
                    {(provided) => (
                      <li
                        className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* If the todo is being updated, a form with an input field is rendered */}
                        {todo.id === updatedTodoId ? (
                          <form
                            onSubmit={handleUpdateSubmit}
                            className="flex gap-2 w-full"
                          >
                            <div className="flex w-full">
                              <input
                                type="text"
                                value={updatedTodoText}
                                onChange={handleUpdateInputChange}
                                className="w-full py-2 px-2 text-sm rounded-xl border-blue-300 border-2"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                className="bg-blue-300 py-3 px-3 w-auto text-sm rounded-xl uppercase"
                                type="submit"
                              >
                                Update
                              </button>
                              <button
                                className="bg-black uppercase hover:bg-red-700 text-white py-2 px-3 w-auto text-sm rounded-xl"
                                onClick={() => handleDelete(todo.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </form>
                        ) : (
                          //  If the todo is not being updated
                          <>
                            <div className="flex items-center ">
                              <span
                                className="py-2 px-2 text-sm flex-grow cursor-pointer break-words"
                                onClick={() => handleUpdate(todo.id, todo.text)}
                              >
                                {todo.text}
                              </span>
                              {qrs[todo.id] && (
                                <div className="flex items-center">
                                  <img
                                    src={qrs[todo.id]}
                                    alt="QR Code"
                                    className="w-10 h-10 mr-2"
                                  />
                                  <button
                                    className="bg-yellow-400 mr-0 flex justify-end md:mr-16 text-black py-2 px-3 text-sm rounded-xl"
                                    onClick={() => downloadQRCode(todo.id)}
                                  >
                                    Download
                                  </button>
                                </div>
                              )}
                              {!qrs[todo.id] && (
                                <button
                                  className="bg-green-600  md:mr-4 md:bg-black text-white py-2 px-3 text-sm rounded-xl"
                                  onClick={() =>
                                    generateQRCode(todo.text, todo.id)
                                  }
                                >
                                  Generate QR
                                </button>
                              )}
                            </div>
                            <div className="flex justify-end mt-2 md:mt-0 font-semibold">
                              <button
                                className="bg-yellow-400 uppercase tracking-[2px] py-3 px-3 mr-4 w-auto text-sm rounded-xl hover:bg-yellow-700 hover:text-white"
                                onClick={() => handleUpdate(todo.id, todo.text)}
                              >
                                Update
                              </button>
                              <button
                                className="bg-black uppercase tracking-[2px] hover:bg-red-700 text-white py-2 px-3 w-auto text-sm rounded-xl"
                                onClick={() => handleDelete(todo.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
            {todos.length > 0 && (
              <div className="mt-4 flex justify-center lg:justify-center">
                <button
                  className="w-auto lg:w-40 rounded-xl py-4 px-4 bg-yellow-400 text-black uppercase font-semibold tracking-[2px] hover:bg-red-700 hover:text-white hover:border-yellow-400 hover:border-1 text-lg  hover:transition-all"
                  onClick={handleRemoveAll}
                >
                  Remove All
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

export default TodoList;
