import React, { useRef, useEffect,useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import Modal from './Model';
import './Map.css'

mapboxgl.accessToken = process.env.mapBoxId;

const Map = () => {
  
  const [DonorLocation, setDonorLocation] = useState([0, 0]);
  const [isModalDismissed, setIsModalDismissed] = useState(false);
  const donation=localStorage.getItem('donation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const donationId=JSON.parse(donation)?._id;
  const DonorId=JSON.parse(donation)?.donor;
  const GetDonorLocation=async()=>{
    try{
      const response = await axios.get(`http://localhost:5000/api/DonorLocation/${DonorId}`);
      setDonorLocation(response.data.data.location.coordinates);
      console.log();
    } catch(e) {
      console.log(e);
    }
  } 
  
  const mapContainerRef = useRef(null);
  const [receiverLocation, setReceiverLocation] = useState([-73.5, 41]); 
  const [map, setMap] = useState(null);

  const origin = DonorLocation; 

  useEffect(() => {
    GetDonorLocation();
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: DonorLocation, 
      zoom: 9,
    });

    setMap(map);

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(origin)
      .addTo(map);


    const receiverMarker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat(receiverLocation)
      .addTo(map);

    const getRoute = async (start, end, retries = 3) => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
      try {
        const response = await axios.get(url);
        const data = response.data.routes[0];

        const route = data.geometry.coordinates;
        const geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route,
          },
        };

        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else {
          map.addSource('route', {
            type: 'geojson',
            data: geojson,
          });
          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#0074d9',
              'line-width': 5,
            },
          });
        }

        const bounds = new mapboxgl.LngLatBounds(start, start);
        for (const coord of route) {
          bounds.extend(coord);
        }
        map.fitBounds(bounds, { padding: 50 });
      } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
          setTimeout(() => {
            getRoute(start, end, retries - 1);
          }, 1000 * Math.pow(2, 3 - retries));
        } else {
          console.error('Error fetching route:', error);
        }
      }
    };

    map.on('load', () => {
      getRoute(origin, receiverLocation);
    });

    const updateReceiverLocation = (newLocation) => {
      // console.log('Updating receiver location:', newLocation);
      receiverMarker.setLngLat(newLocation);
      getRoute(origin, newLocation);
    };

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const newLocation = [longitude, latitude];
      setReceiverLocation(newLocation);
      updateReceiverLocation(newLocation);
    };

    const handleError = (error) => {
      console.error('Error getting geolocation:', error);
    };

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    };

    const requestLocationPermission = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleSuccess(position);
            navigator.geolocation.watchPosition(handleSuccess, handleError, geolocationOptions);
          },
          handleError,
          geolocationOptions
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    requestLocationPermission();

    const calculateDistance = (coord1, coord2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const [lon1, lat1] = coord1;
      const [lon2, lat2] = coord2;

      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance; 
    };

    const distanceButton = document.createElement('button');
    distanceButton.textContent = 'Show Distance';
    distanceButton.className = 'mapboxgl-ctrl mapboxgl-ctrl-group map-button';
    distanceButton.onclick = () => {
      const distance = calculateDistance(origin, receiverLocation);
      alert(`Distance between sender and receiver: ${distance.toFixed(2)} km`);
      if (distance < 0.1 && !isModalDismissed) {
        setIsModalOpen(true);
      }
    };

    const zoomInButton = document.createElement('button');
    zoomInButton.textContent = '+';
    zoomInButton.className = 'mapboxgl-ctrl mapboxgl-ctrl-group map-button';
    zoomInButton.onclick = () => {
      map.zoomIn();
    };

    const zoomOutButton = document.createElement('button');
    zoomOutButton.textContent = '-';
    zoomOutButton.className = 'mapboxgl-ctrl mapboxgl-ctrl-group map-button';
    zoomOutButton.onclick = () => {
      map.zoomOut();
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'map-buttons-container';
    buttonContainer.appendChild(distanceButton);
    buttonContainer.appendChild(zoomInButton);
    buttonContainer.appendChild(zoomOutButton);

    map.getContainer().appendChild(buttonContainer);
    const intervalId = setInterval(() => {
      const distance = calculateDistance(origin, receiverLocation);
      // console.log(`Distance between sender and receiver: ${distance.toFixed(2)} km`);
      if (distance < 0.1 && !isModalDismissed) {
        setIsModalOpen(true);
      }
    }, 30000);

    
    return () => {
      clearInterval(intervalId);
      if (map) {
        map.remove();
      }
    };
  }, [receiverLocation]);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalDismissed(true);
  };

  return <>
    <div className="h-screen relative" ref={mapContainerRef} />;
    <Modal isOpen={isModalOpen} onClose={closeModal} />
  </> 
};

export default Map;