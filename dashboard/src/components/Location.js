// import React, { useRef } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import Tabs from "./tabs";
// import axios from "axios";

// import { useEffect, useState } from "react";
// import { Autocomplete } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100vh",
// };

// const center = {
//   lat: 28.628,
//   lng: 77.3649,
// };

// const getMarkerIcon = (category) => {
//   switch (category) {
//     case "water":
//       return "http://localhost:5001/public/media/water.jpeg";
//     case "Road Maintaince":
//       return "http://localhost:5001/public/media/road.jpeg";
//     case "stray_animals":
//       return "http://localhost:5001/public/media/stray.jpeg";
//     case "electricity":
//       return "http://localhost:5001/public/media/electricity.jpeg";
//     case "garbage":
//       return "http://localhost:5001/public/media/garbage.jpeg";
//     case "sanitation":
//       return "http://localhost:5001/public/media/garbage.jpeg";
//     default:
//       return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
//   }
// };

// function Location() {
//   const [complaint, setComplaints] = useState([]);
//   const mapRef = useRef();
//   const autoCompleteRef = useRef(null);

//   const org_info = JSON.parse(
//         localStorage.getItem("organization")
//       ).Organization;
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.post(
//           `http://localhost:5001/all_complaints_coordinates_category/${org_info.category}`
//         );
//         setComplaints(response.data.allComplaints);
//       } catch (error) {
//         console.error("Error fetching complaints:", error);
//       }
//     };
//     fetchComplaints();
//   }, []);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyC-T23lK4Ay-1--rq6EsQPL8BPUVWEJygY",
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   useEffect(() => {
//     if (map) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           map.setCenter(pos);
//           new window.google.maps.Marker({
//             position: pos,
//             map,
//           });
//         },
//         () => {
//           console.log("Browser doesn't support Geolocation");
//         }
//       );
//     }
//   }, [map]);

//   const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = Autocomplete({
//     requestOptions: {
//       location: { lat: () => center.lat, lng: () => center.lng },
//       radius: 200 * 1000,
//     },
//   });

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = ({ description }) => () => {
//     setValue(description, false);
//     clearSuggestions();

//     const request = {
//       query: description,
//       fields: ["name", "geometry"],
//     };

//     const service = new window.google.maps.places.PlacesService(map);

//     service.findPlaceFromQuery(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
//         map.setCenter(results[0].geometry.location);
//         new window.google.maps.Marker({
//           position: results[0].geometry.location,
//           map,
//         });
//       }
//     });
//   };

//   return isLoaded ? (
//     <>
//       {console.log(complaint)}
//       <Tabs />
//       <div style={{ position: "absolute", zIndex: 1, top: 20, left: "50%", transform: "translateX(-50%)" }}>
//         <input
//           ref={autoCompleteRef}
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//           placeholder="Enter an address"
//           style={{ padding: 10, width: 300, borderRadius: 8 }}
//         />
//         <ul>
//           {status === "OK" &&
//             data.map((suggestion) => {
//               const { description } = suggestion;
//               return (
//                 <li key={description} onClick={handleSelect(suggestion)} style={{ padding: 10, cursor: "pointer" }}>
//                   {description}
//                 </li>
//               );
//             })}
//         </ul>
//       </div>
//       <GoogleMap
//         ref={mapRef}
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={20}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         options={{
//           mapTypeControl: false,
//           streetViewControl: false,
//         }}
//       >
//         {complaint.map((complaint) => (
//           <Marker
//             key={complaint._id}
//             position={{
//               lat: complaint.locationInfo.latitude,
//               lng: complaint.locationInfo.longitude,
//             }}
//             icon={{
//               url: getMarkerIcon(complaint.type),
//               scaledSize: new window.google.maps.Size(30, 30),
//             }}
//           ></Marker>
//         ))}
//         <></>
//       </GoogleMap>
//     </>
//   ) : (
//     <></>
//   );
// }

// export default React.memo(Location);




import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Tabs from "./tabs";
import axios from "axios";

import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 28.628,
  lng: 77.3649,
};

const getMarkerIcon = (category) => {
  switch (category) {
    case "water":
      return "http://localhost:5001/public/media/water.jpeg";
    case "Road Maintaince":
      return "http://localhost:5001/public/media/road.jpeg";
    case "stray_animals":
      return "http://localhost:5001/public/media/stray.jpeg";
    case "electricity":
      return "http://localhost:5001/public/media/electricity.jpeg";
    case "garbage":
      return "http://localhost:5001/public/media/garbage.jpeg";
    case "sanitation":
      return "http://localhost:5001/public/media/garbage.jpeg";
    default:
      return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  }
};

function Location() {
  const [complaint, setComplaints] = useState([]);
  const mapref = useRef();
  const org_info = JSON.parse(
    localStorage.getItem("organization")
  ).Organization;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5001/all_complaints_coordinates_category/${org_info.category}`
        );
        setComplaints(response.data.allComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC-T23lK4Ay-1--rq6EsQPL8BPUVWEJygY",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      {console.log(complaint)}
      <Tabs />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {complaint.map((complaint) => (
          <MarkerF
            key={complaint._id}
            position={{
              lat: complaint.locationInfo.latitude,
              lng: complaint.locationInfo.longitude,
            }}
            icon={{
              url: getMarkerIcon(complaint.type),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          ></MarkerF>
        ))}
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Location);
