import React, { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(""); // State to track errors

  // Fetch weather data for the default location on component mount
  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Kanpur";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=ee242581b1cdc4dc77e59ba2badb006e`;
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(""); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching default location data:", error);
      }
    };
    fetchDefaultLocation();
  }, []);

  // Function to fetch weather data for the user-specified location
  const search = async () => {
    if (!location) return; // Prevent API call if location is empty
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ee242581b1cdc4dc77e59ba2badb006e`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(""); // Clear any previous errors
      setLocation("");
    } catch (error) {
      setData({});
      setError("not-found"); // Set an error flag
      console.error("Error fetching weather data:", error);
    }
  };

  // Handle input changes for the location
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  // Get weather icon based on weather type
  const getWeatherIcon = (weatherType) => {
    if (!weatherType) return <i className="bx bxs-cloud"></i>; // Default fallback icon
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Mist":
      case "Haze":
      case "Fog": // Group similar conditions
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>; // Default icon for unknown weather types
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{error ? "Unknown Location" : data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      <div className="weather-data">
        {error === "not-found" ? (
          <div className="error">
            <img
              src="https://media1.tenor.com/m/q4MIQ34n1dEAAAAC/what-confused.gif"
              alt="Location Not Found"
              className="error-gif"
            />
          </div>
        ) : (
          <>
            {data.weather && data.weather[0]
              ? getWeatherIcon(data.weather[0].main)
              : <i className="bx bxs-cloud"></i> /* Fallback if weather data is unavailable */}
            <div className="weather-type">
              {data.weather ? data.weather[0].main : "Unknown"}
            </div>
            <div className="temp">
              {data.main ? `${Math.floor(data.main.temp)}°` : "--"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
