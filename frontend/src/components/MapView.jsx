import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

const MapView = ({ searchResults, userLocation }) => {
  useEffect(() => {
    if (!userLocation) return;

    const map = L.map("map").setView([userLocation.lat, userLocation.lon], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker for user's current location
    L.marker([userLocation.lat, userLocation.lon])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    // Add markers for search results
    const markersLayer = L.layerGroup().addTo(map);
    searchResults.forEach((item) => {
      if (item.latitude && item.longitude) {
        const marker = L.marker([item.latitude, item.longitude]).bindPopup(
          `<b>${item.name}</b><br>${item.description}`
        );

        marker.addTo(markersLayer).on("click", () => {
          // Add a route between user's location and the clicked result
          L.Routing.control({
            waypoints: [
              L.latLng(userLocation.lat, userLocation.lon),
              L.latLng(item.latitude, item.longitude),
            ],
            routeWhileDragging: true,
          }).addTo(map);
        });
      }
    });

    return () => {
      map.remove(); // Cleanup map instance on unmount
    };
  }, [searchResults, userLocation]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapView;
