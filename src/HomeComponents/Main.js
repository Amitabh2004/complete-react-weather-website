import React from "react";
import "./main.css";
import SideBar from "./Sidebar";
import SearchBar from "./SearchBar";
import SunnyImg from "../images/Sunny.png";
import ThermometerImg from "../images/Thermometer.png";
import WindImg from "../images/Winds.png";
import DropImg from "../images/RainDrop.png";
import SunImg from "../images/Sun.png";

export default function Main() {
  return (
    <div className="flex">
      <div className="flex-1">
        <SideBar />
      </div>
      <div className="flex-2">
        <SearchBar />
        <Temperature />
        <TodaysForecast />
        <Airconditions />
      </div>
      <div className="flex-3">
        <SevenDayForecast/>
      </div>
    </div>
  );
}

function Temperature() {
  return (
    <div className="temp-box">
      <div className="statistics-box">
        <div className="city-box">
          <span className="city-text">Madrid</span>
          <span className="chance-text">Chance of rain: 0&#37;</span>
          <span className="degree-text">31&deg;</span>
        </div>
      </div>
      <div className="img-box">
        <img
          src={SunnyImg}
          alt="weather-condition loading.."
          className="cond-img"
        />
      </div>
    </div>
  );
}

function TodaysForecast() {
  return (
    <div className="todays-forecast-box">
      <div className="forecast-text-box">
        <span className="forecast-text">TODAY'S FORECAST</span>
        <div className="big-forecast-box">
          <ForecastComponent />
          <VerticalLine />
          <ForecastComponent />
          <VerticalLine />
          <ForecastComponent />
          <VerticalLine />
          <ForecastComponent />
          <VerticalLine />
          <ForecastComponent />
          <VerticalLine />
          <ForecastComponent />
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

function ForecastComponent() {
  return (
    <div className="forecast-box">
      <span className="time">6:00 AM</span>
      <img src={SunnyImg} alt="img.." className="small-cond-img" />
      <span className="forecast-temp">25&deg;</span>
    </div>
  );
}

function Airconditions() {
  return (
    <div className="air-condition-box">
      <div className="one-flex">
        <span className="air-condition-text">AIR CONDITIONS</span>
        <AirconditionComponent
          icon={ThermometerImg}
          text="Real Feel"
          statistics="30&deg;"
        />
        <AirconditionComponent
          icon={DropImg}
          text="Chance of rain"
          statistics="0%;"
        />
      </div>
      <div className="tp-flex">
        
      </div>
      <div className="two-three-main-flex">
        <div className="two-flex">
          <AirconditionComponent
            icon={WindImg}
            text="Wind"
            statistics="0.2 km/h"
          />
          <AirconditionComponent icon={SunImg} text="UV Index" statistics="3" />
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

function SevenDayForecast() {
  return (
    <div className="sevenday-box">
      <span className="sevenday-text">7-DAY FORECAST</span>
      <SevenDayComponent />
      <HorizontalLine />
      <SevenDayComponent />
      <HorizontalLine />
      <SevenDayComponent />
      <HorizontalLine />
      <SevenDayComponent />
      <HorizontalLine />
      <SevenDayComponent />
      <HorizontalLine />
      <SevenDayComponent />
    </div>
  );
}
function HorizontalLine(){
    return(
        <div className="horizontal-line">
        </div>
    );
}
function SevenDayComponent() {
  return (
    <div className="big-box">
      <div className="text-box">
        <span className="seven-text">Today</span>
        <div className="cond-box">
          <img src={SunnyImg} className="seven-img" />
          <span className="seven-cond-text">Sunny</span>
        </div>
        <div className="min-max-div">
          <span className="statistics-text-1">36</span>
          <span className="statistics-text-2">/21</span>
        </div>
      </div>
    </div>
  );
}
