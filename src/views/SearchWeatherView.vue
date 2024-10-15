<template>
    <div class="container">
      <h1>Search Weather by City</h1>
      <input
        v-model="city"
        type="text"
        placeholder="Enter city name, e.g. Clayton, AU"
        class="city-input"
      />
      <button @click="searchWeather" class="search-button">Search</button>
  

      <div v-if="weatherData" class="weather-info">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
          <p>{{ weatherData.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        city: "",
        weatherData: null,
        apiKey: "d3129aaa01ec0708edf4204d4811af95", // own OpenWeatherMap API Key
      };
    },
    computed: {
      // Calculate temperature in degrees Celsius
      temperature() {
        return this.weatherData ? Math.floor(this.weatherData.main.temp) : null;
      },
      // Weather Icon URL
      iconUrl() {
        return this.weatherData
          ? `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
          : null;
      },
    },
    methods: {

      async searchWeather() {
        try {
          const response = await axios.get(
           `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
          );
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          this.weatherData = null;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    padding: 20px;
  }
  
  .city-input {
    padding: 10px;
    width: 300px;
    margin-bottom: 10px;
  }
  
  .search-button {
    padding: 10px 20px;
  }
  
  .weather-info {
    margin-top: 20px;
  }
  </style>
  