import React, { useState, useEffect } from 'react';
// import {readdirSync} from 'fs';
// import CheriEmotes from '/images/Cheri Emotes_001.png';
import './NewBenefit.css';
import SettingsButton from './SettingsButton';
import InfoButton from './InfoButton';
let currentAudio = new Audio();
let backgroundMusic = new Audio("");
let imageName = './images/Cheri Emotes_0.png';
let BenefitDesc = "Your Benefit will be described here.";
let previousAudioNumber = 0;
let previousImageNumber = 0;
let volume = 0;
// let revisit = true;
// let question = false;

const Descriptions = [
    "Less Chance to die from Dolls",
    "90% Increase of Flaming Chandeliers",
    "More Cute Ant Pics in DMs",
    "Taller with Specific Shoes",
    "Access to Vacation Resort",
    "As Good as Cheri at Dark Souls",
    "You are Cooler",
    "Scrapbooking gives less Papercuts",
    "Pink Dyed Hair Slows Roots",
    "Less Liquidy Chicken Pesto Bakes",
    "More Cute Caterpillar Pics in DMs",
    "Access to Exclusive Las Vegas Club",
    "Less Calluses on Your Hands",
    "1% Increase to Tu-ff-aria Drops",
    "Non-Burnout Light Bulbs",
    "Know Prices of Specific Items",
    "Craft Beautiful Wooden Art Pieces",
    "Hold Pee for 5 minutes longer",
    "All Lead Pencils break 3% slower",
    "Perfectly Horizontal Posters",
    "Ability to not think of a Benefit",
    "Bigger Dark Souls Parry Windows",
    "3 Plastic Things teleport to Trash",
    "Evenly Microwaved Food",
    "More Hair on your Fingers",
    "No More Late VTubers",
    "Interpret \"Modern\" Art",
    "Grow 2cm in Height",
    "10% More Load in your Diaper",
    "Diapers are interpretively absorbent",
    "License to Murder",
    "Ability to Count",
    "Access to Timeshare in Florida",
    "3% Increase Lies of P Perfect Guards",
    "Access to Cheri Lupina Videos",
    "3% Less Spooks during Nightmares",
    "10% Easier Walk backs in DS",
    "Eating Lettuce Mitigates Headaches",
    "Ability to Lagswitch VTuber Model",
    "Less Sore Ankles doing Pushups",
    "Become 3 Inches Taller",
    "Hot Singles in DMs",
    "Become \"funnier\" to Cheri Lupina",
    "Coffee gets interpretively sweeter",
    "3% Cuter Halloween Kids Outfits",
    "10 Minute Delay on Phone Overheat",
    "Suika Game Bar get 1mm higher",
    "Suika Game Fruit get 1mm wider",
    "Mute Button won't work",
    "Access to Secret Treasure",
    "USB Plugs in the Right Way First Try",
    "Note leading to Timeshare in Florida",
    "10% Less Chance of Papercuts",
    "Light Bulb Entrepreneur",
    "Increased Rate of Soreness/Gains",
    "Phone battery is 5 minutes longer",
    "75% Faster Growing Toenails",
    "Eyesight gets 3% Better",
    "Cat gets automatically fed",
    "Access to Good Gameplay",
    "No Joycon Drift in Switch Controllers"
];

const ExtraDescriptions = [
    "10% Less Chance of a Heart Attack",
    "Shaved Armpits grow in 3 days later",
    "Focus with Music in the Background",
    "Current IPhone overheats less",
    "#1",
    "Access to Weird Time Travel",
    "Iced Drinks Stay Cold for 3% Longer",
    "Ability to Remember the Alamo",
    "More Cute Snake Pics in DMs",
    "More Foxes in Nuclear Weapon Reserves",
    "Ability to Annoy Cheri Lupina",
    "You are Cooler and More Women in DMs"
];

const TOTAL_MEMBERSHIP_BENEFIT_SOUNDS = Descriptions.length;
const EXTRA_MEMBERSHIP_BENEFIT_SOUNDS = ExtraDescriptions.length;
const TOTAL_QUESTION = 11;
let numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS;

let alreadyVisitedAudio = [] as number[];
let alreadyVisitedImage = [] as number[];
let sliderVal: number;
let extra: boolean;
let revisit: boolean;
let question: boolean;
let bgm: boolean;


