import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      await axios.post(
        URL + "/auth/login",
        { username, password },
        { withCredentials: true },
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-linear-300 from-pink-300 via-blue-200 to-blue-300 text-white">
      <form
        method="POST"
        className="flex w-[70%] max-w-150 flex-col gap-10 rounded-[10px] bg-pink-300 p-10 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="self-center text-3xl">Login</h1>
        <div className="flex w-[60%] flex-col gap-2 self-center">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="h-8 rounded-[5px] bg-gray-200 text-black"
            placeholder="paja@jekocka.com"
            required
          />
        </div>
        <div className="flex w-[60%] flex-col gap-2 self-center">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="h-8 max-w-full rounded-[5px] bg-gray-200 text-black"
            placeholder="123654"
            required
          />
        </div>

        <button className="h-10 w-[60%] max-w-50 self-center rounded-[5px] bg-pink-400 transition-colors duration-100 hover:bg-pink-500">
          Login
        </button>
      </form>
    </div>
  );
}
