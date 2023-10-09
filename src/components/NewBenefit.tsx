import React, { useState } from 'react';
// import {readdirSync} from 'fs';
// import CheriEmotes from '/images/Cheri Emotes_001.png';
import './NewBenefit.css';
let currentAudio = new Audio();
let imageName = '/images/Cheri Emotes_001.png';
let BenefitDesc = "";
let previousNumber = 0;

const Descriptions = [
    "Less Chance to die from Dolls",
    "90% Increase of Flaming Chandeliers",
    "More Cute Ant Pics in DMs",
    "Taller but only with Heeled Shoes",
    "Access to Vacation Resort",
    "As Good as Cheri Lupina at Dark Souls",
    "You are Cooler",
    "You are Cooler"
]


function NewBenefit() {
    return (
        <>
            <div className="text-center">
                <strong className="title-text" style={{ fontFamily: 'Berlin Sans FB' }}>Benefits of Becoming a Cheri Lupina Member:</strong>
                <img id="CheriPic" src={imageName} className="centered-image"></img>
                <strong id="CheriDesc" className="desc-text" style={{ fontFamily: 'Berlin Sans FB' }}>{BenefitDesc}</strong>
                <button type="button" className="centered-button" onClick={GetNewBenefit} style={{ fontFamily: 'Berlin Sans FB' }}>New Benefit</button>
            </div>
        </>
    );

}

function isPlaying() {
    return !currentAudio.paused;
}

function playAudio(_rand: number) {
    if (isPlaying()) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio("/sounds/cheriMembershipBenefit" + _rand + ".mp3");
    currentAudio.play();
}

function showImage(_rand: number) {
    var myImg = document.getElementById("CheriPic") as HTMLImageElement;
    myImg.src = '/images/Cheri Emotes_00' + _rand + ".png";
}

function changeDesc(_rand: number) {
    var description = document.getElementById("CheriDesc") as HTMLElement;
    description.innerHTML = Descriptions[_rand-1];
}

const randomNumberInRange = (min: number, max: number) => {
    let newNum = -1;
    do {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (newNum === previousNumber);
    previousNumber = newNum;
    return previousNumber;
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
    const newNum = randomNumberInRange(1, 8);
    playAudio(newNum);
    showImage(newNum);
    changeDesc(newNum);
}

export default NewBenefit;