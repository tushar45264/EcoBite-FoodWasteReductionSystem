import React from 'react'
import Map from './Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSyncAlt, faShareSquare, faMapMarkerAlt, faTruck, faRoute, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const content = () => {
  return (
    <>
        <div className="flex">
      <div className="w-2/3 p-4 border shadow rounded-lg mx-2 mt-4">
        <h2 className="text-2xl font-bold font-libre-franklin">Package Location</h2>
        <div className=' flex flex-row justify-between'>
        <div className="mt-4">
          <p className="font-bold font-libre-franklin">Sender</p>
          <p>123 Main St, Anytown USA</p>
        </div>
        <div className="mt-4">
          <p className="font-bold font-libre-franklin">Receiver</p>
          <p>456 Oak Rd, Somewhere Else</p>
        </div>
        </div>
        <div className="mt-4 border rounded shadow">
          <Map />
        </div>
      </div>
      <div className="w-1/3 p-4 border rounded-lg shadow mt-4">
      <h2 className="text-2xl font-bold font-libre-franklin">Tracking Activity</h2>
        <div className="mt-4 flex items-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-8 mr-2" />
          <div>
            <p className="font-semibold">Package status and details</p>
            <p className="text-green-500">Delivered</p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-8" />
          <div>
            <p className="font-semibold">Distance Traveled</p>
            <p>1,234 miles <span className="text-gray-500">92%</span></p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 h-8" />
          <div>
            <p className="font-semibold">Estimated Arrival</p>
            <p>June 15, 2023 <span className="text-gray-500">2 days</span></p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <FontAwesomeIcon icon={faSyncAlt} className="mr-2 h-8" />
          <button className="bg-white border border-gray-400 text-black px-4 py-2 rounded mr-2">Refresh</button>
          <FontAwesomeIcon icon={faShareSquare} className="mr-2 h-8" />
          <button className="bg-black text-white px-4 py-2 rounded">Share</button>
        </div>
        <div className="mt-8">
          <div className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-8" />
            <div>
              <p className="font-semibold">Your Location</p>
              <p>123 Main St, Anytown USA</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faTruck} className="mr-2 h-7" />
            <div>
              <p className="font-semibold">Delivery Location</p>
              <p>456 Oak Rd, Somewhere Else</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <FontAwesomeIcon icon={faRoute} className="mr-2 h-8" />
            <div>
              <p className="font-semibold">Delivery Route</p>
              <p>Estimated 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default content