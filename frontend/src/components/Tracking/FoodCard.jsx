import React from 'react';

const FoodCard = ({isClick}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Best Donor</span>
      <img className="w-full mt-2" src="https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Paneer Tikka Pizza" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Paneer Tikka Pizza</div>
        <p className="text-gray-700 text-base">₹249</p>
        <div className="flex items-center">
          <span className="text-green-500 font-bold">4.0</span>
          <span className="text-gray-600 ml-2">(941)</span>
        </div>
        <p className="text-gray-700 text-base mt-2">
          A well baked pizza filled with paneer tikka and topped with eons of cheese.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
          Chat
        </button>
        <button onClick={isClick} className="bg-red-500 ml-2 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
