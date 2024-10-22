// // Popup.js

// import "./popup.scss"; // You can add your popup styles here

// import React from "react";

// const Popup = ({ children, onClose }) => {
//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <button className="close-btn" onClick={onClose}>
//           X
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Popup;





// import "./popup.scss";

// import React, { useState } from "react";

// import axios from "axios";

// // Ensure the corresponding Popup SCSS file is present

// function Popup({ show, setShowPop }) {
//   const [apiResponse, setApiResponse] = useState(""); // Store the API response

//   const handleClose = () => {
//     setShowPop(false);
//   };

//   const handleAskAI = async () => {
//     try {
//       // Make the API call when the popup opens
//       const response = await axios.post("http://localhost:8800/api/chatbot", {
//         message: "Anna Nagar, Chennai", // Example message
//       });
//       // Store the API response in the state
//       setApiResponse(response.data.response);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//     }
//   };

//   // Call handleAskAI only when the popup opens
//   React.useEffect(() => {
//     if (show) {
//       handleAskAI();
//     }
//   }, [show]);

//   return (
//     <div className={`popup ${show ? "show" : ""}`}>
//       <div className="popup-content">
//         <button className="close" onClick={handleClose}>
//           &times;
//         </button>
//         {/* Display the API response in the popup */}
//         <div className="response-content">
//           {apiResponse ? (
//             <div dangerouslySetInnerHTML={{ __html: apiResponse }} />
//           ) : (
//             <p>Loading AI response...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Popup;

// import "./popup.scss";

// const Popup = ({ onClose, response }) => {
//   return (
//     <div className="popupOverlay">
//       <div className="popupContent">
//         <button className="closeButton" onClick={onClose}>
//           &times;
//         </button>
//         <div className="popupResponse" dangerouslySetInnerHTML={{ __html: response }} />
//       </div>
//     </div>
//   );
//   };

// export default Popup;

// import "./popup.scss";

// const Popup = ({ onClose, response }) => {
//   return (
//     <div className="popupOverlay">
//       <div className="popupContent">
//         <button className="closeButton" onClick={onClose}>
//           &times; {/* Close button */}
//         </button>
//         <div className="popupResponse" dangerouslySetInnerHTML={{ __html: response }} />
//       </div>
//     </div>
//   );
// };

// export default Popup;

import "./popup.scss"; // Ensure your styles are imported

const Popup = ({ response, onClose, loading }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <button className="closeButton" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {loading ? ( // Show loading animation while loading
          <div className="loader"></div>
        ) : (
          <div 
            className="popupResponse" 
            dangerouslySetInnerHTML={{ __html: response }} 
          />
        )}
      </div>
    </div>
  );
};

export default Popup;

