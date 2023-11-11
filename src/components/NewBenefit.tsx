import React, { useState, useEffect } from 'react';
// import {readdirSync} from 'fs';
// import CheriEmotes from '/images/Cheri Emotes_001.png';
import './NewBenefit.css';
import SettingsButton from './SettingsButton';
import InfoButton from './InfoButton';
let currentAudio = new Audio();
let backgroundMusic = new Audio("./sounds/cheriBGM.mp3");
let imageName = './images/Cheri Emotes_0.png';
let BenefitDesc = "Your Benefit will be described here.";
let previousAudioNumber = 0;
let previousImageNumber = 0;
let previousStartNumber = 0;
let volume = 0;
// let revisit = true;
// let question = false;

const Descriptions = [
    "Less Chance to die from Dolls",            //1
    "90% Increase of Flaming Chandeliers",      //2
    "More Cute Ant Pics in DMs",                //3
    "Taller with Specific Shoes",               //4
    "Access to Vacation Resort",                //5
    "As Good as Cheri at Dark Souls",           //6
    "You are Cooler",                           //7
    "Scrapbooking gives less Papercuts",        //8
    "Pink Dyed Hair Slows Roots",               //9
    "Less Liquidy Chicken Pesto Bakes",         //10
    "More Cute Caterpillar Pics in DMs",        //11
    "Access to Exclusive Las Vegas Club",       //12
    "Less Calluses on Your Hands",              //13
    "1% Increase to Tu-ff-aria Drops",          //14
    "Non-Burnout Light Bulbs",                  //15
    "Know Prices of Specific Items",            //16
    "Craft Beautiful Wooden Art Pieces",        //17
    "Hold Pee for 5 minutes longer",            //18
    "All Lead Pencils break 3% slower",         //19
    "Perfectly Horizontal Posters",             //20
    "Ability to not think of a Benefit",        //21
    "Bigger Dark Souls Parry Windows",          //22
    "3 Plastic Things teleport to Trash",       //23
    "Evenly Microwaved Food",                   //24
    "More Hair on your Fingers",                //25
    "No More Late VTubers",                     //26
    "Interpret \"Modern\" Art",                 //27
    "Grow 2cm in Height",                       //28
    "10% More Load in your Diaper",             //29
    "Diapers are interpretively absorbent",     //30
    "License to Murder",                        //31
    "Ability to Count",                         //32
    "Access to Timeshare in Florida",           //33
    "3% Increase Lies of P Perfect Guards",     //34
    "Access to Cheri Lupina Videos",            //35
    "3% Less Spooks during Nightmares",         //36
    "10% Easier Walk backs in DS",              //37
    "Eating Lettuce Mitigates Headaches",       //38
    "Ability to Lagswitch VTuber Model",        //39
    "Less Sore Ankles doing Pushups",           //40
    "Become 3 Inches Taller",                   //41
    "Hot Singles in DMs",                       //42
    "Become \"funnier\" to Cheri Lupina",       //43
    "Coffee gets interpretively sweeter",       //44
    "3% Cuter Halloween Kids Outfits",          //45
    "10 Minute Delay on Phone Overheat",        //46
    "Suika Game Bar get 1mm higher",            //47
    "Suika Game Fruit get 1mm wider",           //48
    "Mute Button won't work",                   //49
    "Access to Secret Treasure",                //50
    "USB Plugs in the Right Way First Try",     //51
    "Note leading to Timeshare in Florida",     //52
    "10% Less Chance of Papercuts",             //53
    "Light Bulb Entrepreneur",                  //54
    "Increased Rate of Soreness/Gains",         //55
    "Phone battery is 5 minutes longer",        //56
    "75% Faster Growing Toenails",              //57
    "Eyesight gets 3% Better",                  //58
    "Cat gets automatically fed",               //59
    "Access to Good Gameplay",                  //60
    "No Joycon Drift in Switch Controllers",    //61
    "Access to Shitty Internet",                //62
    "Ignored by Cheri Lupina",                  //63
    "No Substance on Opened Tin Foil",          //64
    "Plushie Speakers last longer",             //65
    "Sneeze less from Dust",                    //66
    "No More Awkward Push Pens",                //67
    "Ability to have Apples",                   //68
    "10% Chance for Less Tummy Aches",          //69
    "Voice hurts slightly less speaking",       //70
    "Phone battery is 10 minutes longer",       //71
    "Next Penny on Ground is Heads Up",         //72
    "Locked Door becomes Unlocked",             //73
    "Guaranteed No Papercut from Paper",        //74
    "McDonalds Straw has Hole",                 //75
    "Emotes",                                   //76
    "Highlighters last 3 Pages More",           //77
    "3% Sharper Pencils",                       //78
    "Wake up 5 minutes before Alarm",           //79
    "10 Days more without Joy-Con Drift",       //80
    "Splinter chances from Woodworking",        //81
    "Form a Lifetime Friendship Band",          //82
    "Next Figurine will be High Quality",       //83
    "Notice Peelable Film on Daily Item",       //84
    "Loose Hair Bob Under Cabinet",             //85
    "USB Plugs in the Right Way Fifth Try",     //86
    "Smell Feet from Further Away",             //87
    "Inherently Know Spreadsheets",             //88
    "3 Way Switches Work Better for You",       //89
    "More Access to Prostheses"                 //90
];

