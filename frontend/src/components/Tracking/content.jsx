import React from "react";
import Map from "./Map";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";
import axios from "axios";

const Content = () => {
  const navigate = useNavigate();
  const donation = JSON.parse(localStorage.getItem("donation"));
  const token = localStorage.getItem("token");

  const handleCancel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/donations/${donation._id}`,
        { status: "available" },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        },
      );

      const result = await axios.delete(
        `http://localhost:5000/api/matches/${donation._id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        },
      );

      if (response.status === 200) {
        console.log("success");
      }

      if (result.status === 200) {
        console.log("result updated");
      }
    } catch (e) {
      console.log(e);
    }

    localStorage.removeItem("donation");
    navigate("/alldonation");
  };
  return (
    <>
      <div className="flex">
        <div className="w-3/4 p-4 border shadow rounded-lg mx-2 mt-4">
          <h2 className="text-2xl font-bold font-libre-franklin">
            Package Location
          </h2>
          {/* <div className=' flex flex-row justify-between'>
        <div className="mt-4">
          <p className="font-bold font-libre-franklin">Sender</p>
          <p>123 Main St, Anytown USA</p>
        </div>
        <div className="mt-4">
          <p className="font-bold font-libre-franklin">Receiver</p>
          <p>456 Oak Rd, Somewhere Else</p>
        </div>
        </div> */}
          <div className="mt-4 border rounded shadow">
            <Map />
          </div>
        </div>
        <div className="w-1/4 border-t rounded pt-4 mt-4 mr-4">
          <h2 className="text-2xl font-bold font-libre-franklin">
            Tracking Activity
          </h2>
          <div className=" flex justify-center">
            <FoodCard isClick={handleCancel} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
