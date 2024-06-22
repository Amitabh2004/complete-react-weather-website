import React from "react";
import LogoImage from "../images/Logo.png";
import WeatherImage from "../images/Weather.png";
import CitiesImage from "../images/Cities.svg";
import MapImage from "../images/Map.svg";
import SettingImage from "../images/Setting.png";
import './Sidebar.css';
export default function Sidebar() {
  return (

      <div className="side-bar">
        <Logo img={LogoImage} />
        <Bars logo="Weather" img={WeatherImage} width="21px" />
        <Bars logo="Cities" img={CitiesImage} width="22px" />
        <Bars logo="Map" img={MapImage} width="20px" />
        <Bars logo="Settings" img={SettingImage} width="20px" />
      </div>

  );
}

function Logo({ img }) {
  return (
    <div className="logo-div">
      <img src={img} alt="app-logo" className="logo-img" />
    </div>
  );
}

function Bars({ logo, img, width }) {
  return (
    <div className="bars-div">
      <a href="#" className="page-link">
        <img
          src={img}
          alt="bar-image"
          className="bar-img"
          style={{ width: width }}
        />
        <span className="logo-text">{logo}</span>
      </a>
    </div>
  );
}
