// UpdateBedsCounter.js
import React, { useEffect, useState } from "react";
import { getBedsCount } from "./hospitalFunctions";
import Modal from "../components/modal";

const UpdateBedsCounter = ({
  handleBedsCounterIncrement,
  handleBedsCounterDecrement,
}) => {
  const [bedsCounter, setBedsCounter] = useState('');
  const [beds, setBeds] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    fetchBedsCount();
  }, []);

  const fetchBedsCount = async () => {
    const count = await getBedsCount();
    setBeds(count)
    setBedsCounter(count);
  };

  const updateBedsInDatabase = async () => {
    // Replace the following logic with your actual backend API call
    try {
      const response = await fetch("http://localhost:8000/api/updateBeds", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bedsCounter }),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json(); // Parse JSON body of the response
        console.log("Beds counter updated successfully!", data);
        setModalContent(data.message);
        setModalIsOpen(true)
        fetchBedsCount(); // Make sure to call this function correctly
      } else {
        console.error("Failed to update beds counter");
        const errorData = await response.json(); // Parse JSON body even in case of HTTP error
        console.error("Error details:", errorData);
        setModalContent(errorData.error);
        setModalIsOpen(true)
      }
    } catch (error) {
      console.error("Error updating beds counter:", error);
    }
  };

  return (
    <div className="space-y-4">
      { <h2 className="text-xl font-semibold text-white mb-4">
        Currently Available Beds: {beds}
      </h2>}
      <h2 className="text-xl font-semibold text-white mb-4">
        Update Beds Counter
      </h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setBedsCounter(prevCounter => prevCounter > 0 ? prevCounter - 1 : 0);
            // if (bedsCounter > 0) {
            // handleBedsCounterDecrement();
            // }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          -
        </button>
        <p className="text-white">{bedsCounter}</p>
        <button
          onClick={() => {
            setBedsCounter((prevCounter) => prevCounter.valueOf() + 1);
            // handleBedsCounterIncrement();
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
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default UpdateBedsCounter;