function NewBenefit() {
    const volumeStorage = localStorage.getItem('volume');
    if (volumeStorage === null) {
        sliderVal = 70;
    } else sliderVal = Number(volumeStorage);
    const extraStorage = localStorage.getItem('extra');
    if (extraStorage === null) {
        extra = false;
    } else extra = (extraStorage === 'true');
    const revisitStorage = localStorage.getItem('revisit');
    if (revisitStorage === null) {
        revisit = true;
    } else revisit = (revisitStorage === 'true');
    const questionStorage = localStorage.getItem('question');
    if (questionStorage === null) {
       question = false;
    } else question = (questionStorage === 'true');

    const [sliderValue, setSliderValue] = useState<number>(sliderVal);
    const [extraIsChecked, setExtraIsChecked] = useState(extra);
    const [revisitIsChecked, setRevisitIsChecked] = useState(revisit);
    const [questionIsChecked, setQuestionIsChecked] = useState(question);
    const [showUp, setShowUp] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [backgroundMusicIsChecked, setBackgroundMusicIsChecked] = useState(false);
    // console.log(sliderValue + " " + extraIsChecked + " " + revisitIsChecked + " " + questionIsChecked)
        
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [rotation, setRotation] = useState(0);

    volume = sliderValue;
    revisit = revisitIsChecked;
    question = questionIsChecked;
    bgm = backgroundMusicIsChecked;

    const handleVolumeChange = (newVolume: number) => {
        // Implement your volume change logic here
        // This function will be called when the slider value changes
        currentAudio.volume = newVolume / 100;
    };

    const handleExtraCheck = () => {
        if (extraIsChecked) {
            numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS + EXTRA_MEMBERSHIP_BENEFIT_SOUNDS;
        }
        else numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS;
        localStorage.setItem('extra', !extraIsChecked + '');
        // console.log(localStorage);
    }
    handleExtraCheck()

    const handleRevisitCheck = () => {
        alreadyVisitedAudio = [];
        localStorage.setItem('revisit', !revisitIsChecked + '');
        // console.log(localStorage);
    }

    const handleQuestionCheck = () => {
        alreadyVisitedImage = [];
        if (question) {
            showImage('./images/Cheri Emotes_', randomNumberInRange(1, 14));
        }
        else showImage('./images/Question_', randomNumberInRange(1, TOTAL_QUESTION));
        localStorage.setItem('question', !questionIsChecked + '');
        previousImageNumber = -1
        // console.log(localStorage);
    }

    // function updatePositionAndRotation() {
    //     const minX = -.3 * window.innerWidth; // Minimum X-coordinate
    //     const maxX = .3 * window.innerWidth; // Maximum X-coordinate (adjust as needed)
    //     const minY = 0; // Minimum Y-coordinate
    //     const maxY = .3 * window.innerHeight; // Maximum Y-coordinate (adjust as needed)
    //     console.log(minX + " " + maxX + " " + minY + " " + maxY);
    //     let newX, newY;
    //     do {
    //         newX = Math.random() * (maxX - minX) + minX;
    //         newY = Math.random() * (maxY - minY) + minY;
    //     } while (
    //         (newX >= .15 * window.innerWidth && newX <= -.15 * window.innerWidth && newY >= -.15 * window.innerHeight && newY <= -.15 * window.innerHeight)
    //     );
    //     console.log(newX + "," + newY);
    //     const newRotation = Math.random() * 360; // 0 to 360 degrees
      
    //     setPosition({ x: newX, y: newY });
    //     setRotation(newRotation);
    // }

    // function updateOpacity() {
    //     handleShowUpClick();
    //     if (showUp) {
    //         setOpacity(1);
    //     }
    //     else setOpacity(0);
    // }
      

    const updateBenefit = () => {
        // if (!showUp) {
        //     if (randomNumberInRange(1, 1) === 1) {
        //         console.log("Went here.")
        //         updateOpacity();
        //     }
        // } else handleShowUpClick();
        // updatePositionAndRotation();
        GetNewBenefit();
    }

    // const handleImageClick = () => {
    //     window.location.href = 'https://www.youtube.com/watch?v=tNYCcioDeQg&ab_channel=samhead2001'; // Replace with the URL you want to redirect to
    // };

    // const handleShowUpClick = () => {
    //     setShowUp(!showUp);
    // };

    const handleBgmCheck = () => {
        // console.log(isPlaying(backgroundMusic))
        if (isPlaying(backgroundMusic)) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
        else {
            backgroundMusic = new Audio("./sounds/cheriBGM.mp3");
            backgroundMusic.volume = .25 * volume/100;
            backgroundMusic.loop = true;
            backgroundMusic.play();
        }
    };
    
    return (
        <>
            <SettingsButton
            sliderValue={sliderValue} 
            setSliderValue={setSliderValue}
            onVolumeChange={handleVolumeChange}
            extraIsChecked={extraIsChecked}
            setExtraIsChecked={setExtraIsChecked}
            onExtraCheck={handleExtraCheck}
            revisitIsChecked={revisitIsChecked}
            setRevisitIsChecked={setRevisitIsChecked}
            onRevisitCheck={handleRevisitCheck}
            questionIsChecked={questionIsChecked}
            setQuestionIsChecked={setQuestionIsChecked}
            onQuestionCheck={handleQuestionCheck}
            bgmIsChecked={backgroundMusicIsChecked}
            setBgmIsChecked={setBackgroundMusicIsChecked}
            onBgmCheck={handleBgmCheck}></SettingsButton>
            <InfoButton></InfoButton>
            <div className="text-center">
                <div className="random" 
                >
                    {/* <a href="https://www.youtube.com/watch?v=tNYCcioDeQg&ab_channel=samhead2001" onClick={handleImageClick}>
                        <img className="smol-cheri" src={'./images/smol_cheri.png'} style={{opacity: opacity}}/>
                    </a> */}
                </div>
                <strong className="title-text" style={{ fontFamily: 'Cheri' }}>Cheri Lupina Member Benefits:</strong>
                <img id="CheriPic" src={imageName} className="centered-image"></img>
                <button type="button" className="centered-button" onClick={updateBenefit} style={{ fontFamily: 'Berlin Sans FB Regular' }}>New Benefit</button>
                <div className="desc-textbox">
                    <strong id="CheriDesc" style={{ fontFamily: 'Berlin Sans FB Bold' }}>{BenefitDesc}</strong>
                </div>
            </div>
        </>
    );

}

