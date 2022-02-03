
//var roller = document.getElementById("roller");
var startGame = document.getElementById("startGame");
/* roller.addEventListener(
   "click", 
   function () {
     Dice.showDie("die01", Dice.roll());
     Dice.showDie("die02", Dice.roll());
     Dice.showDie("die03", Dice.roll());
     Dice.showDie("die04", Dice.roll());
     Dice.showDie("die05", Dice.roll());
   }, 
   false);*/

startGame.addEventListener("click", playGame);

function initializeBoard() {

  document.getElementsByClassName("board")[0].innerHTML =
    `
  <section class="play-area">
<div class="throwing-area">
  <div class="message-board"></div>
</div>
<div class="player-area">
  <button id="roller">Roll</button>
  <div class="dice-group">
    <div id="die01" class="dice-container"></div>
    <div id="die02" class="dice-container"></div>
    <div id="die03" class="dice-container"></div>
    <div id="die04" class="dice-container"></div>
    <div id="die05" class="dice-container"></div>

  </div>
  <div id="dicePrompt" style="visibility:hidden;" ><div class="checkboxes">
  <input type="checkbox" id="die01_cb">
  <input type="checkbox" id="die02_cb">
  <input type="checkbox" id="die03_cb">
  <input type="checkbox" id="die04_cb">
  <input type="checkbox" id="die05_cb">
  <br>
  <p>Please select which dice you'd like to keep</p>
  </div></div>
</div>
</section>
<section class="scorecard-area">
<table id="scorecard" border="1">
  <tbody>
    <tr>
      <td></td>
      <td>Player 1</td>
      <td>Player 2</td>
    </tr>
    <tr>
      <td>Ones</td>
      <td id="player1_ones"></td>
      <td id="player2_ones"></td>
    </tr>
    <tr>
      <td>Twos</td>
      <td id="player1_twos"></td>
      <td id="player2_twos"></td>
    </tr>
    <tr>
      <td>Threes</td>
      <td id="player1_threes"></td>
      <td id="player2_threes"></td>
    </tr>
    <tr>
      <td>Fours</td>
      <td id="player1_fours"></td>
      <td id="player2_fours"></td>
    </tr>
    <tr>
      <td>Fives</td>
      <td id="player1_fives"></td>
      <td id="player2_fives"></td>
    </tr>
    <tr>
      <td>Sixes</td>
      <td id="player1_sixes"></td>
      <td id="player2_sixes"></td>
    </tr>
    <tr>
      <td>Sum</td>
      <td id="player1_sum"></td>
      <td id="player2_sum"></td>
    </tr>
    <tr>
      <td>Bonus</td>
      <td id="player1_bonus"></td>
      <td id="player2_bonus"></td>
    </tr>
    <tr>
      <td>Three of a kind</td>
      <td id="player1_threeOfA_Kind"></td>
      <td id="player2_threeOfA_Kind"></td>
    </tr>
    <tr>
      <td>Four of a kind</td>
      <td id="player1_fourOfA_Kind"></td>
      <td id="player2_fourOfA_Kind"></td>
    </tr>
    <tr>
      <td>Full House</td>
      <td id="player1_fullHouse"></td>
      <td id="player2_fullHouse"></td>
    </tr>
    <tr>
      <td>Small Straight</td>
      <td id="player1_smallStraight"></td>
      <td id="player2_smallStraight"></td>
    </tr>
    <tr>
      <td>Large Straight</td>
      <td id="player1_largeStraight"></td>
      <td id="player2_largeStraight"></td>
    </tr>
    <tr>
      <td>Chance</td>
      <td id="player1_chance"></td>
      <td id="player2_chance"></td>
    </tr>
    <tr>
      <td>YATZE</td>
      <td id="player1_yahtzee"></td>
      <td id="player2_yahtzee"></td>
    </tr>
    <tr>
      <td>TOTAL SCORE</td>
      <td id="player1_totalScore"></td>
      <td id="player1_totalScore"></td>
    </tr>
  </tbody>
</table>
</section>

  
  `
    ;


}
function playGame() {
  initializeBoard();

  Dice.showDie("die01", 0);
  Dice.showDie("die02", 0);
  Dice.showDie("die03", 0);
  Dice.showDie("die04", 0);
  Dice.showDie("die05", 0);
  var currentRound = 1;
  var playerOneTurn = true;


  if (playerOneTurn) {
    var rollsLeft = 3;
    /* while (rollsLeft > 0){
       var roller = document.getElementById("roller");
       roller.addEventListener("click",rollDice);

        rollsLeft--;
     }*/
    //1st roll
    roll();
     
    //2nd roll

    //3rd roll
    playerOneTurn = false;
  }

  else if (!playerOneTurn) {
    var rollsLeft = 3;
    while (rollsLeft > 0) {
      rollsLeft--;
    }
    playerOneTurn = false;
  }

  currentRound++;

}
function rollDice() {
  Dice.showDie("die01", Dice.roll());
  Dice.showDie("die02", Dice.roll());
  Dice.showDie("die03", Dice.roll());
  Dice.showDie("die04", Dice.roll());
  Dice.showDie("die05", Dice.roll());
}

