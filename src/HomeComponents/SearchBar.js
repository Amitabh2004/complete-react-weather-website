import React, { useState } from "react";
import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export default function SearchBar({ handleCityNameChange }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (input) => {
    setQuery(input);
    fetchSuggestions(input);
  };

  const fetchSuggestions = async (input) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
        GEO_API_OPTIONS
      );

      const cities = response.data.data.map((city) => ({
        name: city.name,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude,
      }));

      setSuggestions(cities);
    } catch (error) {
      console.log("Error fetching city suggestions: ", error);
    }
  };

  const handleSuggestionClick = (name, latitude, longitude) => {
    setQuery(name);
    setSuggestions([]);
    handleCityNameChange({ name, latitude, longitude });
  };

  return (
    <div className="searchbar-div">
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for cities"
        className="search-bar"
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() =>
              handleSuggestionClick(
                suggestion.name,
                suggestion.latitude,
                suggestion.longitude
              )
            }
            className="suggestion-list-element"
          >
            {suggestion.name}, {suggestion.countryCode}
          </li>
        ))}
      </ul>
    </div>
  );
}
