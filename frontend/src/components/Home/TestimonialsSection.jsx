import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Card = ({ children, className }) => {
  return <div className={`rounded-lg shadow-md ${className}`}>{children}</div>;
};

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our satisfied customers about their experience with our
              chat service.
            </p>
          </div>
        </div>
        <motion.div
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.6,
            delayChildren: 0.3,
            staggerChildren: 0.3,
          }}
        >
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-gray-100">
              <div className="flex items-start gap-4">
                <div className="rounded-full w-12 h-12 bg-[#55efc4] text-3xl flex items-center justify-center">
                  😊
                </div>
                <div className="grid gap-1 items-start text-sm">
                  <div className="font-bold">Jane Doe</div>
                  <div>
                    <p>
                      "The chat service has been a game-changer for our customer
                      support. The real-time messaging and file sharing features
                      have helped us resolve issues quickly and efficiently."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gray-100">
              <div className="flex items-start gap-4">
                <div className="rounded-full w-12 h-12 bg-[#ffeaa7] text-3xl flex items-center justify-center">
                  😄
                </div>
                <div className="grid gap-1 items-start text-sm">
                  <div className="font-bold">John Smith</div>
                  <div>
                    <p>
                      "I'm really impressed with the customer support provided
                      through the chat service. The team is knowledgeable,
                      responsive, and always willing to go the extra mile to
                      help."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-gray-100">
              <div className="flex items-start gap-4">
                <div className="rounded-full w-12 h-12 bg-[#fdcb6e] text-3xl flex items-center justify-center">
                  😀
                </div>
                <div className="grid gap-1 items-start text-sm">
                  <div className="font-bold">Sarah Lee</div>
                  <div>
                    <p>
                      "The chat service has been a game-changer for our customer
                      support. The real-time messaging and file sharing features
                      have helped us resolve issues quickly and efficiently."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gray-100">
              <div className="flex items-start gap-4">
                <div className="rounded-full w-12 h-12 bg-[#81ecec] text-3xl flex items-center justify-center">
                  😊
                </div>
                <div className="grid gap-1 items-start text-sm">
                  <div className="font-bold">Tom Wilson</div>
                  <div>
                    <p>
                      "I'm really impressed with the customer support provided
                      through the chat service. The team is knowledgeable,
                      responsive, and always willing to go the extra mile to
                      help."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
