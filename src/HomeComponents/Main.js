import React,{useState,useEffect} from "react";
import axios from 'axios';
import "./main.css";
import * as openWeatherApi from "../API'S/openWeatherApi"
import useIPLocation from "../API'S/IPLocation ";
import SideBar from "./Sidebar";
import SearchBar from "./SearchBar";
import SunnyImg from "../images/icons/01d.png";
import ClearSkyNight from "../images/icons/01n.png";
import FewCloudsDay from "../images/icons/02d.png";
import FewCloudsNight from "../images/icons/02n.png";
import ScatteredClouds from "../images/icons/03d.png"; 
import BrokenClouds from "../images/icons/04d.png";
import ShowerRain from "../images/icons/09d.png"; 
import RainDay from "../images/icons/10d.png";
import RainNight from "../images/icons/10n.png";
import Thunderstorm from "../images/icons/11d.png";
import Snow from "../images/icons/13d.png"; 
import Mist from "../images/icons/50d.png"; 
import UnknownWeather from "../images/icons/unknown.png";
import ThermometerImg from "../images/Thermometer.png";
import WindImg from "../images/Winds.png";
import DropImg from "../images/RainDrop.png";
import HumidityImg from "../images/Humidity.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import convertTo12HourFormat from "./utilities.js/convertTo12HourFormat";


