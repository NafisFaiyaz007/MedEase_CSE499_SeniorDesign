// pages/Login.js
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left half with background image */}
      <div
        className="flex-1 bg-cover"
        style={{ backgroundImage: "url('/medease/images/background.jpg')" }}
      />

      {/* Right half with login form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
