import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const token = localStorage.getItem("token");

  const handleOrder = async () => {
    const donation = JSON.parse(localStorage.getItem("donation"))._id;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/donations/${donation}`,
        { status: "picked_up" },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        },
      );

      if (response.status === 200) {
        localStorage.removeItem("donation");
        navigate("/alldonation");
        onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">
          You have reached the location
        </h2>
        <p className="mb-6">Have you picked up the order?</p>
        <button
          onClick={handleOrder}
          className="px-4 py-2 font-semibold bg-green-500 text-white rounded hover:bg-green-400 focus:outline-none"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 font-semibold ml-2 bg-red-500 text-white rounded hover:bg-red-400 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
