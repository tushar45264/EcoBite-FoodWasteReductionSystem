import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Quote = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className='w-full flex flex-col items-center mt-4 pb-8 pt-2'>
      <motion.h1
        className='font-caudex mb-2 font-extrabold text-[2rem]'
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
      >
        Quote
      </motion.h1>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-[#424242] italic">
          "Reducing food waste is not just an environmental issue, it's a moral imperative. Every bite we save
          makes a difference."
        </p>
        <cite className="text-[#4CAF50] font-semibold mt-4 block">- Jane Doe, Food Waste Activist</cite>
      </motion.div>       
    </div>
  );
}

export default Quote;
