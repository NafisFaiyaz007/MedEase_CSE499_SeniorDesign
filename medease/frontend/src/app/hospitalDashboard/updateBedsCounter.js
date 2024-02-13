// UpdateBedsCounter.js
import React from "react";
import * as hospitalFunction from "./hospitalFunctions"
import { useState, useEffect } from "react";


const UpdateBedsCounter = ({
  // bedsCounter,
  handleBedsCounterIncrement,
  handleBedsCounterDecrement,
}) => {
  const [bedsCounter, setBedsCounter] = useState(0);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        Update Beds Counter
      </h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={hospitalFunction.handleBedsCounterDecrement}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          -
        </button>
        <p className="text-white">{bedsCounter}</p>
        <button
          onClick={hospitalFunction.handleBedsCounterIncrement}
          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
        >
          +
        </button>
      </div>
      <button
        // onClick={update}
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateBedsCounter;
