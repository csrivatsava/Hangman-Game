
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
var words = ["amasterdam","bombay","connecticut","sunnyvale","tampa","fremont", "dresden", "salem", "orlando", "milwaukee", "missourie","boston",]

// Creating variables to hold the number of wins, losses, and ties. They start at 0.
var wins = 0;
var losses = 0;
var choicesLeft = 0;
var lettersUsed= [];
var randomWord = [];
var currentWord = [];
var gussed = false;
var userGuess = '';
var letter = false;
var allowed = true;
var wrongNumber = 0;

window.onload = function(){
  reset();
};

function reset(){
  wins = wins;
  losses = losses;
  lettersUsed = [];
  currentWord = [];
  randomWord = [];
  userGuess = '';
  choicesLeft=0;
  printDocument();
  wrongNumber = 0;
  var c = document.getElementById('hang');
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(0, 0, 500, 500);
  
    
};

// function for random word.
function wordChosen(){
// Randomly chooses a choice from the options array. This is the Computer's guess.
  currentWord = [];
  randomWord = words[Math.floor(Math.random() * words.length)];
  // console.log(randomWord);
  choicesLeft = randomWord.length;
  //blanks of the word choosen
  for (var i=0; i< randomWord.length;i++){
    currentWord [i] = "_";  
  }
};

function playHangman(){
  for (i=0;i<lettersUsed.length;i++){
      if (userGuess === lettersUsed[i]){
        console.log( 'in play hangman loop :' +letter)
        letter = true;
      }
      else{
        letter = false;
      }
  };
 if (letter === true){
   //  console.log('in play hangman function' + choicesLeft)
    if (choicesLeft !== 0){
    //  console.log('in playHangman randomWord' + randomWord.length)
      for (var i=0; i< randomWord.length;i++){
          if (userGuess === randomWord[i])
          {
            currentWord[i] = randomWord[i];
            gussed= true; 
          }
          
      }
      if (gussed === false){
        choicesLeft--;
        wrongNumber++;
        hang();
      }
      var complete = true;
      for (var i = 0; i < randomWord.length; i++){
        if(currentWord[i] === "_"){
          complete = false;
        }
      }
      if(complete){
        choicesLeft = 0;
        wins++;
       // window.alert("You win!");
        
      }
      if ((choicesLeft === 0) && ( complete === false)){
            losses++;
             for (var i=0; i< randomWord.length;i++){
                currentWord[i] = randomWord[i];

              }
      }
    }
   }
};

function printDocument() {
  // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
  var html =
  "<h2>Current Word " + '<br>' + currentWord.join(" ") + "</h2>" +    //.join(" ") function is used to replace comma with a blank space when displaying an array.
  "<p>wins: " + wins + "</p>" +
  "<p>losses: " + losses + "</p>" +
  "<p>Guesses Left: " + choicesLeft + "</p>" +
  "<p>Your Guesses so far: " + lettersUsed + "</p>" 
  // Set the inner HTML contents of the #game div to our html string
  document.querySelector("#HangmanGame").innerHTML = html;
}

document.getElementById('playbtn').onmousedown = function play(){
  reset();
  wordChosen();
  playHangman();
  printDocument();
}

document.keydown = function(event) { 
  if (event.repeat != undefined) {
    allowed = !event.repeat;
  }
  if (!allowed) return;
  allowed = false;
  //...
};

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
  allowed = true;
  // Determines which key was pressed.
  userGuess = event.key;
  
  // This logic determines the outcome of the game (win/loss), and increments the appropriate number
  if ((allowed === true) && (userGuess !=='Enter')&&(userGuess !=='Shift')&&(userGuess !=='ArrowRight')&&(userGuess !=='ArrowTop')&&(userGuess !=='ArrowBottom')&&(userGuess !=='ArrowLeft')){
    console.log('keypress function' + userGuess)
    //pushing the values into the array.
    lettersUsed.push(userGuess);
    gussed = false;
    playHangman();
    // this is to print details to the screen
    printDocument();
  }
}
  
 function hang(){
  // simulating the hangman picture
    var c = document.querySelector("#hang");
    var ctx = c.getContext("2d");
    if (wrongNumber=== 1){
      ctx.beginPath(); //head
      ctx.arc(150, 20, 20, 0, 2*Math.PI);
      ctx.stroke();
      ctx.beginPath(); //left eye
      ctx.arc(143, 15, 3.5, 0, 2*Math.PI);
      ctx.stroke();
      ctx.beginPath(); //right eye
      ctx.arc(157, 15, 3.5, 0, 2*Math.PI);
      ctx.stroke();
      ctx.beginPath(); //mouth
      ctx.arc(150, 23, 9, 0, Math.PI);
      ctx.stroke();
    }
    else if(wrongNumber==2){
        ctx.beginPath(); //body
            ctx.moveTo(150,40);
            ctx.lineTo(150,70);
            ctx.stroke();
    }
    else if(wrongNumber==3){
        ctx.beginPath(); //right arm
            ctx.moveTo(150,55);
            ctx.lineTo(180,60);
            ctx.stroke();
    }
    else if(wrongNumber==4){
        ctx.beginPath(); //left arm
            ctx.moveTo(150,55);
            ctx.lineTo(120,60);
            ctx.stroke();
    }
    else if(wrongNumber==5){
        ctx.fillRect(138, 70, 25, 25); //cover body
        ctx.lineWidth=2;
    }
    else if(wrongNumber==6){
        ctx.lineWidth=1;
        ctx.beginPath(); //right leg
            ctx.moveTo(150,75);
            ctx.lineTo(180,150);
            ctx.stroke();
    }
    else if(wrongNumber==7){
        ctx.beginPath(); //left leg
            ctx.moveTo(150,75);
            ctx.lineTo(120,150);
            ctx.stroke();
    }
    
 }
