import React from "react";
import Header from "../Home/Header";
import TabNavigation from "./TabNavigation";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="ml-10 flex flex-col justify-start">
        <h1 className=" text-3xl font-bold font-libre-franklin  mt-4">
          Dashboard
        </h1>

        <form class="max-w-lg mt-2">
          <div class="flex">
            <div class="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                class="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-green-400 focus:border-green-400"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
              />
              <button
                type="submit"
                class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-500 rounded-e-lg border border-green-500 hover:bg-green-500/90 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <TabNavigation />
      </div>
    </>
  );
};

export default Dashboard;
