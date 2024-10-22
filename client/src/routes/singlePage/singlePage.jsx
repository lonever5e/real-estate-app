import "./singlePage.scss";

import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import DOMPurify from "dompurify";
import Map from "../../components/map/Map";
import Popup from "../../components/popup/Popup";
import Slider from "../../components/slider/Slider";
import apiRequest from "../../lib/apiRequest";
import axios from "axios";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [showPopup, setShowPopup] = useState(false);
  const [showPop, setShowPop] = useState(false); // Popup visibility state
  const [chatbotResponse, setChatbotResponse] = useState(""); // State for chatbot response
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  // // Handle the click for Ask AI button
  // const handleAskAI = async () => {
  //   setShowPopup(true);  // Show the popup when button is clicked
  //   try {
  //     const response = await apiRequest.post("/chatbot", {
  //       message: "Tell me more about Annanagar, chennai",
  //       // message: post.postDetail.desc,
  //     });
  //     setChatbotResponse(response.data.response);  // Update chatbot response
  //   } catch (err) {
  //     console.log("Error fetching chatbot response", err);
  //     setChatbotResponse("Failed to get a response from AI.");
  //   }
  // };

  // const handleAskAI = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8800/api/chatbot", {
  //       message: "Tell me more about Annanagar, chennai", // Send the post description as the message to the chatbot
  //     });

  //     setChatbotResponse(response.data.response); // Update chatbot response
  //     setShowPopup(true); // Show the popup once the response is received
  //   } catch (err) {
  //     console.error("Error fetching chatbot response:", err);
  //   }
  // };

  // const handleAskAIButtonClick = () => {
  //   setShowPop(true); // Show popup when button is clicked
  // };

  const handleAskAIButtonClick = async () => {
    setLoading(true); // Start loading
    setShowPop(true); // Show popup

    try {
      const response = await apiRequest.post("/chatbot", { message: post.address }); // Send request
      // const response = await apiRequest.post("/chatbot", { message: "tell about chennai" }); // Send request
      // console.log(response.data);
      setChatbotResponse(response.data); // Update chatbot response state
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatbotResponse("Error fetching response. Please try again."); // Fallback message on error
    } finally {
      setLoading(false); // Stop loading after the API call is done
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleAskAIButtonClick}>
            <img src="/bot.png" alt="Ask AI" />
            Ask AI
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
      {/* Conditionally render the Popup */}
      {/* {showPop && (
        <Popup
          show={showPop}
          setShowPop={setShowPop}
          chatbotResponse={chatbotResponse} // Pass chatbot response to Popup
        />
      )} */}
      {showPop && (
        <Popup
          onClose={() => setShowPop(false)} // Function to close popup
          response={chatbotResponse} // Pass chatbot response to Popup
          loading={loading}
        />
      )}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
