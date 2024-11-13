import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error message

    try {
      const response = await axios.post("https://motivata.onrender.com/api/auth/login", {
        usernameOrEmail,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Adjust this based on your expected dashboard route
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials.";
      setError(message); // Use server error message if available
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="usernameOrEmail">Email or Username:</label>
          <input
            type="text"
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            placeholder="Enter your email or username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;