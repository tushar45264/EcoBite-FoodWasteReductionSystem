import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";

const MapComponent = ({ onLocationChange }) => {
  const [marker, setMarker] = useState(null);
  console.log("process.env", process.env.MAPBOX_TOKEN);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidHVzaGFyNDUiLCJhIjoiY2xtOWpoZnN1MGtzbDNwbzVnZHU2dzlhcCJ9.ajMoNWOXT4hbizwr9nvxUg";
    console.log("Initializing map...");

    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [23.2323, 83.323],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    console.log("Navigation control added.");

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(geocoder, "top-left");
    console.log("Geocoder control added.");

    geocoder.on("result", (event) => {
      const { result } = event;
      const [lng, lat] = result.center;
      console.log("Geocoder result:", { lng, lat });

      updateMarkerPosition([lng, lat]);
      onLocationChange({ lng, lat });

      //   localStorage.setItem('searchedLocation', JSON.stringify({ lng, lat }));
    });

    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      console.log("Map clicked at:", { lng, lat });

      updateMarkerPosition([lng, lat]);
      onLocationChange({ lng, lat });

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

    return () => {
      console.log("Cleaning up map instance...");
      map.remove();
    };
  }, [marker]);

  return <div id="map-container" className="w-full h-96 relative" />;
};

export default MapComponent;
