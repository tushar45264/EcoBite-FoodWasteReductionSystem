import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const YourDonations = () => {
  const user = useSelector((state) => state.user);
  const id = user.user._id;

  const [donations, setDonations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/previousDonation/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
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

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Your Donations
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(donation.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donation.foodType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donation.pickupLocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {donation.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default YourDonations;
