<template>
  <div class="container">
    <h1>Weather Information</h1>
    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys?.country }}</h2>
      <div v-if="weatherData.weather && weatherData.weather[0]">
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
        <p>{{ weatherData.weather[0].description }}</p>
      </div>
    </div>
    <div v-else>
      <p>No weather data available. Please try again later.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  computed: {
    temperature() {
      return this.weatherData && this.weatherData.main
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData && this.weatherData.weather && this.weatherData.weather[0]
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    console.log("API URL:", import.meta.env.VITE_WEATHER_API_URL);
  console.log("API Key:", import.meta.env.VITE_WEATHER_API_KEY);
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `${import.meta.env.VITE_WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            await this.fetchWeatherData(url);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            alert("Failed to get your location. Please check your location settings.");
          }
        );

      }
    },
    async fetchWeatherData(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      this.weatherData = response.data;
    } else {
      console.error("Failed to fetch weather data:", response.status);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
},

  },
};
</script>


  
  
<style scoped>
  .container {
    padding: 20px;
    text-align: center;
  }
  
  img {
    width: 100px;
    height: 100px;
  }
  </style>
  
