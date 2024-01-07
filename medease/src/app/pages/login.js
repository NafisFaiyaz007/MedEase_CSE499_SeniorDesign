// pages/Login.js
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import the Link component from Next.js


const Login = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.jpg"
          layout="fill"
          objectFit="cover"
          alt="Background"
          className="filter blur-sm" // Apply a slight blur to the background image
        />
      </div>

      {/* Centered login form on the right half */}
      <div className="flex min-h-screen">
        {/* Left half (empty) */}
        <div className="flex-1" />

        {/* Right half with login form */}
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="bg-white bg-opacity-75 p-8 rounded-lg max-w-md w-full">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={220}
              height={220}
              className="mx-auto mb-6"
            />
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Login</h2>
            <form className="w-full">
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-4 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link href="/medease/src/app/pages/signup.js" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
