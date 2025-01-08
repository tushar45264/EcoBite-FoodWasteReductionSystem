import React from "react";
import DonorChat from "./donorChat";

const Badge = ({ variant, children }) => {
  const baseStyle = "px-3 py-1 text-sm rounded-full";
  const variants = {
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]}`}>{children}</span>
  );
};

const FoodCard = ({
  cardKey,
  title,
  address,
  quantity,
  status,
  image,
  handleDelete,
}) => {
  const isAvailable = status === "available";
  return (
    <div className="shadow-md w-full max-w-md grid grid-cols-2 rounded-xl overflow-hidden">
      <div className="aspect-square bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt="Food Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm">{address}</p>
          <div className="flex items-center gap-2 text-sm">
            <span>Quantity:</span>
            <span className="font-medium">{quantity}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* <button className=' bg-green-400 rounded px-2 py-1 mt-2' variant={isAvailable ? "success" : "success"}> */}
          {isAvailable ? "Available" : <DonorChat cardKey={cardKey} />}
          {/* </button> */}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