function isPlaying(audio: HTMLAudioElement) {
    return !audio.paused;
}

function playAudio(path: string) {
    if (isPlaying(currentAudio)) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(path);
    currentAudio.volume = volume/100;
    currentAudio.addEventListener('canplay', () => {
        currentAudio.play();
    });
}

function showImage(path: string, _rand: number) {
    var myImg = document.getElementById("CheriPic") as HTMLImageElement;
    myImg.src = path + _rand + ".png";
}

function changeDesc(isExtra: boolean, _rand: number) {
    var description = document.getElementById("CheriDesc") as HTMLElement;
    // console.log(isExtra)
    if (isExtra) {
        description.innerHTML = ExtraDescriptions[_rand-1];
    }
    else description.innerHTML = Descriptions[_rand-1];
}

//TODO: Understand why duplicates are still happening
function hasVisitedAudio(_num: number) {
    // console.log("Has " + _num + " already been visited: " + alreadyVisitedAudio.includes(_num))
    if (revisit) {
        if (alreadyVisitedAudio.length === numBenefits) {
            alreadyVisitedAudio = []
        }
        return alreadyVisitedAudio.includes(_num);
    } else return revisit;
}

function hasVisitedImage(_num: number, max: number) {
    // console.log("Has " + _num + " already been visited: " + alreadyVisitedAudio.includes(_num))
    if (revisit) {
        if (alreadyVisitedImage.length === max) {
            alreadyVisitedImage = []
        }
        return alreadyVisitedImage.includes(_num);
    } else return revisit;
}


const randomNumberInAudioRange = (min: number, max: number) => {
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("Revisit: " + revisit)
        // console.log("Number: " + newNum + " hasVisited: " + hasVisited(newNum) + " full boolean " + ((newNum === previousAudioNumber) && (!hasVisited(newNum))))
      } while ((hasVisitedAudio(newNum) || (newNum === previousAudioNumber))) //We want hasVisited to return false if 
    previousAudioNumber = newNum;
    if (revisit) {
        alreadyVisitedAudio.push(newNum);
    }
    return previousAudioNumber;
};

const randomNumberInImageRange = (min: number, max: number) => {
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("Revisit: " + revisit)
      } while ((hasVisitedImage(newNum, max) || (newNum === previousImageNumber)))
    previousImageNumber = newNum;
    if (revisit) {
        alreadyVisitedImage.push(newNum);
    }
    console.log(alreadyVisitedImage)
    return previousImageNumber;
};

const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNumberInArrayRange = (arr: number[], min: number, max: number, previous: number) => {
    console.log(arr + " " + min + " " + max + " " + previous)
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("Revisit: " + revisit)
        // console.log("Number: " + newNum + " hasVisited: " + hasVisited(newNum) + " full boolean " + ((newNum === previousAudioNumber) && (!hasVisited(newNum))))
      } while ((hasVisitedInArray(arr, newNum, max) || (newNum === previous))) //We want hasVisited to return false if 
    previous = newNum;
    if (revisit) {
        arr.push(newNum);
    }
    return previous;
};

function hasVisitedInArray(arr: number[], _num: number, limit: number) {
    // console.log("Has " + _num + " already been visited: " + alreadyVisitedAudio.includes(_num))
    if (revisit) {
        if (arr.length === limit-1) {
            arr = []
        }
        return arr.includes(_num);
    } else return revisit;
}

function GetNewBenefit() {
    // console.log(question)
    const newAudioNum = randomNumberInAudioRange(1, numBenefits);
    if (newAudioNum > TOTAL_MEMBERSHIP_BENEFIT_SOUNDS) {
        playAudio("./sounds/cheriMembershipExtraBenefit" + (newAudioNum - TOTAL_MEMBERSHIP_BENEFIT_SOUNDS) + ".mp3");
        changeDesc(true, (newAudioNum - TOTAL_MEMBERSHIP_BENEFIT_SOUNDS));
    }
    else {
        playAudio("./sounds/cheriMembershipBenefit" + newAudioNum + ".mp3");
        changeDesc(false, newAudioNum);
    }
    if (!question) {
        // showImage('./images/Cheri Emotes_', randomNumberInArrayRange(alreadyVisitedImage, 1, 14, previousImageNumber));
        showImage('./images/Cheri Emotes_', randomNumberInImageRange(1, 14));
    }
    else showImage('./images/Question_', randomNumberInImageRange(1, TOTAL_QUESTION));

    console.log(alreadyVisitedAudio);
}



export default NewBenefit;