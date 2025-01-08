import React from "react";
import { LuLeaf } from "react-icons/lu";

const Navbar = () => {
  return (
    <>
      <div className=" bg-[#4CAF50] shadow w-full top-0 left-0 right-0">
        <div className="flex justify-between items-center px-8 py-2">
          <div className="text-white font-caudex text-[1.5rem] flex flex-row items-center font-bold text-xl">
            <LuLeaf className="inline-block h-6 w-6 fill-white" />
            Food waste Reduction
          </div>

          <div className="flex items-center">
            <div className="bg-white hover:bg-gray-200 font-semibold cursor-pointer text-green-500 px-4 py-2 rounded-lg">
              Join Now
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
