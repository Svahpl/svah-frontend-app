import axios from "axios";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const LocationUI = () => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  // Get Coordinates using Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation is not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setUserLatitude(latitude);
      setUserLongitude(longitude);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  // Call API once coordinates are available
  useEffect(() => {
    if (userLatitude !== null && userLongitude !== null) {
      const getlocation = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${
              import.meta.env.VITE_OPEN_WEATHER_API_KEY
            }&units=metric`
          );
          console.log(response.data);
        } catch (error) {
          console.log("Error getting user's location:", error);
        }
      };
      getlocation();
    }
  }, [userLatitude, userLongitude]); // <- This effect runs when lat/lon changes

  return (
    <div className="bg-mobile-green lg:bg-white lg:text-black text-white h-10 content-center lg:max-w-7xl lg:mx-auto lg:px-4 sm:px-6">
      <span className="flex">
        <MapPin className="mx-2" size={20} /> Deliver to Viral
        <span className="ml-2">-</span>
        <span className="city-name ml-2">Junagadh 362001</span>
      </span>
    </div>
  );
};

export default LocationUI;
