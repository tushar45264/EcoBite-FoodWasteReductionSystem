import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import FoodDonationCard from "./donationCard";
import axios from "axios";
import AvailableFoodSection from "./AvailableFoodSection";
import { motion } from "framer-motion";

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecobite-foodwastereductionsystem.onrender.com/api/donations",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDonations(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <Header />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <AvailableFoodSection />
      </motion.div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {donations.map((donation) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <FoodDonationCard donation={donation} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDonation;
