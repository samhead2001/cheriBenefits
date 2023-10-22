import './SettingsButton.css';
import './SettingsPopup.css';
import React, { useState } from 'react';
interface SettingsButtonProps {
    sliderValue: number;
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
    onVolumeChange: (volume: number) => void;
    extraIsChecked: boolean;
    setExtraIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    onExtraCheck: () => void;
    revisitIsChecked: boolean;
    setRevisitIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    onRevisitCheck: () => void;
    questionIsChecked: boolean;
    setQuestionIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    onQuestionCheck: () => void;
    bgmIsChecked: boolean;
    setBgmIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    onBgmCheck: () => void;
}

function SettingsButton(
    { sliderValue, 
    setSliderValue,
    onVolumeChange,
    extraIsChecked,
    setExtraIsChecked,
    onExtraCheck,
    revisitIsChecked,
    setRevisitIsChecked,
    onRevisitCheck,
    questionIsChecked,
    setQuestionIsChecked,
    onQuestionCheck,
    bgmIsChecked,
    setBgmIsChecked,
    onBgmCheck}: SettingsButtonProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    const handleExtraCheckboxChange = () => {
        setExtraIsChecked(!extraIsChecked); // Toggle the checkbox state when clicked
        // console.log("e" + extraIsChecked);
        onExtraCheck();
    };

    const handleRevisitCheckboxChange = () => {
        setRevisitIsChecked(!revisitIsChecked);
        // console.log("r" + questionIsChecked);
        onRevisitCheck();
    }

    const handleQuestionCheckboxChange = () => {
        setQuestionIsChecked(!questionIsChecked);
        // console.log("q" + questionIsChecked);
        onQuestionCheck();
    }

    const handleBgmCheckboxChange = () => {
        setBgmIsChecked(!bgmIsChecked);
        // console.log("q" + questionIsChecked);
        onBgmCheck();
    }

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setSliderValue(newValue); // Update the slider value using setSliderValue
        localStorage.setItem('volume', newValue + '');
        onVolumeChange(newValue); // Call the changeVolume function
    };

    return (
        <>
            <button type="button" className="settings-button" onClick={togglePopup} style={{ fontFamily: 'Berlin Sans FB Regular' }}>
                <strong className="settings-text" style={{ fontFamily: 'Berlin Sans FB Bold' }}>⚙</strong>
            </button>
            {isPopupOpen && (
                <div className="settings-popup">
                    <div className="settings-popup-content">
                    <label className="entry">
                        <div className="settings-entry-text">Volume 🔊</div>
                        <input className="entry-slider" type="range" step={1} min={0} max={100} value={sliderValue} onChange={handleSliderChange}/>
                        <div className="settings-entry-text">{sliderValue}</div>
                        <br />
                        <div className="settings-entry-text">Extra Sounds
                        <input className='css-checkbox' type="checkbox" checked={extraIsChecked} onChange={handleExtraCheckboxChange} /></div>
                        <div className="desc-text">This option when checked would add some extra sounds that I decided to not add into the main list because either a song is playing in the background or it gets interrupted by a notification that I cannot suppress.<br/><br/></div>
                        <div className="settings-entry-text">Unique Cycle
                        <input className='css-checkbox' type="checkbox" checked={revisitIsChecked} onChange={handleRevisitCheckboxChange} /></div>
                        <div className="desc-text">This option when checked would create a unique cycle with no duplicates. Once all options have been exhausted, the cycle would repeat.<br/><br/></div>
                        <div className="settings-entry-text">BGM Music
                        <input className='css-checkbox' type="checkbox" checked={bgmIsChecked} onChange={handleBgmCheckboxChange} /></div>
                        <div className="desc-text">This option when checked will loop the classic Cheri Lupina BGM Music found in most of her streams.<br/><br/></div>
                        <div className="settings-entry-text">?????
                        <input className='css-checkbox' type="checkbox" checked={questionIsChecked} onChange={handleQuestionCheckboxChange} /></div>
                        <div className="desc-text">Even I don't know what this one will do...<br/><br/></div>
                    </label>
                    <button className="close-button" onClick={togglePopup}>Close Popup</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SettingsButton;