import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/map-box.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { db } from "../../src/firebase-config";
import {
  collection,
  onSnapshot,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const MapBox = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FzdW5ncDIyIiwiYSI6ImNsaHJlZTVmeDAydjMzY24zcDI5OG9qdjIifQ.6o1VJpDKm2-wiu5R85M-aA";

    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.longitude != null) {
        addDoc(collection(db, "Location"), {
          Coordinates: [position.coords.longitude, position.coords.latitude],
          Title: "Current Location",
        });
      }
    });

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [80.636696, 7.891418],
      zoom: 6.5,
    });

    map.on("load", () => {
      const data = onSnapshot(collection(db, "Location"), (snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().Coordinates[0] != null) {
            new mapboxgl.Marker().setLngLat(doc.data().Coordinates).addTo(map);
            console.log(JSON.stringify(doc.data().Coordinates));
          } else {
            return;
          }
        });
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="map-container-outer">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
