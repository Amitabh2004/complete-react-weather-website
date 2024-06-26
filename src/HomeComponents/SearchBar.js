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

  const handleInputChange = async (input) => {
    setQuery(input);
    if (input.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${input}`,
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.length > 0 && suggestions.length > 0) {
      const selectedCity = suggestions[0]; // Assuming the first suggestion is selected
      handleCityNameChange(selectedCity);
      setQuery(""); // Clear the input after selecting a suggestion
      setSuggestions([]); // Clear suggestions
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
        onKeyPress={handleKeyPress}
        placeholder="Search for cities"
        className="search-bar"
      />

      {suggestions.length > 0 && (
        <ul className="list-div">
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
      )}
    </div>
  );
}
