import ai from "../modules/ai";

const character = {
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

  introScript: () => {

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

  comsMsg: (string) => {
    return new Promise(resolve => {
      const comsText = document.getElementById("coms-text");
      comsText.textContent = "";
      let i = 0;
      let timer = setInterval(() => {
        if (i < string.length) {
          comsText.textContent += string.charAt(i);
          i++
        } else {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }
}

export default character;