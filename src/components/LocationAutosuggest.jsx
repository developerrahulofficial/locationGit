import React, { useState, useRef } from "react";
import { LOCATION_OPTIONS } from "../components/LocationOptions";
import { IoSearch } from "react-icons/io5";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

//Search input custom styles
const customStyles = {
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    maxWidth: "10rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  container: (provided) => ({
    ...provided,
    marginBottom: "0rem",
    fontFamily: "Helvetica",
    width: "14rem",
    zIndex: 50,
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
    marginTop: "0px",
    maxWidth: "10rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#070707",
    color: "white",
    borderColor: "gray",
    boxShadow: "0 0 0 1px gray",
    overflow: "hidden",
  }),
  menuList: (provided) => ({
    ...provided,
    MaxHeight: "15.5rem",
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  }),

  control: (provided, state) => ({
    ...provided,
    background: "#070707",
    fontFamily: "Helvetica",
    borderColor: "lightgray",
    borderWidth: "1px",
    boxShadow: state.isFocused ? "0 0 0 1px white" : null,
    color: "white",
    borderRadius: "0.5rem",
    "&:hover": {
      borderColor: "gray",
    },
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : provided.color,
    backgroundColor: state.isFocused ? "#171717" : null,
  }),
};

const LocationAutosuggest = ({ selectedCity, onCityChange }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef();

  const filterOption = (option, inputValue) => {
    if (option.data.__isNew__) {
      return true;
    }
    return inputValue.length >= 1 && option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  const noOptionsMessage = ({ inputValue }) => {
    if (inputValue.length < 1) return null;
    return "No Options";
  };

  const selectedValue = LOCATION_OPTIONS.find((option) => option.value === selectedCity) || { label: selectedCity, value: selectedCity };

  const ValueContainer = ({ children, ...props }) => (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
      <IoSearch style={{ marginBottom: "0px", marginRight: "8px" }} />
      {children}
    </div>
  );

  const handleChange = (selectedOption) => {
    if (selectedOption && !selectedOption.__isNew__) {
      setIsLoading(true);
      onCityChange(selectedOption.value, selectedOption.coordinates);
      setTimeout(() => {
        setIsLoading(false);
      }, 850);
    } else if (selectedOption && selectedOption.__isNew__) {
      setIsLoading(true);
      onCityChange(selectedOption.label, [51.507351, -0.127758]);
      setTimeout(() => {
        setIsLoading(false);
      }, 850);
    } else {
      onCityChange("", [51.507351, -0.127758]);
      setTimeout(() => selectRef.current.focus(), 0);
    }

    // Handle navigation here
    if (selectedOption) {
      const city = selectedOption.__isNew__ ? selectedOption.label : selectedOption.value;
      navigate(`/Search?city=${city}`);
    }
  };
  const handleCreate = (inputValue) => {
    setIsLoading(true); // Set isLoading to true when a new option is created
    onCityChange(inputValue, [51.507351, -0.127758]);
    setTimeout(() => {
      setIsLoading(false); // Set isLoading back to false
    }, 850);
    navigate(`/Search?city=${inputValue}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CreatableSelect
          ref={selectRef}
          placeholder=""
          components={{
            DropdownIndicator: null,
            ValueContainer,
          }}
          styles={customStyles}
          className="basic-single pb-4 fade-in1"
          classNamePrefix="select"
          value={selectedValue}
          isClearable={!!selectedValue.value}
          isSearchable={true}
          allowCreateWhileLoading={true}
          formatCreateLabel={(inputValue) => `Try  "${inputValue}"`}
          noOptionsMessage={noOptionsMessage}
          name="location"
          options={LOCATION_OPTIONS}
          filterOption={filterOption}
          onChange={handleChange}
          onCreateOption={handleCreate}
        />
        {isLoading && (
          <div className="text-center pb-4" style={{ marginLeft: "1rem" }}>
            <PulseLoader color={"white"} size={6} loading={isLoading} />
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: "Helvetica",
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1rem",
        }}
      ></div>
    </div>
  );
};

export default LocationAutosuggest;
