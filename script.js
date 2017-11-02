function initialize()
// get things ready... called by onload event
{
  // global variables used by other functions
	plainCellStyle = "background-color:#C0C0C0";
	highlightedCellStyle = "background-color:yellow";
	totalNumberOfGames = 0;  // no games completed yet
	numberOfTimesPlayerWon = 0; // no games yet, so no wins yet
	numberOfTimesPlayerLost = 0; // no games yet, so no losses yet
	userMadeFirstSelection = false; // determines which of two "rounds" we are in
	doorWeOpenedAlready = -1; // this will be 0, 1, or 2 after the player makes a selection
	clicksNotAllowed = false;  // used to temporarily disable click
	doors = [ "win-or-lose", "win-or-lose", "win-or-lose" ]; // our representation of the doors
	// let's get started
	setUpForAGame();
}

function setUpForAGame()
// prepare for a new game... called from initialize() and secondRound()
{
	 document.getElementById('instruct').innerHTML = "Select a door...";
		 userMadeFirstSelection = false;
	 // start with all doors as losers
	 for(var i=0; i<doors.length; i++)
	     doors[i] = "lose";
	 var winner = Math.floor(Math.random() * 3); // max is 2, min is 0
	 doors[winner] = "win"; // we now have 1 winner and 2 losers
	 alert("winning door is " + (winner+1));
	 // reset all images and cells backgrounds on page
	 for(var i=1; i<4; i++){
	    var imageId = "door" + i;
	    document.getElementById(imageId).src = "locked-wooden-door_w290_h218.jpg";
			document.getElementById(imageId).height = 218;
			document.getElementById(imageId).width = 290;
	}
}

function userSelected(doorNumber)
// image click handler. doorNumber inidcates which image was clicked.
{
  if(clicksNotAllowed)
	   return; // ignore this click
	if (userMadeFirstSelection == false){
	    // "highlight" the door by making it bigger
	    var imageId="door"+doorNumber
	    document.getElementById(imageId).height = document.getElementById(imageId).height * 1.2;
			document.getElementById(imageId).width = document.getElementById(imageId).width * 1.2;
	    firstRound(doorNumber);
			}
	else
	    secondRound(doorNumber);
}

function delayedDisplay()
// show the image. Called by firstRound()
{
  var imageId="door"+doorWeOpenedAlready;
	document.getElementById(imageId).src="goat-and-bambis-fawns_w290_h218.jpg";
	clicksNotAllowed = false; // pay attention to clicks again
}

function firstRound(doorNumber)
// Display one of the losers and provide instructions. Called by userSelected()
{
   clicksNotAllowed = true; // temporarily ignore clicks
	 userMadeFirstSelection = true; // remember that we have already done round one
	 // display one of the losers and let player decide if she wants to switch or keep it
	 var doorToOpen = pickOneOfRemainingDoors(doorNumber);
	 var imageId="door"+doorToOpen;
	 //document.getElementById(imageId).src="goat-and-bambis-fawns_w290_h218.jpg";
	 setTimeout("delayedDisplay()",1000);
	 doorWeOpenedAlready = doorToOpen; // remember this for round two
	 document.getElementById('instruct').innerHTML = "I'll show you what's behind door number " +
	       doorToOpen +". Pick one of the remaining doors to see if you win.";
}

function pickOneOfRemainingDoors(initialSelection)
// Selects the loser to display. Called by firstRound()
{	
	var candidate;
	var randomNumber = initialSelection; //set random number as initialSelection for while condition
	
		//find which is the winning door
 		for (candidate = 0; candidate < 3; candidate++){
			  	if (doors[candidate] == "win")  // this is the winner
				   			break;												
		}
		candidate += 1; //increment winning door to be in range 1-3, not 0-2

		//generate random number that is not the same as the winning door, or the initial door selected
		while(randomNumber == initialSelection || randomNumber == candidate){
			randomNumber = Math.floor(Math.random() * 3) + 1;
		}
		candidate = randomNumber;

	return candidate;
}

function secondRound(doorNumber)
// Determine how the round ends (win/lose) and makes sure we're ready for a new game. Called by userSelected()
{
	if (doorNumber == doorWeOpenedAlready){
	   alert("Pick one of the other doors");
		 return; // ignore this click
		 }
	if (doors[doorNumber-1] == "win")
	   playerWins(doorNumber);
	else
	   playerLoses(doorNumber);
	// get ready for next game
	// setUpForAGame();
	setTimeout(function(){
      document.getElementById('instruct').innerHTML = "Select a door...";
		  userMadeFirstSelection = false;
	  // start with all doors as losers
	  for(var i=0; i<doors.length; i++)
	      doors[i] = "lose";
	  var winner = Math.floor(Math.random() * 3); // max is 2, min is 0
	  doors[winner] = "win"; // we now have 1 winner and 2 losers
	  alert("winning door is " + (winner+1));
	  // reset all images and cells backgrounds on page
	  for(var i=1; i<4; i++){
	      var imageId = "door" + i;
	      document.getElementById(imageId).src = "locked-wooden-door_w290_h218.jpg";
			  document.getElementById(imageId).height = 218;
			  document.getElementById(imageId).width = 290;
	  }
    }, 
    1000);
}

function playerWins(doorToOpen)
// handle a win. Called by secondRound()
{
	playWin();
   var imageId="door"+doorToOpen;
	 document.getElementById(imageId).src="blue-ford-falcon-ba-xr6-car_w290_h218.jpg";
	 alert("you won!");
	 totalNumberOfGames++;
	 numberOfTimesPlayerWon++;
	 var percent = numberOfTimesPlayerWon / totalNumberOfGames * 100;
	 displayStats(percent);
}

function playerLoses(doorToOpen)
{
	playLose();
   var imageId="door"+doorToOpen;
	 document.getElementById(imageId).src="goat-and-bambis-fawns_w290_h218.jpg";
	 alert("you lost");
	 count = document.getElementById("lossesDiv").innerHTML;
	 count++;
	 document.getElementById("lossesDiv").innerHTML = count;
	 totalNumberOfGames++;
	 numberOfTimesPlayerLost++;
	 var percent = numberOfTimesPlayerWon / totalNumberOfGames * 100;
	 displayStats(percent);
}

function displayStats(percentage)
// Put the numbers at the top of the page. Called by playerWins() and PlayerLoses()
{
   document.getElementById('gamesDiv').innerHTML = totalNumberOfGames;
	 document.getElementById('winsDiv').innerHTML = numberOfTimesPlayerWon;
   document.getElementById('percentDiv').innerHTML = percentage.toFixed(2);
}

function showSource() {
	document.getElementById("outputDiv").innerHTML="Public Domain Image dot com";
}

function hideSource() {
	document.getElementById("outputDiv").innerHTML="";
}

function playWin() {
  var winSound = document.getElementById("win");  
  winSound.play();
}

function playLose() {
  var loseSound = document.getElementById("lose");  
  loseSound.play();
}
