'use client'
// pages/Signup.js
import React from "react";
import Image from "next/image";
import axios from 'axios';
import { useRouter } from "next/navigation";


const Signup = () => {
  const router = useRouter()
  const handleSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', {
        ...data,
      });

      console.log(response.data);
      router.push('/login');
      // Handle success or redirect to login page
    } catch (error) {
      if (error.response) {
        // The server responded with a status code other than 2xx
        console.error('Registration error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request', error.message);
      }}
  };
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
          <div className="bg-gray-300 shadow-2xl bg-opacity-85 m-8 p-8 rounded-lg max-w-md w-full">
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
            <form className="w-full" onSubmit={(e) => {
                  e.preventDefault();
                  // Extract form data and pass it to the submit handler
                  const formData = new FormData(e.target);
                  const data = {};
                  formData.forEach((value, key) => {
                    data[key] = value;
                  });
                  data["userType"] = 4;
                  handleSubmit(data);
                }}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your name"
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
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
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 p-4 w-full border rounded-lg"
                  placeholder="Enter your address"
                />
              </div>
              {/* <div className="mb-6">
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
              </div> */}
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
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
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
