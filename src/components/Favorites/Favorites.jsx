import React, { useEffect } from "react";
import "./favorites.css";
import { PropertiesArray } from "../../App";
import { useContext } from "react";
import { Tooltip, Typography } from "@mui/material";
import { MdOutlineDoDisturbOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Favorites = () => {
  const [properties, setProperties] = useContext(PropertiesArray);
  const removeProperty = (property) => {
    setProperties(
      properties.filter((p) => p.listing_id !== property.listing_id)
    );
    localStorage.setItem(
      "properties",
      JSON.stringify(
        properties.filter((p) => p.listing_id !== property.listing_id)
      )
    );
  };

  useEffect(() => {
    const storedProperties = localStorage.getItem("properties");
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  });

  return (
    <div className="main">
      <Typography variant="h4">Your Favorites</Typography>
      <div className="properties_list">
        {properties.map((property) => (
          <>
            <div className="property_item" key={property.listing_id}>
              <Link
                key={property.listing_id}
                to={`/listings/${property.listing_id}`}
              >
                <img src={property.image_645_430_url} alt={property.title} />
              </Link>
              <p>{property.title}</p>
              <p>{property.displayable_address}</p>
              <p>
                To {property.listing_status}: £
                {property.rental_prices["per_month"]} PCM
              </p>
              <motion.div
                className="remove_like"
                whileTap={{
                  scale: 1.2,
                }}
                whileHover={{
                  scale: 1.5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                  <MdOutlineDoDisturbOn
                    style={{
                      color: "#db243d",
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                    onClick={() => removeProperty(property)}
                  />
              </motion.div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
