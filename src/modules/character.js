import {game} from "../factories/game";
import ai from "../modules/ai";

const character = {
  typing: false,
  skip: false,
  introScriptStep: 0,
  introScript: [
    `Greetings, Admiral — Captain Cuddles here! Reporting in from HQ! Shall we begin?…`,
    `Excellent! You can rotate a ship by double clicking it *before* dragging it into position.`,
    `Go ahead, try it out. Double click a ship below.`,
    `Great! You can add ships to your board 2 ways: clicking & dragging onto your board, or…`,
    `If you'd like to go with a more daring approach, click the "Place randomly" button.`,
    `When all ships have been placed, just give the order to begin our attack.`
  ],

  startGame: () => {
    const responseArray = [
      `Here we gooooo! On your mark, Admiral!`,
      `Ok! Let's do it! Just give the command, Admiral!`,
      `We'll attack on your order, Admiral!`,
      `Just give the order and we'll begin our attack, Admiral!`,
      `Let's make the first shot count! Just say the word, Admiral!`
    ];
    
    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
  },

  newGame: () => {
    const responseArray = [
      `Roger! Awaiting your orders, Admiral.`,
      `Ah, yes! A fresh start!`,
      `Back at it again, eh, Admiral? Let's do this.`,
      `Right! Another opportunity for victory!`,
      `It's an honor to serve with you again, Admiral!`
    ];
    
    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
  },

  sunkEnemyShip: (shipName) => {
    const responseArray = [
      `Direct hit! The enemy ${shipName} has been sunk!`,
      `Hit confirmed! That was the enemy's ${shipName}!`,
      `Admiral, I'm receiving reports that was the enemy ${shipName}!`,
      `That was a hit! The enemy's ${shipName} is going down, Admiral!`,
      `We got it! The enemy's ${shipName} has been destroyed!`
    ];
    
    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
  },

  reportSunkenShip: (shipName) => {
    const responseArray = [
      `Admiral, they got our ${shipName}!`,
      `It can't be! That was our ${shipName}!`,
      `I'm receiving reports we just lost our ${shipName}, Admiral!`,
      `How?! That was the fastest ${shipName} in our fleet!`,
      `Our ${shipName}!!!`
    ];
    
    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
    
  },

  playerWin: () => {
    const responseArray = [
      `Victory!!! Congratulations, Admiral!`,
      `HA HAAAAAAA! We did it! We won!!!`,
      `YES! An incredible victory! And what a story to tell back home!`,
      `I never doubted you, Admiral! Another victory in am impressive career!`,
      `Amazing! A swift and decisive victory for us thanks to your leadership, Admiral!`
    ];
    
    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
  },

  playerLoss: () => {
    const responseArray = [
      `Admiral, we're finished. We have to retreat!`,
      `It can't be! How could we have lost?!`,
      `It was an honor serving with you, Admiral, but I fear we must admit defeat.`,
      `How could this have happened?! Admiral, a strategic retreat is in order!`,
      `I can't believe it! If we don't pull our forces out now we're doomed!`
    ];
    
    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
  },

  skipIntro: () => {
    const responseArray = [
      `Yes, indeed! Straight to the action!`,
      `Right! Let's skip right to battle!`,
      `Ah, straight to the business of battle then.`,
      `Ha ha! Right down to business, I appreciate that, Admiral.`,
      `I admire your enthusiam, Admiral! Let's do it.`
    ];

    return responseArray[ai.getRandInclusive(0, responseArray.length - 1)];
  },

  positiveTalking: () => {
    const classArray = ["talking-1", "talking-2"];
    return classArray[ai.getRandInclusive(0, classArray.length - 1)];
  },

  negativeTalking: () => {
    const classArray = ["talking-sad-1", "talking-sad-2", "talking-worried"];
    return classArray[ai.getRandInclusive(0, classArray.length - 1)];
  },

  playerWinTalking: () => {
    const classArray = ["player-win"];
    return classArray[ai.getRandInclusive(0, classArray.length - 1)];
  },

  playerLoseTalking: () => {
    const classArray = ["player-lose"];
    return classArray[ai.getRandInclusive(0, classArray.length - 1)];
  },

  comsMsg: (string, animationClassName) => {
    return new Promise(resolve => {
      const comsImg = document.getElementById("coms-img");
      const comsText = document.getElementById("coms-text");
      comsText.textContent = "";
      comsImg.classList.add(animationClassName);
      character.typing = true;
      let i = 0;
      let timer = setInterval(() => {
        if (i < string.length && !character.skip) {
          comsText.textContent += string.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          character.typing = false;
          comsImg.classList.contains("static") ? comsImg.classList.remove("static") : null;
          comsImg.classList.remove(animationClassName);
          resolve();
        }
      }, game.turnDelay / 5);
    });
  },

  clearComs: () => {
    document.getElementById("coms-text").textContent = "";
  }
}

export default character;