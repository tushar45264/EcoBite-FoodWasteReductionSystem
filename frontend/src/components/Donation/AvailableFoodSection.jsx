import React from 'react';
import { FaCircleArrowDown } from "react-icons/fa6";

const AvailableFoodSection = () => {
  return (
    <>
    <section className="relative w-full h-[80vh] flex items-center justify-center mb-8 shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Available Food"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="relative z-10 text-center space-y-4 px-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Discover Our Available Food
        </h1>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground md:text-xl">
          Explore our wide selection of delicious and freshly prepared meals, snacks, and beverages.
        </p>
      </div>
    </section>
    {/* <div className=' flex justify-center pb-10'>
      <FaCircleArrowDown size={24}  className='bg-white animate-bounce text-green-500' />
    </div> */}
    </>
  );
};

export default AvailableFoodSection;
