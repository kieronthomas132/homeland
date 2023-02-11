import { Typography, Rating } from "@mui/material";
import { useInView } from "framer-motion";
import React from "react";
import { useRef} from "react";
import { motion } from "framer-motion";
import Home from "../../assets/home_image.jpg";
import "./header.css";
const Header = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div>
    <div className="header" ref={ref}>
      <div
        className="left"
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <Typography variant={"h3"} className="motto">
          Find Your <span>Dream</span> Home With Us
        </Typography>
      </div>
      <motion.div
        className="right"
        style={{
          transform: isInView ? "none" : "translateX(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 2s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
        }}
      >
        <motion.img
          src={Home}
          alt="home_image"
          className="home_img"
        />
      </motion.div>
    </div>
    <motion.div
        className="rating"
        style={{
          transform: isInView ? "none" : "translateY(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
        }}
      >
        <li>
          <Typography component="legend" variant={"h6"} fontWeight={"200"}>
            Trustpilot
            <p>'Wouldn't trust any other estate agent! Brilliant!'</p>
            <p className="review">Linda Carter</p>
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </li>
        <li>
          <Typography component="legend" variant={"h6"} fontWeight={"200"}>
            Yelp
            <p>'Delivers top quality service all the time!'</p>
            <p className="review">Bryan Crayston</p>
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </li>
        <li>
          <Typography
            component="legend"
            variant={"h6"}
            fontWeight={"200"}
          >
            HomeViews
            <p>'Tempted to sell my home again just to deal with these guys!'</p>
            <p className="review">Matthew McConaughey</p>
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </li>
        <li>
        <Typography
            component="legend"
            variant={"h6"}
            fontWeight={"200"}
          >
            Google Reviews
            <p>'These guys are definitely on the right track! They were born for this'</p>
            <p className="review">Lady Gaga</p>
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </li>
      </motion.div>
    </div>
  );
};

export default Header;
