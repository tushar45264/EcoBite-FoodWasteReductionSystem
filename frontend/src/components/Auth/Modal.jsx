import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { LuMapPin } from 'react-icons/lu';

const Modal = ({ onSaveLocation }) => {
  const [location, setLocation] = useState({ lng: null, lat: null });
  const [showModal, setShowModal] = useState(false);

  const handleLocationChange = (coords) => {
    setLocation(coords);
  };

  const saveLocation = () => {
    console.log('Location saved:', location);
    onSaveLocation(location);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="text-Black active:bg-gray-200 font-bold uppercase text-sm px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <LuMapPin className="h-5 w-5" />
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex-col flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <MapComponent onLocationChange={handleLocationChange} />
              <div className="border-0 rounded-b-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveLocation}
                  >
                    Save Location
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
