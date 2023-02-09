import React from "react";
import "./footer.css";
const Footer = ({ listings }) => {



  return (
    <div className="footer">
        
      <div className="left">
        {listings.map((listing) => (
          <div>
            <h4>{listing.agent_name}</h4>
            <img src={listing.agent_logo} alt="" />
          </div>
        ))}
      </div>
      <div className="right">
        {listings.map((listing) => (
          <div className="contact">
            Address:
            <h5>
              <span className="address">{listing.agent_address}</span>
            </h5>
            Phone: 
            <h5> <span className="phone">{listing.agent_phone}</span>{" "}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
