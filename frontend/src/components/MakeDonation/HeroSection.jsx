import React from 'react';
import { LuLeaf } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <main className="flex-1 mt-10">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h1 className="text-3xl  flex flex-row  items-center font-bold tracking-tighter sm:text-4xl md:text-6xl">
            <LuLeaf className=' text-green-500' />
              Donate Food, Make a Difference
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Easily manage your food donations and stay up-to-date on current orders.
            </p>
          </div>
          <div className="flex flex-col gap-8 min-[400px]:flex-row justify-center">
          <Link to='/dashboard'>
            <button
              className="inline-flex h-10 text-white font-semibold items-center justify-center rounded-md bg-green-500 px-8 text-sm  text-primary-foreground shadow transition-colors hover:bg-green-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Dashboard
            </button>
            </Link>
            <Link to='/makedonation'>
            <button
              className="inline-flex h-10 text-white items-center font-semibold justify-center rounded-md bg-green-500 px-8 text-sm  text-primary-foreground shadow transition-colors hover:bg-green-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Make Donation
            </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
