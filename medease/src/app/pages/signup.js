// pages/Signup.js
import React from "react";
import Image from "next/image";

const Signup = () => {
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

      {/* Centered signup form on the right half */}
      <div className="flex min-h-screen">
        {/* Left half (empty) */}
        <div className="flex-1" />

        {/* Right half with signup form */}
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="bg-white bg-opacity-75 p-8 rounded-lg max-w-md w-full">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={220}
              height={220}
              className="mx-auto mb-6"
            />
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">
              Sign Up
            </h2>
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your age"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  className="mt-1 p-4 w-full border rounded-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="accountType"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Account Type
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  className="mt-1 p-4 w-full border rounded-lg"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-4 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="login.js" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
