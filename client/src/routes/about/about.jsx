import "./about.scss"; // Create a separate SCSS file for styling

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function About() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="about">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p>
            We are dedicated to helping you find your dream home. With over 16 years of experience in the real estate market, we have the knowledge and resources to assist you in your search.
          </p>
          <p>
            Our mission is to provide exceptional service and guidance throughout the real estate process.
          </p>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/about-bg.jpg" alt="About" /> {/* Add a relevant image */}
      </div>
    </div>
  );
}

export default About;
