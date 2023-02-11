import React from "react";
import "./properties.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton, Pagination, Tooltip } from "@mui/material";
import { MdOutlineDoDisturbOn } from "react-icons/md";
import { BsFillHeartFill } from "react-icons/bs";
import { PropertiesArray } from "../../App";
import { useContext } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Properties = ({
  area,
  setArea,
  maxBeds,
  maxPrice,
  minBeds,
  minPrice,
}) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [properties, setProperties] = useContext(PropertiesArray);
  const [user] = useAuthState(auth);

  const addProperty = (listing) => {
    if (selectedId === listing.listing_id) {
      setSelectedId(null);
      setProperties(
        properties.filter((item) => item.listing_id !== listing.listing_id)
      );
      localStorage.setItem(
        "properties",
        JSON.stringify(
          properties.filter((item) => item.listing_id !== listing.listing_id)
        )
      );
    } else {
      setSelectedId(listing.listing_id);
      setProperties([...properties, listing]);
      localStorage.setItem(
        "properties",
        JSON.stringify([...properties, listing])
      );
    }
  };

  useEffect(() => {
    const storedArea = localStorage.getItem("area");
    if (storedArea) {
      setArea(storedArea);
    }
    const storedProperties = localStorage.getItem("properties");
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
    if (area) {
      setLoading(true);
      setPagination(true);
      localStorage.setItem("area", area);
      const getListings = async () => {
        const options = {
          method: "GET",
          url: "https://zoopla.p.rapidapi.com/properties/list",
          params: {
            area: area,
            category: "residential",
            order_by: "age",
            ordering: "descending",
            page_number: currentPage,
            page_size: "12",
            maximum_beds: maxBeds,
            minimum_beds: minBeds,
            maximum_price: maxPrice,
            minimum_price: minPrice,
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "zoopla.p.rapidapi.com",
          },
        };

        await axios
          .request(options)
          .then(function (response) {
            setListings(response.data.listing);
            setLoading(false);
            setPagination(true);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
            setPagination(false);
          });
      };
      getListings();
    }
  }, [area, maxBeds, maxPrice, minBeds, minPrice, currentPage]);

  return (
    <>
      <motion.div className="properties">
        {loading ? (
          <CircularProgress className="load_icon" color="success" size={60} />
        ) : (
          listings.map((listing, i) => (
            <motion.div
              className="listings"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
              }}
              key={listing.listing_id}
            >
              <Link
                key={listing.listing_id}
                to={`/listings/${listing.listing_id}`}
              >
                <motion.img src={listing.image_645_430_url} alt="" />
              </Link>
              <p>
                <span>{listing.title}</span> <br></br>
                {listing.displayable_address}
              </p>
              <div>
                <p>£{listing.rental_prices["per_month"]} PCM</p>
                {user && (
                  <motion.div
                    className="icon"
                    whileTap={{
                      scale: 1.2,
                    }}
                    whileHover={{
                      scale: 1.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    <IconButton onClick={() => addProperty(listing)}>
                      {selectedId === listing.listing_id ? (
                        <MdOutlineDoDisturbOn style={{ color: "#db243d" }} />
                      ) : (
                        <BsFillHeartFill style={{ color: "#db243d" }} />
                      )}
                    </IconButton>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
      <div className="pagination">
        {!loading && pagination ? (
          <div className="pagination_component">
            <Pagination
              count={5}
              color="primary"
              sx={{ button: { color: "#ADEFD1FF" } }}
              size="large"
              page={currentPage}
              onChange={(event, newPage) => setCurrentPage(newPage)}
              className="pagination_navigate"
            />
            Page: {currentPage}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Properties;
