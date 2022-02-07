

var playButton = document.getElementById("startGame");
playButton.addEventListener("click", playGame);

var possibleScores = [];

var player1Yahtzees = 0;
var rolls;




function playGame() {
  rolls = 0;
  var player1Turn = true;
  var flag = true;
  initializeBoard();
  var roller1 = document.getElementById("roller1");


  roller1.addEventListener("click", function(){firstRoll()
    roller1.disabled = false;
  });

  var reset = document.getElementById("reset");
  reset.addEventListener("click", playGame);
  
  var finish = document.getElementById("finish");

  finish.addEventListener("click", finishGame);


}
function finishGame(){
  var answer = getMax(possibleScores);
    window.alert("Your score is: "+answer);
}
function getMax(array){
  var max = 0;
  for (var i = 0; i < array.length; i++){
    if (Number.isInteger(array[i])){
      if (array[i] > max){
        max = array[i];
      }
    }
  }
  return max;
}
function firstRoll(){
 
  var die01_cb = document.getElementById('die01_cb');
  var die02_cb = document.getElementById('die02_cb');
  var die03_cb = document.getElementById('die03_cb');
  var die04_cb = document.getElementById('die04_cb');
  var die05_cb = document.getElementById('die05_cb');
  var diceValues = [];
  for (let i = 1; i <= 5; i++) {
    if (document.getElementById('die0' + i + '_cb').checked == false) {
      Dice.showDie("die0" + i, Dice.roll());
      document.getElementById("die0" + i).style.opacity = "100%";


      document.getElementById('die0'+i).style.transition = "all 0.85s ease-in-out";
      document.getElementById('die0'+i).style.transform = "translateY(-150px) rotate(350deg)"
      document.getElementById('die0'+i).children[0].style.boxShadow = "#2CB1BC 0px 0px 20px";




      diceValues.push(document.getElementById('die0' + i).children[0].getElementsByTagName('div').length / 2);
     
      


       

      
      //document.getElementById('die02').style.transform = "translateY(-200px)";
      //document.getElementById('die03').style.transform = "translateY(-200px)";
      //document.getElementById('die04').style.transform = "translateY(-200px)";
      //document.getElementById('die05').style.transform = "translateY(-200px)";

    }
    else {
      document.getElementById("die0" + i).style.opacity = "50%";
      document.getElementById('die0'+i).style.transition = "all 0.85s ease-in-out";
      document.getElementById('die0'+i).style.transform = "translateY(150px) rotate(-360deg)"
      document.getElementById('die0'+i).children[0].style.boxShadow = "none";
    }
  }

  

  possibleScores = getPossibleScores();
  possibleScores[13] = possibleScores[0] + possibleScores[1] + possibleScores[2]
    + possibleScores[3] + possibleScores[4] + possibleScores[5];
  updateScoreBoard(possibleScores);

  //wait for user input on which thing they select
  document.getElementById("dicePrompt").style.visibility = "visible";


  console.log(possibleScores);
  
  if (rolls >= 2){
    finishGame();
  }
  ++rolls;
}


function getDiceValues(){
  var die01Value = (document.getElementById('die01').children[0].getElementsByTagName('div').length) / 2;
  var die02Value = (document.getElementById('die02').children[0].getElementsByTagName('div').length) / 2;
  var die03Value = (document.getElementById('die03').children[0].getElementsByTagName('div').length) / 2;
  var die04Value = (document.getElementById('die04').children[0].getElementsByTagName('div').length) / 2;
  var die05Value = (document.getElementById('die05').children[0].getElementsByTagName('div').length) / 2;

  var allDiceValues = [die01Value, die02Value, die03Value, die04Value, die05Value];
  return allDiceValues;
}
function getPossibleScores() {
  diceCombination = getDiceValues();
  diceCombination.sort();
  var counter = 0;
  var scored = false;
  let combinationSum = 0;
  possibleScores[14] = 0;
  straightCounter = 0;
  for (let i = 0; i < 5; i++) {
    combinationSum += diceCombination[i];
  }
  possibleScores[11] = combinationSum;
  
  for (let i = 0; i < 6; i++) {
    computeRunOfN(i, diceCombination, possibleScores, combinationSum);
  }
  computeStraights(diceCombination, possibleScores);
  return possibleScores;
}
function computeRunOfN(n, diceCombination, possibleScores, combinationSum) {
  counter = 1;
  

  for (let i = 0; i < diceCombination.length; i++) {
    if (diceCombination[i] == n + 1) {

      if (diceCombination[i + 1] == (n + 1)) {
        counter++;
        //continue;
      }
      possibleScores[n] = counter * (n + 1);
      scoredN = true;
      //THREE OF A KIND
      if (counter == 3 ) {
        possibleScores[6] = combinationSum * 1;
        //FULL HOUSE
        if (diceCombination[0] == diceCombination[2]) {
          if (diceCombination[3] == diceCombination[4]) {
            possibleScores[8] = 25 * 1;
          }
        }
        if (diceCombination[4] == diceCombination[2]) {
          if (diceCombination[0] == diceCombination[1]) {
            possibleScores[8] = 25 * 1;
          }
        }

        //END OF FULL HOUSE

      }

      //FOUR OF A KIND
      if (counter == 4) {
        possibleScores[7] = combinationSum * 1;
      }

      //Yahtzee
      if (counter == 5 && i==4) {
        if (player1Yahtzees > 1){
          possibleScores[14] += parseInt(document.getElementById("player1_bonus").innerText)+100;
        }
        if (player1Yahtzees == 1) {
          possibleScores[14] = 100;
        }
        
        possibleScores[12] = 50 * 1;
        player1Yahtzees++;
        

      }
    }


  }
 
}
function computeStraights(diceCombination, possibleScores) {
  var smallStraightNoDups = [...new Set(diceCombination)];
  var largeStraightNoDups = [...new Set(diceCombination)];

  var smallStraightRightLength = smallStraightNoDups.length == 4;
  var largeStraightRightLength = largeStraightNoDups.length == 5;


  var isSmallStraight = (smallStraightRightLength && isConsecArray(smallStraightNoDups));
  var isLargeStraight = (largeStraightRightLength && isConsecArray(largeStraightNoDups));

  if (isSmallStraight) {
    possibleScores[9] = 30;
  }

  if (isLargeStraight) {
    possibleScores[10] = 40;
  }
}
function isConsecArray(arr) {
  var previous = arr[0];
  var i;
  var y = (arr.length);
  if (y > 1) {
    for (i = 1; i < y; i += 1) {
      if (parseInt(arr[i]) - 1 !== parseInt(previous)) {
        return false;
      }
      previous = arr[i];
    }
  }
  return true;
}
//https://stackoverflow.com/questions/31094154/simple-function-to-check-if-an-array-is-consecutive ^^


