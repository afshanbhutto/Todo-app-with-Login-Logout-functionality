// pages/index.js
import { useState } from "react";
import Login from "../components/Login";
import Todos from "./todos";

const Home = () => {
  const user = null; // Set the initial user state

  return user ? (
    <div className="max-w-3xl mx-auto mt-5">
      {/* <div className="flex justify-between m-2">
        <p className="text-lg font-normal tracking-wide">
          Welcome, {loggedInUser}!
        </p>
        <button
          onClick={handleLogout}
          className="uppercase font-semibold text-sm bg-yellow-400 px-4 py-2 rounded tracking-[2px] hover:bg-red-700 hover:text-white"
        >
          Logout
        </button>
      </div> */}

      <Todos />
    </div>
  ) : (
    <Login />
  );
};

export default Home;
