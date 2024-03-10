// UpdateBedsCounter.js
import React, { useState } from "react";
import * as hospitalFunction from "./hospitalFunctions";

const UpdateBedsCounter = ({
  handleBedsCounterIncrement,
  handleBedsCounterDecrement,
}) => {
  const [bedsCounter, setBedsCounter] = useState(0);

  const updateBedsInDatabase = async () => {
    // Replace the following logic with your actual backend API call
    try {
      const response = await fetch("http://localhost:8000/api/updateBeds", {
        method: "PUT", // or "POST" based on your backend logic
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bedsCounter }),
      });

      if (response.ok) {
        console.log("Beds counter updated successfully!");
        // You can perform additional actions or state updates if needed
      } else {
        console.error("Failed to update beds counter");
      }
    } catch (error) {
      console.error("Error updating beds counter:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        Update Beds Counter
      </h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setBedsCounter((prevCounter) => prevCounter - 1);
            handleBedsCounterDecrement();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          -
        </button>
        <p className="text-white">{bedsCounter}</p>
        <button
          onClick={() => {
            setBedsCounter((prevCounter) => prevCounter + 1);
            handleBedsCounterIncrement();
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
        >
          +
        </button>
      </div>
      <button
        onClick={updateBedsInDatabase}
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateBedsCounter;