function roll() {
  //1st turn
  roller.addEventListener("click", function () {
    //rollDice();
    
    
    var die01_cb = document.getElementById('die01_cb');
    var die02_cb = document.getElementById('die02_cb');
    var die03_cb = document.getElementById('die03_cb');
    var die04_cb = document.getElementById('die04_cb');
    var die05_cb = document.getElementById('die05_cb');
    var diceValues = [];
    for (let i = 1; i <= 5; i++){
        
          if (document.getElementById('die0'+i+'_cb').checked == false){
            Dice.showDie("die0"+i, Dice.roll());
            document.getElementById("die0"+i).style.opacity = "100%";
            diceValues.push(document.getElementById('die0'+i).children[0].getElementsByTagName('div').length / 2) ;
          }
          else{
            document.getElementById("die0"+i).style.opacity = "50%";
          }
            
        

    }
    
    var die01Value = (document.getElementById('die01').children[0].getElementsByTagName('div').length) / 2;
    var die02Value = (document.getElementById('die02').children[0].getElementsByTagName('div').length) / 2;
    var die03Value = (document.getElementById('die03').children[0].getElementsByTagName('div').length) / 2;
    var die04Value = (document.getElementById('die04').children[0].getElementsByTagName('div').length) / 2;
    var die05Value = (document.getElementById('die05').children[0].getElementsByTagName('div').length) / 2;

    allDiceValues = [die01Value,die02Value,die03Value,die04Value,die05Value];

    console.log("OG: "+diceValues);
    var possibleScores = getPossibleScores(allDiceValues);
    updateScoreBoard(possibleScores);

    //wait for user input on which thing they select
    document.getElementById("dicePrompt").style.visibility = "visible";
     



    //take best one, add to score
  });
}
function updateScoreBoard(possibleScores) {
  console.log(possibleScores);
  for (let i = 0; i < possibleScores.length; i++) {
    switch (possibleScores[i][0]) {
      case 'ones':
        document.getElementById("player1_ones").innerHTML = possibleScores[i][1];
        break;
      case 'twos':
        document.getElementById("player1_twos").innerHTML = possibleScores[i][1];

        break;
      case 'threes':
        document.getElementById("player1_threes").innerHTML = possibleScores[i][1];

        break;
      case 'fours':
        document.getElementById("player1_fours").innerHTML = possibleScores[i][1];

        break;
      case 'fives':
        document.getElementById("player1_fives").innerHTML = possibleScores[i][1];

        break;
      case 'sixes':
        document.getElementById("player1_sixes").innerHTML = possibleScores[i][1];

        break;
      case 'threeOfA_Kind':
        document.getElementById("player1_threeOfA_Kind").innerHTML = possibleScores[i][1];

        break;
      case 'fourOfA_Kind':
        document.getElementById("player1_fourOfA_Kind").innerHTML = possibleScores[i][1];

        break;
      case 'fullHouse':
        document.getElementById("player1_fullHouse").innerHTML = possibleScores[i][1];

        break;
      case 'smallSraight':
        document.getElementById("player1_smallSraight").innerHTML = possibleScores[i][1];

        break;
      case 'largeStraight':
        document.getElementById("player1_largeStraight").innerHTML = possibleScores[i][1];

        break;
      case 'chance':
        document.getElementById("player1_chance").innerHTML = possibleScores[i][1];

        break;
      case 'yahtzee':
        document.getElementById("player1_yahtzee").innerHTML = possibleScores[i][1];

        break;

    }
  }
}
function getPossibleScores(diceCombination) {
  diceCombination.sort();
  console.log("sorted: "+diceCombination);
  const possibleScores = [];
  var counter = 0;
  var scored = false;
  let combinationSum = 0;
  for (let i = 0; i < 5; i++) {
    combinationSum += diceCombination[i];
  }

  possibleScores.push(["chance", combinationSum * 1]);

  //GAME HANDS HERE**********************************************************************************

  //UPPER SECTION RULES
  //ONES
  counter = 1;
  scoredN = false;
  scoredThreeOfA_Kind = false;
  scoredFourOfA_Kind = false;
  scoredFullHouse = false;
  scoredYahtzee = false;

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == 1) {

      if (diceCombination[i + 1] == 1) {
        counter++;
        continue;
      }
      possibleScores.push(["ones", counter * 1]);
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3) {

        possibleScores.push(["threeOfA_Kind", combinationSum * 1]);
        scoredThreeOfA_Kind = true;

        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {

        possibleScores.push(["fourOfA_Kind", combinationSum * 1]);
        scoredFourOfA_Kind = true;
      }
      if (counter == 5) {

        possibleScores.push(["yahtzee", 50 * 1]);
        scoredYahtzee = true;
      }
    }


  }
  switch (false) {
    case scoredN:
      possibleScores.push(["ones", ""]);
      break;
    case scoredThreeOfA_Kind:
      possibleScores.push(["threeOfA_Kind", ""]);
      break;
    case scoredFullHouse:
      possibleScores.push(["fullHouse", ""]);
      break;
    case scoredFourOfA_Kind:
      possibleScores.push(["fourOfA_Kind", ""]);
      break;
    case scoredYahtzee:
      possibleScores.push(["yahtzee", ""]);
      break;
  }



  //TWOS
  counter = 1;
  scoredN = false;
  scoredThreeOfA_Kind = false;
  scoredFourOfA_Kind = false;
  scoredFullHouse = false;
  scoredYahtzee = false;

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == 2) { //change here

      if (diceCombination[i + 1] == 2) { //change here
        counter++;
        continue;
      }
      possibleScores.push(["twos", counter * 2]); //change herex2
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3) {

        possibleScores.push(["threeOfA_Kind", combinationSum * 1]);
        scoredThreeOfA_Kind = true;

        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {

        possibleScores.push(["fourOfA_Kind", combinationSum * 1]);
        scoredFourOfA_Kind = true;
      }
      if (counter == 5) {

        possibleScores.push(["yahtzee", 50 * 1]);
        scoredYahtzee = true;
      }
    }


  }
  switch (false) {
    case scoredN:
      possibleScores.push(["twos", ""]); //change here
      break;
    case scoredThreeOfA_Kind:
      possibleScores.push(["threeOfA_Kind", ""]);
      break;
    case scoredFullHouse:
      possibleScores.push(["fullHouse", ""]);
      break;
    case scoredFourOfA_Kind:
      possibleScores.push(["fourOfA_Kind", ""]);
      break;
    case scoredYahtzee:
      possibleScores.push(["yahtzee", ""]);
      break;
  }
  //Threes
  counter = 1;
  scoredN = false;
  scoredThreeOfA_Kind = false;
  scoredFourOfA_Kind = false;
  scoredFullHouse = false;
  scoredYahtzee = false;

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == 3) { //change here

      if (diceCombination[i + 1] == 3) { //change here
        counter++;
        continue;
      }
      possibleScores.push(["threes", counter * 3]); //change herex2
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3) {

        possibleScores.push(["threeOfA_Kind", combinationSum * 1]);
        scoredThreeOfA_Kind = true;

        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {

        possibleScores.push(["fourOfA_Kind", combinationSum * 1]);
        scoredFourOfA_Kind = true;
      }
      if (counter == 5) {

        possibleScores.push(["yahtzee", 50 * 1]);
        scoredYahtzee = true;
      }
    }


  }
  switch (false) {
    case scoredN:
      possibleScores.push(["threes", ""]); //change here
      break;
    case scoredThreeOfA_Kind:
      possibleScores.push(["threeOfA_Kind", ""]);
      break;
    case scoredFullHouse:
      possibleScores.push(["fullHouse", ""]);
      break;
    case scoredFourOfA_Kind:
      possibleScores.push(["fourOfA_Kind", ""]);
      break;
    case scoredYahtzee:
      possibleScores.push(["yahtzee", ""]);
      break;
  }
  //FOURS
  counter = 1;
  scoredN = false;
  scoredThreeOfA_Kind = false;
  scoredFourOfA_Kind = false;
  scoredFullHouse = false;
  scoredYahtzee = false;

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == 4) { //change here

      if (diceCombination[i + 1] == 4) { //change here
        counter++;
        continue;
      }
      possibleScores.push(["twos", counter * 4]); //change herex2
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3) {

        possibleScores.push(["threeOfA_Kind", combinationSum * 1]);
        scoredThreeOfA_Kind = true;

        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {

        possibleScores.push(["fourOfA_Kind", combinationSum * 1]);
        scoredFourOfA_Kind = true;
      }
      if (counter == 5) {

        possibleScores.push(["yahtzee", 50 * 1]);
        scoredYahtzee = true;
      }
    }


  }
  switch (false) {
    case scoredN:
      possibleScores.push(["fours", ""]); //change here
      break;
    case scoredThreeOfA_Kind:
      possibleScores.push(["threeOfA_Kind", ""]);
      break;
    case scoredFullHouse:
      possibleScores.push(["fullHouse", ""]);
      break;
    case scoredFourOfA_Kind:
      possibleScores.push(["fourOfA_Kind", ""]);
      break;
    case scoredYahtzee:
      possibleScores.push(["yahtzee", ""]);
      break;
  }


  //FIVES
  counter = 1;
  scoredN = false;
  scoredThreeOfA_Kind = false;
  scoredFourOfA_Kind = false;
  scoredFullHouse = false;
  scoredYahtzee = false;

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == 5) { //change here

      if (diceCombination[i + 1] == 5) { //change here
        counter++;
        continue;
      }
      possibleScores.push(["fives", counter * 5]); //change herex2
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3) {

        possibleScores.push(["threeOfA_Kind", combinationSum * 1]);
        scoredThreeOfA_Kind = true;

        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {

        possibleScores.push(["fourOfA_Kind", combinationSum * 1]);
        scoredFourOfA_Kind = true;
      }
      if (counter == 5) {

        possibleScores.push(["yahtzee", 50 * 1]);
        scoredYahtzee = true;
      }
    }


  }
  switch (false) {
    case scoredN:
      possibleScores.push(["fives", ""]); //change here
      break;
    case scoredThreeOfA_Kind:
      possibleScores.push(["threeOfA_Kind", ""]);
      break;
    case scoredFullHouse:
      possibleScores.push(["fullHouse", ""]);
      break;
    case scoredFourOfA_Kind:
      possibleScores.push(["fourOfA_Kind", ""]);
      break;
    case scoredYahtzee:
      possibleScores.push(["yahtzee", ""]);
      break;
  }
  //SIXES
  counter = 1;
  scoredN = false;
  scoredThreeOfA_Kind = false;
  scoredFourOfA_Kind = false;
  scoredFullHouse = false;
  scoredYahtzee = false;

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == 6) { //change here

      if (diceCombination[i + 1] == 6) { //change here
        counter++;
        continue;
      }
      possibleScores.push(["sixes", counter * 6]); //change herex2
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3) {

        possibleScores.push(["threeOfA_Kind", combinationSum * 1]);
        scoredThreeOfA_Kind = true;

        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores.push(["fullHouse", 25 * 1]);
            scoredFullHouse = true;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {

        possibleScores.push(["fourOfA_Kind", combinationSum * 1]);
        scoredFourOfA_Kind = true;
      }
      if (counter == 5) {

        possibleScores.push(["yahtzee", 50 * 1]);
        scoredYahtzee = true;
      }
    }


  }
  switch (false) {
    case scoredN:
      possibleScores.push(["sixes", ""]); //change here
      break;
    case scoredThreeOfA_Kind:
      possibleScores.push(["threeOfA_Kind", ""]);
      break;
    case scoredFullHouse:
      possibleScores.push(["fullHouse", ""]);
      break;
    case scoredFourOfA_Kind:
      possibleScores.push(["fourOfA_Kind", ""]);
      break;
    case scoredYahtzee:
      possibleScores.push(["yahtzee", ""]);
      break;
  }
  //LOWER SECTION RULES ****************************************************** //
  //SMALL STRAIGHT 
  counter = 0;
  for (let i = 0; i < diceCombination.length - 1; i++) {
    for (let j = i + 1; j < diceCombination.length; j++) {
      if (diceCombination[i] == diceCombination[j] - 1) {
        counter++;
      }
    }

  }
  if (counter == 4) {
    possibleScores.push(["smallStraight", 30 * 1]);
  }
  if (counter == 5) {
    possibleScores.push(["largeStraight", 40 * 1]);
  }


  return possibleScores;
}
