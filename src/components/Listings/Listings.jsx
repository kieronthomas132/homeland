import React, { useEffect } from "react";
import "./listing.css";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {MdBathtub, MdOutlineBedroomParent} from 'react-icons/md';
import Footer from "../Footer/Footer";
const Listings = () => {
  const { id } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading]= useState(false)

  useEffect(() => {
    setLoading(true)
    const options = {
      method: "GET",
      url: "https://zoopla.p.rapidapi.com/properties/list",
      params: {
        listing_id: id,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "zoopla.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.listing);
        setListings(response.data.listing);
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <div className="property_listing">
        {listings.map((listing) => (
          <motion.div key={listing.listing_id} className="listing">
            <a href={listing.details_url} target="_blank" rel="noreferrer">
              <motion.img
                src={listing.image_645_430_url}
                alt={listing.title}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  default: {
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  },
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              />
            </a>
          </motion.div>
        ))}
        <motion.div
          className="property_info"
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 3,
          }}
        >
          <h2>About This Property</h2>
          <div className="property_bio">
            {listings.map((listing) => (
              <>
                <div className="property_infos">
                  <p>{listing.title}</p>
                  <p>{listing.displayable_address}</p>
                  <div className="property_icons">
                    <div className="property_bath">
                      <MdBathtub /> <p>{listing.num_bathrooms}</p>
                    </div>
                    <div className="property_bed">
                      <MdOutlineBedroomParent /> <p>{listing.num_bedrooms}</p>
                    </div>
                  </div>
                  <h3>Description:</h3>
                  <div className="description">
                    <p>{listing.short_description}</p>
                  </div>
                  <div className="rental_status">
                    <h2>
                      <span>To Rent:</span> £
                      {listing.rental_prices["per_month"]} PCM
                    </h2>
                  </div>
                </div>
              </>
            ))}
          </div>
        </motion.div>
      </div>
      {listings && <Footer listings={listings} />}
    </>
  );
};

export default Listings;
