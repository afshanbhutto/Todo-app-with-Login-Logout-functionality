import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Initialize the Google Sign-In client
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to another component
        window.location.href = "/todos";
      }
    });
  }, []);
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google
      // await signInWithRedirect(auth, provider);
      await signInWithPopup(auth, provider);
      console.log("successful login");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-5 border-2 px-8 py-12 shadow-lg rounded text-center">
      <h1 className="text-xl mb-5 font-bold tracking-[2px] uppercase">Login</h1>
      {/* <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="abc@gmail.com"
          required
          value={username}
          className="w-full h-10 p-2  mb-2 focus:outline-none text-yellow-600 border-b-2 border-yellow-500"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          className="w-full h-10 p-2  mt-2 focus:outline-none text-yellow-600 border-b-2 border-yellow-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="bg-yellow-400 px-6 py-2 rounded text-black font-semibold mt-8 tracking-[2px] uppercase text-sm transition-all hover:text-white hover:bg-black"
        >
          Login
        </button>
      </form>
      <button className="bg-red-600 text-white px-6 py-2 rounded mt-4">
        Login with Google
      </button> */}
      <button
        className="bg-red-600 text-white px-6 py-2 rounded mt-4"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
