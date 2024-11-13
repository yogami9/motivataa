import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
      <h1 className="text-5xl font-bold mb-2">Welcome to Motivata</h1>
      <p className="mb-8">Explore motivational content to inspire and uplift your journey.</p>
      <div className="mt-4">
        <Link to="/login" className="bg-white text-blue-500 py-2 px-4 rounded m-2 hover:bg-gray-100">
          Login
        </Link>
        <Link to="/register" className="bg-white text-blue-500 py-2 px-4 rounded m-2 hover:bg-gray-100">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;