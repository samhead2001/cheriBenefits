import './InfoButton.css';
import './InfoPopup.css';
import React, { useState } from 'react';

function InfoButton() {
    var volumeSetting = 0;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
    return (
        <>
            <button type="button" className="info-button" onClick={togglePopup} style={{ fontFamily: 'Berlin Sans FB Bold' }}><strong className="info-text">i</strong></button>
            {isPopupOpen && (
                <div className="info-popup">
                    <div className="info-popup-content">
                    {/* Content for your popup */}
                    <div className="title-entry-text">This website is dedicated to Cheri Lupina reaching 100K!</div>
                    <div className="entry-text">In this website, there is a button you press that gives you a different membership benefit along with an image and description.</div>
                    <br></br>
                    <div className="title-entry-text">Thanks to these Gemlins:</div>
                    <div className="entry-text"><a href="https://twitter.com/MrMeow230">MrMeow</a> for helping me find these sound effects!</div>
                    <div className="entry-text"><a href="https://github.com/Paturages">Paturages</a> for helping me make my project better!</div>
                    <div className="entry-text"><a href="https://youtube.com/@CheriLupina?si=-ifBk2DBUGhrE9NF">Cheri Lupina</a> for being best Treasure Hunting Fox Girl!</div>
                    <br></br>
                    <div className="title-entry-text">Links:</div>
                    <div className="entry-text"><a href="https://github.com/samhead2001/cheriBenefits">My Source Code</a></div>
                    <div className="entry-text"><a href="discord.gg/3xfYPNRfy4">VReverie Gen 2 Discord</a></div>
                    <div className="entry-text"><a href="https://dova-s.jp/bgm/play18444.html">Cheri Lupina BGM</a></div>
                    <button className="close-button" onClick={togglePopup}>Close Popup</button>
                    </div>
                </div>
                )}
        </>
    );
}

export default InfoButton;