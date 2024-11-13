import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://motivata.onrender.com/api/auth/login", { usernameOrEmail, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Adjust this based on your expected dashboard route
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email or Username:</label>
          <input type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-2 rounded" required />
        </div>
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;