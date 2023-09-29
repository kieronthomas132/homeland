import React, { useState } from "react";
import "./search.css";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Properties from "../Properties/Properties";

const search_input_animation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 2.5,
    },
  },
};

const Search = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [area, setArea] = useState("");

  const getProperties = async () => {
    const options = {
      method: "GET",
      url: "https://zoopla.p.rapidapi.com/auto-complete",
      params: { search_term: location, search_type: "listings" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "zoopla.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        setArea(response.data.suggestions[0].value);
      })
      .catch(function (error) {
        console.error(
          "an error has occurred, this could be due to an expired axios requests. This should be sorted soon"
        );
      });
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getProperties();
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleSubmit} className="form">
      <motion.div
        className="search_inputs"
        variants={search_input_animation}
        initial="hidden"
        animate="visible"
      >
        <TextField
          id="outlined-basic"
          label="Location"
          variant="standard"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ input: { color: "white" } }}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel className="min_price">Min Price</InputLabel>
          <Select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            sx={{ color: "white" }}
            variant="standard"
          >
            <MenuItem value="Min Price">Min Price</MenuItem>
            <MenuItem value={100}>100PCM</MenuItem>
            <MenuItem value={300}>300PCM</MenuItem>
            <MenuItem value={600}>600PCM</MenuItem>
            <MenuItem value={900}>900PCM</MenuItem>
            <MenuItem value={1200}>1200PCM</MenuItem>
            <MenuItem value={1500}>1500PCM</MenuItem>
            <MenuItem value={1800}>1800PCM</MenuItem>
            <MenuItem value={2100}>2100PCM</MenuItem>
            <MenuItem value={2400}>2400PCM</MenuItem>
            <MenuItem value={2700}>2700PCM</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          variant="standard"
        >
          <InputLabel className="max_price">Max Price</InputLabel>
          <Select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{ color: "white" }}
          >
            <MenuItem value="Max Price">Max Price</MenuItem>
            <MenuItem value={100}>100PCM</MenuItem>
            <MenuItem value={300}>300PCM</MenuItem>
            <MenuItem value={600}>600PCM</MenuItem>
            <MenuItem value={900}>900PCM</MenuItem>
            <MenuItem value={1200}>1200PCM</MenuItem>
            <MenuItem value={1500}>1500PCM</MenuItem>
            <MenuItem value={1800}>1800PCM</MenuItem>
            <MenuItem value={2100}>2100PCM</MenuItem>
            <MenuItem value={2400}>2400PCM</MenuItem>
            <MenuItem value={2700}>2700PCM</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          variant="standard"
        >
          <InputLabel>Min Beds</InputLabel>
          <Select
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
            sx={{ color: "white" }}
          >
            <MenuItem value="Min Beds">Min Beds</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          variant="standard"
        >
          <InputLabel>Max Beds</InputLabel>
          <Select
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value)}
            sx={{ color: "white" }}
          >
            <MenuItem value="Max Beds">Max Beds</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </motion.div>
      <Properties
        area={area}
        setArea={setArea}
        maxBeds={maxBeds}
        minBeds={minBeds}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
    </form>
  );
};

export default Search;