function updateScoreBoard(possibleScores) {
  //ones
  if (typeof possibleScores[0] !== 'undefined'){
  document.getElementById("player1_ones").innerHTML = possibleScores[0];}
  else{
    //document.getElementById("player1_ones").innerHTML = 0;
  }

  //twos
  if (typeof possibleScores[1] !== 'undefined'){
  document.getElementById("player1_twos").innerHTML = possibleScores[1];}
  else{
   // document.getElementById("player1_twos").innerHTML = 0;
  }

  //threes
  if (typeof possibleScores[2] !== 'undefined'){
  document.getElementById("player1_threes").innerHTML = possibleScores[2];}
  else{
   //document.getElementById("player1_threes").innerHTML = 0;
  }

  //fours
  if (typeof possibleScores[3] !== 'undefined'){
  document.getElementById("player1_fours").innerHTML = possibleScores[3];
  }
  else{
   // document.getElementById("player1_fours").innerHTML = 0;
  }
  //fives
  if (typeof possibleScores[4] !== 'undefined'){
  document.getElementById("player1_fives").innerHTML = possibleScores[4];}
  else{
  //  document.getElementById("player1_fives").innerHTML = 0;
  }
  //sixes
  if (typeof possibleScores[5] !== 'undefined'){
  document.getElementById("player1_sixes").innerHTML = possibleScores[5];}
  else{
   // document.getElementById("player1_sixes").innerHTML = 0;
  }
  //sum
  document.getElementById("player1_sum").innerHTML = possibleScores[11];
  
  //three oak
  if (typeof possibleScores[6] !== 'undefined'){
  document.getElementById("player1_threeOfA_Kind").innerHTML = possibleScores[6];}
  else{
  //  document.getElementById("player1_threeOfA_Kind").innerHTML = 0;
  }
  //four oak
  if (typeof possibleScores[7] !== 'undefined'){
  document.getElementById("player1_fourOfA_Kind").innerHTML = possibleScores[7];}
  else{
   // document.getElementById("player1_fourOfA_Kind").innerHTML = 0;
  }
  //full house
  if (typeof possibleScores[8] !== 'undefined'){
  document.getElementById("player1_fullHouse").innerHTML = possibleScores[8];}
  else{
    //document.getElementById("player1_fullHouse").innerHTML = 0;
  }
  //small straight
  if (typeof possibleScores[9] !== 'undefined'){
  document.getElementById("player1_smallStraight").innerHTML = possibleScores[9];}
  else{
  //  document.getElementById("player1_smallStraight").innerHTML = 0;
  }
  //large straight
  if (typeof possibleScores[10] !== 'undefined'){
  document.getElementById("player1_largeStraight").innerHTML = possibleScores[10];}
  else{
    //document.getElementById("player1_largeStraight").innerHTML = 0;
  }
  //chance
  if (typeof possibleScores[11] !== 'undefined'){
  document.getElementById("player1_chance").innerHTML = possibleScores[11];}
  else{
   // document.getElementById("player1_chance").innerHTML = 0;
  }
  //yahtzee
  if (typeof possibleScores[12] !== 'undefined'){
  document.getElementById("player1_yahtzee").innerHTML = possibleScores[12];}
  else{
   // document.getElementById("player1_yahtzee").innerHTML = 0;
  }
  //bonus
  if (typeof possibleScores[14] !== 'undefined'){
  document.getElementById("player1_bonus").innerHTML = possibleScores[14];}
  else{
   // document.getElementById("player1_bonus").innerHTML = 0;
  }
}
function initializeBoard() {
  document.getElementsByClassName("board")[0].innerHTML =
    
  `
<section class="play-area">
<div class="throwing-area">
<div class="message-board"></div>
</div>
<div class="player-area">

<div class="dice-group">
  <div id="die01" class="dice-container"></div>
  <div id="die02" class="dice-container"></div>
  <div id="die03" class="dice-container"></div>
  <div id="die04" class="dice-container"></div>
  <div id="die05" class="dice-container"></div>

</div>
<button id="roller1">Roll</button>
<button id="reset">Reset</button>
<button id="finish">Finish</button>

<div id="dicePrompt" style="visibility:hidden;" ><div class="checkboxes">
<input type="checkbox" id="die01_cb">
<input type="checkbox" id="die02_cb">
<input type="checkbox" id="die03_cb">
<input type="checkbox" id="die04_cb">
<input type="checkbox" id="die05_cb">
<br>

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
    <td>YAHTZEE</td>
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
`;


  Dice.showDie("die01", 0);
  Dice.showDie("die02", 0);
  Dice.showDie("die03", 0);
  Dice.showDie("die04", 0);
  Dice.showDie("die05", 0);


}
