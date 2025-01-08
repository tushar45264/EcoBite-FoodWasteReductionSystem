import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapSection = () => {
  const mapboxToken = 'pk.eyJ1IjoidHVzaGFyNDUiLCJhIjoiY2xtOWpoZnN1MGtzbDNwbzVnZHU2dzlhcCJ9.ajMoNWOXT4hbizwr9nvxUg'; // Replace with your Mapbox access token
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [85.3338, 23.3586], 
      zoom: 9,
    });

    // Clean up
    return () => map.remove();
  }, [mapboxToken]);

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1, 
  });

  return (
    <section id="map" className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100">
      <motion.div 
        ref={ref}
        className="container grid max-w-5xl items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 xl:max-w-6xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="space-y-4 md:space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <motion.h2 
              className="text-3xl font-libre-franklin font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Track Donations with Our Map
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Our interactive map allows you to track food donations and find nearby drop-off locations, making it
              easy to contribute to the cause.
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-col gap-2 min-[400px]:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50"
            >
              View Map
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            >
              Donate Now
            </a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="rounded-lg border shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="h-96 relative" ref={mapContainerRef} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MapSection;
