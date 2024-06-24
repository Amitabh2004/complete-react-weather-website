import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;

export const fetchWeatherData = async (lat, lon) => {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }),
      axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      }),
    ]);

    return [weatherResponse.data, forecastResponse.data];
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    throw error;
  }
};
