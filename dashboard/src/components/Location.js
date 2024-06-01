
import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Tabs from "./tabs";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100vh",
  marginLeft: "10px",
};

const center = {
  lat: 28.6312,
  lng: 77.3709,
};

const Location = () => {
  const [complaints, setComplaints] = useState([]);
  const [directions, setDirections] = useState(null);
  // eslint-disable-next-line
  const [directionsError, setDirectionsError] = useState(null);
  // eslint-disable-next-line
  const [selectedMarker, setSelectedMarker] = useState(null);

  const org_info = JSON.parse(
    localStorage.getItem("organization")
  ).Organization;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.post(
          `https://citycare.onrender.com/all_complaints_coordinates_category/${org_info.category}`
        );
        setComplaints(response.data.allComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, [org_info.category]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const calculateDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setDirectionsError("Error fetching directions");
        }
      }
    );
  };

  const handleMarkerClick = (complaint) => {
    const { latitude, longitude } = complaint.locationInfo;
    const destination = new window.google.maps.LatLng(latitude, longitude);
    setSelectedMarker(complaint);
    calculateDirections(center, destination);
  };
  // eslint-disable-next-line
  const clearDirections = () => {
    setDirections(null);
    setDirectionsError(null);
    setSelectedMarker(null);
  };

  const getMarkerIcon = (category) => {
    switch (category) {
      case "water":
        return "https://citycare.onrender.com/public/media/water.jpeg";
      case "Road Maintaince":
        return "https://citycare.onrender.com/public/media/road.jpeg";
      case "stray_animals":
        return "https://citycare.onrender.com/public/media/stray.jpeg";
      case "electricity":
        return "https://citycare.onrender.com/public/media/electricity.jpeg";
      case "garbage":
        return "https://citycare.onrender.com/public/media/garbage.jpeg";
      case "sanitation":
        return "https://citycare.onrender.com/public/media/garbage.jpeg";
      default:
        return "";
    }
  };

  return isLoaded ? (
    <>
      <Tabs />
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {complaints.map((complaint) => (
          <Marker
            key={complaint._id}
            position={{
              lat: complaint.locationInfo.latitude,
              lng: complaint.locationInfo.longitude,
            }}
            onClick={() => handleMarkerClick(complaint)}
            icon={{
              url: getMarkerIcon(complaint.type),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default React.memo(Location);