export default function Main() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  const locationData = useIPLocation();

  useEffect(() => {
    const fetchInitialWeather = async () => {
      if (locationData) {
        try {
          const { lat, lon } = locationData;
          const [weather, forecast] = await openWeatherApi.fetchWeatherData(
            lat,
            lon
          );
          setWeatherData(weather);
          setForecastData(forecast);
        } catch (error) {
          console.error("Error fetching initial weather data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInitialWeather();
  }, [locationData]);

  const handleCityNameChange = async (city) => {
    const { latitude, longitude } = city;
    try {
      setLoading(true);
      const [weather, forecast] = await openWeatherApi.fetchWeatherData(
        latitude,
        longitude
      );
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather data", error);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };
  const aggregatedData = forecastData
    ? aggregateDailyData(groupDataByDay(forecastData))
    : [];

  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%", position: "fixed", top: 0, left: 0 }}>
          <LinearProgress />
        </Box>
      )}
      <div className="flex">
        <div className="flex-1">
          <SideBar />
        </div>
        <div className="flex-2-3-main">
          <div className="flex-2">
            <SearchBar handleCityNameChange={handleCityNameChange} />
            <Temperature
              weatherData={weatherData}
              loading={loading}
              forecastData={forecastData}
            />
            <TodaysForecast loading={loading} forecastData={forecastData} />
            <Airconditions
              weatherData={weatherData}
              forecastData={forecastData}
              loading={loading}
            />
          </div>
          <div className="flex-3">
            <SevenDayForecast forecast={aggregatedData} />
          </div>
        </div>
      </div>
    </div>
  );
}

 function getWeatherIcon(iconCode) {
  let iconUrl;

  switch (iconCode) {
    case "01d":
      iconUrl = SunnyImg;
      break;
    case "01n":
      iconUrl = ClearSkyNight;
      break;
    case "02d":
      iconUrl = FewCloudsDay;
      break;
    case "02n":
      iconUrl = FewCloudsNight;
      break;
    case "03d":
    case "03n":
      iconUrl = ScatteredClouds;
      break;
    case "04d":
    case "04n":
      iconUrl = BrokenClouds;
      break;
    case "09d":
    case "09n":
      iconUrl = ShowerRain;
      break;
    case "10d":
      iconUrl = RainDay;
      break;
    case "10n":
      iconUrl = RainNight;
      break;
    case "11d":
    case "11n":
      iconUrl = Thunderstorm;
      break;
    case "13d":
    case "13n":
      iconUrl = Snow;
      break;
    case "50d":
    case "50n":
      iconUrl = Mist;
      break;
    default:
      iconUrl = UnknownWeather;
      break;
  }

  return iconUrl;
}

function Temperature({ weatherData, loading ,forecastData}) {

  if (!weatherData || !forecastData) {
    return (
      <div style={{height:"100%", margin:"60px 0px" ,display:"flex",alignItems:"center",justifyContent:"center"}}>
         <CircularProgress />
      </div>
    );
  }
    let chanceOfRain = "0%";
    if (forecastData && forecastData.list && forecastData.list.length > 0) {
      const firstForecast = forecastData.list[0];
      if (firstForecast.pop && firstForecast.pop !== undefined) {
        chanceOfRain = `${Math.round(firstForecast.pop * 100)}%`;
      }
    }

const iconUrl = getWeatherIcon(weatherData.weather[0].icon);

  return (
    <div className="temp-box">
      <div className="statistics-box">
        <div className="city-box">
          <span className="city-text">{weatherData.name}</span>
          <span className="chance-text">
            Chance of rain:{" "}{chanceOfRain}
          </span>
          <span className="degree-text">{`${Math.round(
            weatherData.main.temp
          )}°C`}</span>
        </div>
      </div>
      <div className="img-box">
        <img src={iconUrl} alt="weather-condition" className="cond-img" />
      </div>
    </div>
  );
}


function TodaysForecast({loading , forecastData}) {
    if (loading || !forecastData) {
      return (
        <div
          style={{
            height: "100%",
            margin: "60px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      );
    }


  return (
    <div className="todays-forecast-box">
      <div className="forecast-text-box">
        <span className="forecast-text">TODAY'S FORECAST</span>
        <div className="big-forecast-box">
          <div className="f-1-div">
            {forecastData.list.slice(1, 4).map((forecast, index) => (
              <React.Fragment key={index}>
                <VerticalLine />
                <ForecastComponent forecast={forecast} 
                forecastData={forecastData}
                />
              </React.Fragment>
            ))}
            <VerticalLine />
          </div>
          <div className="f-2-div">
            {forecastData.list.slice(4, 7).map((forecast, index) => (
              <React.Fragment key={index}>
                <VerticalLine />
                <ForecastComponent forecast={forecast}
                forecastData={forecastData} />
              </React.Fragment>
            ))}
            <VerticalLine />
          </div>
        </div>
      </div>
    </div>
  );
}
function VerticalLine(){
    return (
        <div className="vertical-line"></div>
    );
}

function ForecastComponent({forecast,forecastData}) {
  if(!forecastData){
    return null;
  }
  const isNow = forecast === forecastData.list[1];
  const dateTime = new Date(forecast.dt_txt);
  const temp_time = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const time = isNow? "Now": convertTo12HourFormat(temp_time);

  const iconUrl = getWeatherIcon(forecast.weather[0].icon);
  const temperature = Math.round((forecast.main.temp));
  return (
    <div className="forecast-box">
      <span className="time">{time}</span>
      <img src={iconUrl} alt="img.." className="small-cond-img" />
      <span className="forecast-temp">{temperature}&deg;</span>
    </div>
  );
}

function Airconditions({ weatherData, loading, forecastData }) {

  if (!weatherData || !forecastData) {
    return null;
  }

  const realFeel = weatherData.main
    ? `${Math.round(weatherData.main.feels_like)}°`
    : "";

  let chanceOfRain = "0%";
  if (forecastData && forecastData.list && forecastData.list.length > 0) {
    const firstForecast = forecastData.list[0];
    if (firstForecast.pop && firstForecast.pop !== undefined) {
      chanceOfRain = `${Math.round(firstForecast.pop * 100)}%`;
    }
  }

  const windSpeed = weatherData.wind ? `${weatherData.wind.speed} km/h` : "";
  const pressure = weatherData.main ? `${weatherData.main.humidity}%` : "";

  return (
    <div className="air-condition-box">
      <div className="one-flex">
        <span className="air-condition-text">AIR CONDITIONS</span>
        <AirconditionComponent
          icon={ThermometerImg}
          text="Real Feel"
          statistics={realFeel}
        />
        <AirconditionComponent
          icon={DropImg}
          text="Chance of rain"
          statistics={chanceOfRain}
        />
      </div>
      <div className="tp-flex"></div>
      <div className="two-three-main-flex">
        <div className="two-flex">
          <AirconditionComponent
            icon={WindImg}
            text="Wind"
            statistics={windSpeed}
          />
          <AirconditionComponent
            icon={HumidityImg}
            text="Humidity"
            statistics={pressure}
          />
        </div>
        <div className="three-flex">
          <button className="see-more-btn">See more</button>
        </div>
      </div>
    </div>
  );
}


function AirconditionComponent({ icon, text, statistics }) {
  return (
    <div className="real-feel-box">
      <div className="real-feel-img-box">
        <img src={icon} className="feel-img" />
      </div>
      <div className="real-feel-statistics">
        <span className="feel-text">{text}</span>
        <span className="feel-temp">{statistics}</span>
      </div>
    </div>
  );
}

function SevenDayForecast({ forecast }) {
  return (
    <div className="sevenday-box">
      <span className="sevenday-text">7-DAY FORECAST</span>
      {forecast.map((day, index) => (
        <React.Fragment key={index}>
          <SevenDayComponent day={day} isToday={index === 0} />
          {index < forecast.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    </div>
  );
}
function HorizontalLine(){
    return(
        <div className="horizontal-line">
        </div>
    );
}
// Group data by day
const groupDataByDay = (data) => {
  const days = {};

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // Convert Unix timestamp to date
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });

  return days;
};

// Aggregate daily data
const aggregateDailyData = (groupedData) => {
  const dailyData = [];

  for (const date in groupedData) {
    const dayData = groupedData[date];
    const daySummary = {
      date: date,
      dayOfWeek: new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      avgTemp: 0,
      minTemp: Infinity,
      maxTemp: -Infinity,
      condition: "",
      icon: "",
    };

    const weatherConditions = {};
    const weatherIcons = {};

    dayData.forEach((item) => {
      daySummary.avgTemp += item.main.temp;
      if (item.main.temp_min < daySummary.minTemp) {
        daySummary.minTemp = item.main.temp_min;
      }
      if (item.main.temp_max > daySummary.maxTemp) {
        daySummary.maxTemp = item.main.temp_max;
      }

      const condition = item.weather[0].main;
      weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;

      const icon = item.weather[0].icon;
      weatherIcons[icon] = (weatherIcons[icon] || 0) + 1;
    });

    daySummary.avgTemp /= dayData.length;

    // Determine the most frequent weather condition
    daySummary.condition = Object.keys(weatherConditions).reduce((a, b) =>
      weatherConditions[a] > weatherConditions[b] ? a : b
    );

    // Determine the most frequent weather icon
    daySummary.icon = Object.keys(weatherIcons).reduce((a, b) =>
      weatherIcons[a] > weatherIcons[b] ? a : b
    );

    dailyData.push(daySummary);
  }

  return dailyData;
};


function SevenDayComponent({ day, isToday }) {
  const max_temp = Math.round(day.maxTemp);
  const min_temp = Math.round(day.minTemp);
  const iconUrl = getWeatherIcon(day.icon);
  return (
    <div className="big-box">
      <div className="text-box">
        <div className="div-1-seven">
          <span className="seven-text">
            {isToday ? "Today" : day.dayOfWeek}
          </span>
        </div>
        <div className="div-2-seven">
          <div className="cond-box">
            <img src={iconUrl} className="seven-img" alt={day.condition} />
            <span className="seven-cond-text">{day.condition}</span>
          </div>
          <div className="min-max-div">
            <span className="statistics-text-1">{max_temp}</span>
            <span className="statistics-text-2">/{min_temp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

