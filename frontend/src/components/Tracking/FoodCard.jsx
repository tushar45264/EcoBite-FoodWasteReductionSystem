import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chat from './Chat';
import toast, { Toaster } from 'react-hot-toast';

const FoodCard = ({ isClick }) => {
  const donation = JSON.parse(localStorage.getItem('donation'));
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handlePickUp = async () => {
    const donation = JSON.parse(localStorage.getItem('donation'));
  
    if (!donation || !donation._id) {
      console.error('No donation found or donation ID is missing');
      toast.error('No donation found or donation ID is missing.');
      return;
    }
  
    try {
      console.log('Attempting to delete donation with ID:', donation._id);
  
      const response = await axios.delete(`http://localhost:5000/api/donations/${donation._id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Response:', response);
  
      toast.success('We are thankful for the opportunity to help you.');
      localStorage.removeItem('donation');
      navigate('/alldonation');
    } catch (error) {
      console.error('Error deleting donation:', error);
      toast.error('Failed to pick up the donation.');
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <Toaster />
      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Best Donor</span>
      <img className="w-full mt-2" src={donation.image} alt={donation.foodType} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{donation.foodType}</div>
        <p className="text-gray-700 text-base">Expires on: {donation.expirationDate}</p>
        <div className="flex items-center">
          <span className="text-green-500 font-bold">Quantity: {donation.quantity}</span>
        </div>
        <p className="text-gray-700 text-base mt-2">
          Pickup Location: {donation.pickupLocation}
        </p>
        <p className="text-gray-700 text-base mt-2">
          Status: {donation.status}
        </p>
      </div>
      <div className="px-6 flex flex-row items-center pt-4 pb-2">
        <Chat />
        <button onClick={isClick} className="bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
        <button onClick={handlePickUp} className="bg-green-500 ml-2 text-white font-bold py-2 px-4 rounded">
          Pick Up
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
