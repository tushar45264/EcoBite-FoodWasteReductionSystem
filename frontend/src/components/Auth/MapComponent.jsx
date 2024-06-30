import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css'; // Ensure this path points to your CSS file

const MapComponent = ({ onLocationChange }) => {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidHVzaGFyNDUiLCJhIjoiY2xtOWpoZnN1MGtzbDNwbzVnZHU2dzlhcCJ9.ajMoNWOXT4hbizwr9nvxUg'; // Replace with your Mapbox access token
    console.log('Initializing map...');

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [23.2323, 83.323],
      zoom: 12,
    });

    // Add navigation controls to the map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    console.log('Navigation control added.');

    // Create the Geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    // Append the Geocoder control to the map
    map.addControl(geocoder, 'top-left');
    console.log('Geocoder control added.');

    // Listen to the 'result' event on the Geocoder control
    geocoder.on('result', (event) => {
      const { result } = event;
      const [lng, lat] = result.center;
      console.log('Geocoder result:', { lng, lat });

      // Update or create the marker position
      updateMarkerPosition([lng, lat]);
      onLocationChange({lng, lat});
      
      // Save the coordinates to local storage
    //   localStorage.setItem('searchedLocation', JSON.stringify({ lng, lat }));
    });

    // Add a click event listener to the map
    map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      console.log('Map clicked at:', { lng, lat });

      // Update or create the marker position
      updateMarkerPosition([lng, lat]);
      onLocationChange({lng, lat});
      
      // Save the coordinates to local storage
    //   localStorage.setItem('clickedLocation', JSON.stringify({ lng, lat }));
    });

    const updateMarkerPosition = (lngLat) => {
      if (marker) {
        marker.setLngLat(lngLat).addTo(map);
      } else {
        const newMarker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
        setMarker(newMarker);
      }
    };

    // Clean up the map instance when the component unmounts
    return () => {
      console.log('Cleaning up map instance...');
      map.remove();
    };
  }, [marker]);

  return <div id="map-container" className="w-full h-96 relative" />;
};

export default MapComponent;
