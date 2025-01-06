import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux'

const Card = ({ children, className }) => (
  <div className={`w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 bg-background ${className}`}>
    {children}
  </div>
);

const Button = ({ children, size, className, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out ${size === 'lg' ? 'px-6 py-3 text-lg' : ''} ${className}`}
  >
    {children}
  </button>
);

const Modal = ({ donation, id, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Claim {donation.foodType}?</h2>
        <p>Are you sure you want to claim this donation?</p>
        <Button onClick={onConfirm} className="mt-4 mr-4">
          Yes
        </Button>
        <Button onClick={onClose} className="mt-4 bg-red-500 hover:bg-red-400">
          Close
        </Button>
      </div>
    </div>
  );
};

const FoodDonationCard = ({ donation }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
    console.log();

  const handleClaimClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = async() => {
    localStorage.setItem('donation', JSON.stringify(donation));
    try {
      const response = await axios.post(`http://localhost:5000/api/match/${user.user._id}`, { donationId: donation._id });
      console.log(response.data);
    }catch(e){
      console.log(e.message);
    }

    setModalOpen(false);
    
    navigate(`/track`);
  };

  return (
    <div className='mb-16 h-52 w-72'>
      <Card className='mt-4 ml-4'>
        <img src={donation.image} alt={donation.foodType} width={400} height={200} className="w-full h-48 object-cover" />
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-libre-franklin font-semibold">{donation.foodType}</h3>
            <div className="bg-black text-white px-2 py-1 rounded-md text-sm font-medium">{donation.quantity} left</div>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-sm mb-4">
            <span>{donation.pickupLocation}</span>
            <span>${donation.price}</span>
          </div>
          <Button size="lg" className="w-full" onClick={handleClaimClick}>
            Claim
          </Button>
        </CardContent>
      </Card>
      <Modal
        donation={donation}
        id={donation.donor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default FoodDonationCard;
