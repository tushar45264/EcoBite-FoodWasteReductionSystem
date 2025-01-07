import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LuMoveHorizontal } from "react-icons/lu";

const ChatSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1, 
  });
//need to fix here
  return (
    <section id="chat" className="w-full flex justify-center py-12 md:py-24 lg:py-44">
      <motion.div
        ref={ref}
        className="container grid max-w-5xl items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 xl:max-w-6xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="rounded-lg border shadow-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col h-full">
            <div className="flex h-14 items-center justify-between border-b bg-gray-100/40 px-6 ">
              <h3 className="font-semibold font-libre-franklin">Chat with Donors</h3>
              <button variant="ghost" size="icon" className="rounded-full">
                <LuMoveHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="flex items-start gap-4">
                <div className="">
                  <img alt='user' className='rounded-full w-14 h-10' src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" />
                </div>
                <div className="grid gap-1">
                  <div className="font-bold">Donor</div>
                  <div className="prose prose-stone">
                    <p>Hi, I have some extra food that I'd like to donate. How can I get it to you?</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <div className="">
                  <img alt='user' className='rounded-full w-14 h-10' src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" />
                </div>
                <div className="grid gap-1">
                  <div className="font-bold">EcoBite</div>
                  <div className="prose prose-stone">
                    <p>Great, we have a few drop-off locations nearby. Let me share the details with you.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <input
                placeholder="Type your message..."
                name="message"
                id="message"
                rows={1}
                className="min-h-[48px] w-full rounded-2xl resize-none p-4 border border-gray-200 shadow-sm pr-16"
              />
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="space-y-4 ml-16 md:space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-libre-franklin md:text-5xl">Communicate with Donors</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our chat service allows you to communicate directly with donors, coordinate pickups, and ensure your
              food donations reach those in need.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <a
              href="#"
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
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ChatSection;
