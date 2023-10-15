// export default Popup;
//TODO: Something isn't working. This is so sad.
import React, { useState } from 'react';
import './Popup.css';

function Popup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>⚙</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            {/* Content for your popup */}
            <p>This is your popup content.</p>
            <button className="settings-button" onClick={togglePopup}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
