import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/map-box.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { db } from "../../src/firebase-config";
import {
  collection,
  onSnapshot,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

export const MapBox = () => {
  const mapContainer = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useParams();

  useEffect(() => {

    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2FzdW5ncDIyIiwiYSI6ImNsaHJlZTVmeDAydjMzY24zcDI5OG9qdjIifQ.6o1VJpDKm2-wiu5R85M-aA";

    const locationRef = collection(db, "Location");
    const q = query(locationRef, where("UserID", "==", user));

    navigator.geolocation.getCurrentPosition((position) => {
      const querySnapshot = getDocs(q);

      querySnapshot
        .then((data) => {
          data.forEach((data) => {
            // setCurrentUser(doc.id);
            if (data.id === null) {
              console.log(currentUser);
              addDoc(collection(db, "Location"), {
                Coordinates: [
                  position.coords.longitude,
                  position.coords.latitude,
                ],
                UserID: user,
              });
            } else {
              console.log("else");
              updateDoc(doc(db, "Location", data.id), {
                Coordinates: [
                  position.coords.longitude,
                  position.coords.latitude,
                ],
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  // if (querySnapshot.empty) {
  //   addDoc(collection(db, "Location"), {
  //     Coordinates: [position.coords.longitude, position.coords.latitude],
  //     UserID: user,
  //   });
  // } else {

  // if (doc.data().Coordinates[0] !== position.coords.latitude) {
  //   updateDoc(doc.ref, {
  //     Coordinates: [
  //       position.coords.longitude,
  //       position.coords.latitude,
  //     ],
  //   });
  // }

  // const userRef = collection(db, "Users");
  // const getUser = async () => {
  //   const q = query(userRef, where("userID", "==", user));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setCurrentUser(doc.data());
  //   });
  // };
  // getUser();
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const locationRef = collection(db, "Location");
  //   const q = query(locationRef, where("UserID", "==", user));
  //   const querySnapshot = getDocs(q);
  //   querySnapshot.then((doc) => {
  //     doc.forEach((doc) => {
  //       if (doc.data().Coordinates[0] != position.coords.latitude) {
  //         updateDoc(doc.ref, {
  //           Coordinates: [
  //             position.coords.longitude,
  //             position.coords.latitude,
  //           ],
  //         });
  //       } else {
  //         addDoc(collection(db, "Location"), {
  //           Coordinates: [
  //             position.coords.longitude,
  //             position.coords.latitude,
  //           ],
  //           Name: currentUser.name,
  //           UserID: user,
  //         });
  //       }
  //     });
  //   });
  // });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [80.636696, 7.891418],
      zoom: 6.5,
    });

    map.on("load", () => {
      onSnapshot(collection(db, "Location"), (snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().Coordinates[0] != null) {
            new mapboxgl.Marker().setLngLat(doc.data().Coordinates).addTo(map);
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
