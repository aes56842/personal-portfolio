const slides = document.querySelectorAll('.project-slide');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const img = entry.target.querySelector('img');

      if (!img) return;

      if (entry.isIntersecting) {
        img.style.transform = 'scale(1.05)';
        img.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.32)';
      } else {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = 'none';
      }
    });
  },
  { threshold: 0.5 }
);

slides.forEach(slide => observer.observe(slide));





  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.1,  // trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible'); // trigger fade-in
      observer.unobserve(entry.target);      // stop observing after fade
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  faders.forEach((fader, i) => {
    fader.style.transitionDelay = `${i * 0.2}s`; // 0.2s delay between each skill
    appearOnScroll.observe(fader);
  });









const sidebar = document.getElementById('infoSidebar');
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');

openBtn.addEventListener('click', () => {
  sidebar.style.right = '0';
});

closeBtn.addEventListener('click', () => {
  sidebar.style.right = '-350px';
});
















































//this is where the Guessing Game javascript code starts// 

//below are the words and hints that will be displayed on the page//
const options = {
    whisper: "Quietly Communicate",
    fire: "Burns",
    suit: "Business Attire",
    chess: "Famous Strategy Game",
    nightmare: "unpleasant dream ",
    conversation: "chat",
    volcano: "Lava",
    labyrinth: "Maze",
    gym: "Buile muscle",
    winter: "A season",
    bike: "Method of transport",
};

//initial references//
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
    randomHint= "";
    let winCount = 0, 
    lossCount = 0;


//Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
//Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};
//Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});
//Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
};


//Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
    <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
      displayItem += '<span class="inputSpace">_ </span>';
    });
    //Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
  };

  //Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    //This is to create the letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      //Number to ASCII[A-Z]
      button.innerText = String.fromCharCode(i);
      //Character button onclick
      button.addEventListener("click", () => {
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
        
        //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              startBtn.innerText = "Restart";
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            resultText.innerHTML = "Game Over";
            blocker();
          }
        }
        //Disable clicked buttons
        button.disabled = true;
      });
      //Append generated buttons to the letters container
      letterContainer.appendChild(button);
    }
  };