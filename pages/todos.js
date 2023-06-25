import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Login from "../components/Login";

const Todos = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-5">
      <h1 className="text-center font-semibold uppercase text-xl mt-4">
        TODO App
      </h1>
      <TodoForm />
      <TodoList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Todos;
