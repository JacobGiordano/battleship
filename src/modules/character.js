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