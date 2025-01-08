import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaHandHoldingHeart,
  FaTruck,
  FaClock,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import FoodCard from "./FoodCard";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("claimed");
  const user = useSelector((state) => state.user);
  const id = user.user._id;

  const [donations, setDonations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `https://ecobite-foodwastereductionsystem.onrender.com/api/previousDonation/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              credentials: "include",
            },
          },
        );
        setDonations(response.data.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [id]);

  const handleDelete = async (donationId) => {
    console.log(donationId);
    try {
      await axios.delete(`https://ecobite-foodwastereductionsystem.onrender.com/api/donations/${donationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          credentials: "include",
        },
      });
      setDonations(donations.filter((donation) => donation._id !== donationId));
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const renderContent = () => {
    return donations
      .filter((donation) => donation.status === activeTab)
      .map((donation) => (
        <FoodCard
          key={donation._id}
          cardKey={donation._id}
          title={donation.foodType}
          address={donation.pickupLocation}
          quantity={donation.quantity}
          status={donation.status}
          image={donation.image || "/placeholder.svg"}
          handleDelete={() => handleDelete(donation._id)}
        />
      ));
  };

  return (
    <div>
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
        <li className="me-2">
          <button
            onClick={() => setActiveTab("available")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "available"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg group`}
          >
            <FaUtensils
              className={`w-4 h-4 me-2 ${
                activeTab === "available"
                  ? "text-green-500"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Available
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("claimed")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "claimed"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg group`}
          >
            <FaHandHoldingHeart
              className={`w-4 h-4 me-2 ${
                activeTab === "claimed"
                  ? "text-green-500"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Claimed
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("picked_up")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "pickedup"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg group`}
          >
            <FaTruck
              className={`w-4 h-4 me-2 ${
                activeTab === "pickedup"
                  ? "text-green-500"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Picked up
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setActiveTab("expired")}
            className={`inline-flex items-center justify-center p-4 border-b-2 ${
              activeTab === "expired"
                ? "text-green-500 border-green-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg group`}
          >
            <FaClock
              className={`w-4 h-4 me-2 ${
                activeTab === "expired"
                  ? "text-green-500"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Expired
          </button>
        </li>
      </ul>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabNavigation;
