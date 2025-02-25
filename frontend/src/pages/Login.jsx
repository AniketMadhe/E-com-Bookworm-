import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../configUrl";
import axios from "axios";
import { LoginContext } from "../App";

function Login() {
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        { username, password },
        { withCredentials: true }
      );

      if (response) setIsLogin(true);
      if (response && response.data.role === "admin") {
        setIsAdmin(true);
        navigate("/adminDashboard");
      } else {
        navigate("/");
      }
    } catch (e) {
      alert("Wrong username or password");
      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 bg-white shadow-md rounded-lg items-center gap-4 border border-gray-300"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <label htmlFor="username" className="w-full text-left">
          Username
        </label>
        <input
          className="w-full p-2 border border-gray-400 rounded-md"
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password" className="w-full text-left">
          Password
        </label>
        <input
          className="w-full p-2 border border-gray-400 rounded-md"
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Submit
        </button>

        <p className="text-sm mt-2">
          Don't have an account?{" "}
          <a className="text-blue-600 hover:underline" href="/signup">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
