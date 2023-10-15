import React, { useState } from 'react';
// import {readdirSync} from 'fs';
// import CheriEmotes from '/images/Cheri Emotes_001.png';
import './NewBenefit.css';
import SettingsButton from './SettingsButton';
import InfoButton from './InfoButton';
let currentAudio = new Audio();
let imageName = './images/Cheri Emotes_0.png';
let BenefitDesc = "Your Benefit will be described here.";
let previousAudioNumber = 0;
let previousImageNumber = 0;
let volume = 0;
let revisit = true;

const Descriptions = [
    "Less Chance to die from Dolls",
    "90% Increase of Flaming Chandeliers",
    "More Cute Ant Pics in DMs",
    "Taller with Specific Shoes",
    "Access to Vacation Resort",
    "As Good as Cheri at Dark Souls",
    "You are Cooler",
    "You are Cooler",
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
    "Eating Lettuce Mitigates Headaches"
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
    "More Cute Snake Pics in DMs"
];

const TOTAL_MEMBERSHIP_BENEFIT_SOUNDS = Descriptions.length;
const EXTRA_MEMBERSHIP_BENEFIT_SOUNDS = ExtraDescriptions.length;
let numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS;

let alreadyVisited = [] as number[];


function NewBenefit() {
    const [sliderValue, setSliderValue] = useState<number>(70);
    const [extraIsChecked, setExtraIsChecked] = useState(false);
    const [revisitIsChecked, setRevisitIsChecked] = useState(true);

    volume = sliderValue;
    revisit = revisitIsChecked; 

    const handleVolumeChange = (newVolume: number) => {
        // Implement your volume change logic here
        // This function will be called when the slider value changes
        currentAudio.volume = newVolume / 100;
    };

    const handleExtraCheck = () => {
        if (extraIsChecked) {
            numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS;
        }
        else numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS + EXTRA_MEMBERSHIP_BENEFIT_SOUNDS;
        // console.log(numBenefits);
    }

    const handleRevisitCheck = () => {
        alreadyVisited = [];
    }
    
    return (
        <>
            <SettingsButton sliderValue={sliderValue} setSliderValue={setSliderValue} onVolumeChange={handleVolumeChange} extraIsChecked={extraIsChecked} setExtraIsChecked={setExtraIsChecked} onExtraCheck={handleExtraCheck} revisitIsChecked={revisitIsChecked} setRevisitIsChecked={setRevisitIsChecked} onRevisitCheck={handleRevisitCheck}></SettingsButton>
            <InfoButton></InfoButton>
            <div className="text-center">
                <strong className="title-text" style={{ fontFamily: 'Cheri' }}>Cheri Lupina Member Benefits:</strong>
                <img id="CheriPic" src={imageName} className="centered-image"></img>
                <button type="button" className="centered-button" onClick={GetNewBenefit} style={{ fontFamily: 'Berlin Sans FB' }}>New Benefit</button>
                <div className="desc-textbox">
                    <strong id="CheriDesc" style={{ fontFamily: 'Berlin Sans FB' }}>{BenefitDesc}</strong>
                </div>
            </div>
        </>
    );

}

function isPlaying() {
    return !currentAudio.paused;
}

function playAudio(path: string) {
    if (isPlaying()) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(path);
    currentAudio.volume = volume/100;
    currentAudio.play();
}

function showImage(_rand: number) {
    var myImg = document.getElementById("CheriPic") as HTMLImageElement;
    myImg.src = './images/Cheri Emotes_' + _rand + ".png";
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
function hasVisited(_num: number) {
    // console.log(alreadyVisited.includes(_num))
    if (revisit) {
        if (alreadyVisited.length === numBenefits) {
            alreadyVisited = []
        }
        return !alreadyVisited.includes(_num);
    } else return !revisit;
}

const randomNumberInAudioRange = (min: number, max: number) => {
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("Revisit: " + revisit)
        console.log("Number: " + newNum + " hasVisited: " + hasVisited(newNum) + " full boolean " + ((newNum === previousAudioNumber) && (!hasVisited(newNum))))
      } while ((newNum === previousAudioNumber) && (!hasVisited(newNum)))
    previousAudioNumber = newNum;
    alreadyVisited.push(newNum);
    return previousAudioNumber;
};

const randomNumberInImageRange = (min: number, max: number) => {
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("Revisit: " + revisit)
      } while ((newNum === previousImageNumber) && (hasVisited(newNum)))
    previousImageNumber = newNum;
    return previousImageNumber;
};

//TODO: Find a way to know the number of files in sounds folder...
// const GetNumFiles = () => {
//     fs.readdir(pathToDirectory, (error, files) => {
//         if (error) {
//             console.log(error);
//         } else { 
//             console.log(files);
//             console.log(files.length);
//   }
//     })
// }

function GetNewBenefit() {
    const newAudioNum = randomNumberInAudioRange(1, numBenefits);
    if (newAudioNum > TOTAL_MEMBERSHIP_BENEFIT_SOUNDS) {
        playAudio("./sounds/cheriMembershipExtraBenefit" + (newAudioNum - TOTAL_MEMBERSHIP_BENEFIT_SOUNDS) + ".mp3");
        changeDesc(true, (newAudioNum - TOTAL_MEMBERSHIP_BENEFIT_SOUNDS));
    }
    else {
        playAudio("./sounds/cheriMembershipBenefit" + newAudioNum + ".mp3");
        changeDesc(false, newAudioNum);
    }
    const newImageNum = randomNumberInImageRange(1, 14);
    showImage(newImageNum);
    console.log(alreadyVisited);
}

export default NewBenefit;