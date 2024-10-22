import "./contact.scss"; // Create a separate SCSS file for styling

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Contact() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="contactMe">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Contact Me</h1>
          <p>
            If you have any questions, feel free to reach out! You can contact me via the form below or through my email.
          </p>
          <form className="contactForm">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/contact-bg.jpg" alt="Contact" /> {/* Add a relevant image */}
      </div>
    </div>
  );
}

export default Contact;
