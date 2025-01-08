import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WelcomeSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section id="welcome" className="w-full py-12 flex justify-center md:py-24 lg:py-44">
      <div className="container grid max-w-5xl items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 xl:max-w-6xl">
        <motion.div 
          className="space-y-4 md:space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <motion.h2 
              className="text-3xl font-libre-franklin font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Reduce Food Waste with EcoBite
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              EcoBite is a revolutionary food waste reduction system that connects donors and receivers to minimize
              food waste and promote sustainability.
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-col gap-2 min-[400px]:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50"
            >
              Join Now
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="w-full ml-20 max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Slider {...settings}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="EcoBite Service"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1663054899143-e44e57df1238?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="EcoBite Service"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1663045467897-6ff808fb7bac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="EcoBite Service"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
