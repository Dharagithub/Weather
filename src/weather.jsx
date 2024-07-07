import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db4c934ba43c482e41b7404a0f0b68f1&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 text-white">
      <h1 className="text-5xl font-bold mb-8 animate-fade-in">Weather App</h1>
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          className="p-3 px-5 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition duration-300 shadow-md"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="p-3 px-5 bg-blue-600 transition duration-300 text-white rounded-md focus:outline-none shadow-md"
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>
      {weather && (
        <div className="p-6 rounded-md text-center animate-fade-in mt-4 w-80 sm:w-96 font-bold mb-2">
            <h2 className="text-3xl">{weather.name}</h2>
            <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto mt-4 animate-bounce"
          />
          <p className="text-5xl">{weather.main.temp}°C</p>
          <p className="text-2xl">{weather.weather[0].main}</p>
          <p className="text-xl">{weather.weather[0].description}</p>
          
        </div>
      )}
    </div>
  );
};

export default Weather;