const ExtraDescriptions = [
    "10% Less Chance of a Heart Attack",        //1
    "Shaved Armpits grow in 3 days later",      //2
    "Focus with Music in the Background",       //3
    "Current IPhone overheats less",            //4
    "#1",                                       //5
    "Access to Weird Time Travel",              //6
    "Iced Drinks Stay Cold for 3% Longer",      //7
    "Ability to Remember the Alamo",            //8
    "More Cute Snake Pics in DMs",              //9
    "More Foxes in Nuclear Reserves",           //10
    "Ability to Annoy Cheri Lupina",            //11
    "Cheri Expected Benefits #10",              //12
    "27% Easier to Open Foil Seals",            //13
    "Access to a Variety of Things",            //14
    "Cheri Kidnaps You",                        //15
    "TWO!?",                                    //16
    "Watch Cheri complement a Goose",           //17
    "Cheri Expected Benefits #1",               //18
    "Cheri Expected Benefits #2",               //19
    "Cheri Expected Benefits #3",               //20
    "Cheri Expected Benefits #4",               //21
    "Cheri Expected Benefits #5",               //22
    "Cheri Expected Benefits #6",               //23
    "Cheri Expected Benefits #7",               //24
    "Cheri Expected Benefits #8",               //25
    "Cheri Expected Benefits #9",               //26
    "33% Chance of Tattered Map",               //27
    "Next Fruit will Never be Rotten"           //28
];

const TOTAL_MEMBERSHIP_BENEFIT_SOUNDS = Descriptions.length;
const EXTRA_MEMBERSHIP_BENEFIT_SOUNDS = ExtraDescriptions.length;
const TOTAL_QUESTION = 12; //Should be TOTAL_QUESTION + 2 if I ever add the Fox from "What does the Fox Say?"
const TOTAL_START_SOUNDS = 38; //REMEMBER: Should be one less because of how I implemented the check
let numBenefits = TOTAL_MEMBERSHIP_BENEFIT_SOUNDS;

let alreadyVisitedAudio = [] as number[];
let alreadyVisitedImage = [] as number[];
let alreadyVisitedStart = [] as number[];
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
        backgroundMusic.volume = .25 * newVolume / 100;
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
                <strong className="title-text" style={{ fontFamily: 'Cheri' }} onClick={playNewStart}>Cheri Lupina Member Benefits:</strong>
                <img id="CheriPic" src={imageName} style={{userSelect: 'none'}} className="centered-image"></img>
                <button type="button" className="centered-button" onClick={updateBenefit} style={{ fontFamily: 'Berlin Sans FB Regular', userSelect: 'none' }}>New Benefit</button>
                <div className="desc-textbox">
                    <strong id="CheriDesc" style={{ fontFamily: 'Berlin Sans FB Bold', userSelect: 'none'}}>{BenefitDesc}</strong>
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
    backgroundMusic.volume = .25 * volume/100;
    currentAudio.addEventListener('canplay', () => {
        currentAudio.play();
    });
}

function playNewStart() {
    const newStartNum = randomNumberInStartRange(1, TOTAL_START_SOUNDS);
    playAudio("./sounds/cheriMembershipStart" + newStartNum + ".mp3");
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

function hasVisitedStart(_num: number, max: number) {
    // console.log("Has " + _num + " already been visited: " + alreadyVisitedAudio.includes(_num))
    if (revisit) {
        if (alreadyVisitedStart.length === max) {
            alreadyVisitedStart = []
        }
        return alreadyVisitedStart.includes(_num);
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

const randomNumberInStartRange = (min: number, max: number) => {
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log("Revisit: " + revisit)
      } while ((hasVisitedStart(newNum, max) || (newNum === previousImageNumber)))
    previousStartNumber = newNum;
    if (revisit) {
        alreadyVisitedStart.push(newNum);
    }
    console.log(alreadyVisitedStart)
    return previousStartNumber;
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