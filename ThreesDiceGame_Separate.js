/*
Threes Dice Game
By stringzzz, Ghostwarez Co.
04-21-2023
*/

var values = [ 0, 1, 2, 0, 4, 5, 6 ];
var playerFirst = "?";

var playerScore = "?";
var playerCredits = 10;
var pRollA = 1;
var pRollB = 1;

var comScore = "?";
var comCredits = 10;
var comRollA = 1;
var comRollB = 1;
var keepBoth = 0;

function startGame() {
	playerCredits = 10;
	comCredits = 10;
	document.getElementById("player-credits").innerHTML = "Credits: 10";
	document.getElementById("com-credits").innerHTML = "Credits: 10";
	document.getElementById("player-score").innerHTML = "Score: ?";
	document.getElementById("com-score").innerHTML = "Score: ?";
	playerFirst = (Math.floor(Math.random() * 2));

	var output = document.getElementById("text-output");
	if (playerFirst) {
		output.innerHTML = "Player goes first";
		document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"pRollBothAnimation();\">Roll Both</button>";
	}
	else {
		output.innerHTML = "Computer goes first";
		document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cRollBothAnimation();\">Continue</button>";
	}
}

//Roll both dice player functions

function pRollBothAnimation() {
	if (playerFirst) {
		document.getElementById("player-score").innerHTML = "Score: ?";
		document.getElementById("com-score").innerHTML = "Score: ?";
	}
	document.getElementById("diceA").src = "pdiceroll.gif";
	document.getElementById("diceB").src = "pdiceroll.gif";
	document.getElementById("text-output").innerHTML = "Player rolled both dice";
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "";
	setTimeout(pRollBoth, 2000);
}    

function pRollBoth() {
	pRollA = (Math.ceil(Math.random() * 6));
	pRollB = (Math.ceil(Math.random() * 6));
	document.getElementById("diceA").src = "pdice" + pRollA + ".png";
	document.getElementById("diceB").src = "pdice" + pRollB + ".png";
	playerScore = values[pRollA] + values[pRollB];
	if (playerScore == 12) {
		playerScore = 0;
	}
	document.getElementById("player-score").innerHTML = "Score: " + playerScore;
	document.getElementById("text-output").innerHTML = "Player rolled " + pRollA + " and " + pRollB + " for a score of " + playerScore;
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"pReRollAAnimation();\">Re-Roll A</button>" + "<button class=\"buttons\" onclick=\"pReRollBAnimation();\">Re-Roll B</button>";
	if (pRollA == pRollB) {
		if (playerFirst) {
			buttonBox.innerHTML += "<button class=\"buttons\" onclick=\"cRollBothAnimation();\">Keep Both</button>";
		}
		else {
			buttonBox.innerHTML += "<button class=\"buttons\" onclick=\"judgeWin();\">Keep Both</button>";
		}
	}
}

//Roll both computer functions

function cRollBothAnimation() {
	if (!playerFirst) {
		document.getElementById("player-score").innerHTML = "Score: ?";
		document.getElementById("com-score").innerHTML = "Score: ?";
	}

	document.getElementById("cdiceA").src = "cdiceroll.gif";
	document.getElementById("cdiceB").src = "cdiceroll.gif";
	document.getElementById("text-output").innerHTML = "Computer rolled both dice";
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "";
	setTimeout(cRollBoth, 2000);
}    

function cRollBoth() {
	cRollA = (Math.ceil(Math.random() * 6));
	cRollB = (Math.ceil(Math.random() * 6));
	document.getElementById("cdiceA").src = "cdice" + cRollA + ".png";
	document.getElementById("cdiceB").src = "cdice" + cRollB + ".png";
	comScore = values[cRollA] + values[cRollB];
	if (comScore == 12) {
		comScore = 0;
	}

	document.getElementById("com-score").innerHTML = "Score: " + comScore;
	document.getElementById("text-output").innerHTML = "Computer rolled " + cRollA + " and " + cRollB + " for a score of " + comScore;
	cRollA = values[cRollA];
	cRollB = values[cRollB];
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"cPhase2();\">Continue</button>";
}

//Computer logic for after rolling both dice

function cPhase2() {
	if (playerFirst) {
		if ((cRollA == cRollB) && (comScore < playerScore)) {
			document.getElementById("text-output").innerHTML = "Computer is keeping both";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"judgeWin();\">Continue</button>";
		}
		else if ((cRollA == 6) && (playerScore < cRollB)) {
			document.getElementById("text-output").innerHTML = "Computer is re-rolling dice B";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollBAnimation();\">Continue</button>";
		}
		else if ((cRollB == 6) && (playerScore < cRollA)) {
			document.getElementById("text-output").innerHTML = "Computer is re-rolling dice A";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollAAnimation();\">Continue</button>";
		}
		else if (cRollA > cRollB) {
			document.getElementById("text-output").innerHTML = "Computer is re-rolling dice A";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollAAnimation();\">Continue</button>";
		}
		else {
		    	document.getElementById("text-output").innerHTML = "Computer is re-rolling dice B";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollBAnimation();\">Continue</button>";
		}
	}
	else {
		if ((cRollA == cRollB) && comScore <= 3) {
			document.getElementById("text-output").innerHTML = "Computer is keeping both";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"pRollBothAnimation();\">Continue</button>";
		}
		else if ((cRollA == 6) && (cRollB >= 4)) {
		document.getElementById("text-output").innerHTML = "Computer is re-rolling dice B";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollBAnimation();\">Continue</button>";
		}
		else if ((cRollB == 6) && (cRollA >= 4)) {
		document.getElementById("text-output").innerHTML = "Computer is re-rolling dice A";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollAAnimation();\">Continue</button>";
		}
		else if (cRollA > cRollB) {
			document.getElementById("text-output").innerHTML = "Computer is re-rolling dice A";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollAAnimation();\">Continue</button>";
		}
		else {
		    	document.getElementById("text-output").innerHTML = "Computer is re-rolling dice B";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cReRollBAnimation();\">Continue</button>";
		}
	}
}

//Computer re-roll functions

function cReRollAAnimation() {
	document.getElementById("cdiceA").src = "cdiceroll.gif";
	document.getElementById("text-output").innerHTML = "Computer Re-Rolled dice A";
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "";
	setTimeout(cReRollA, 2000);
}

function cReRollA() {
	cRollA = (Math.ceil(Math.random() * 6));
	document.getElementById("cdiceA").src = "cdice" + cRollA + ".png";

	comScore = values[cRollA] + cRollB;
	if (comScore == 12) {
		comScore = 0;
	}
	document.getElementById("com-score").innerHTML = "Score: " + comScore;
	document.getElementById("text-output").innerHTML = "Computer rolled " + cRollA + " for a score of " + comScore;
	var buttonBox = document.getElementById("buttonBox");
	if (playerFirst) {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"judgeWin();\">Continue</button>";
	}
	else {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"pRollBothAnimation();\">Roll Both</button>";
	}
}

function cReRollBAnimation() {
	document.getElementById("cdiceB").src = "cdiceroll.gif";
	document.getElementById("text-output").innerHTML = "Computer Re-Rolled dice B";
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "";        
	setTimeout(cReRollB, 2000);
}

function cReRollB() {
	cRollB = (Math.ceil(Math.random() * 6));
	document.getElementById("cdiceB").src = "cdice" + cRollB + ".png";

	comScore = cRollA + values[cRollB];
	if (comScore == 12) {
		comScore = 0;
	}
	document.getElementById("com-score").innerHTML = "Score: " + comScore;
	document.getElementById("text-output").innerHTML = "Computer rolled " + cRollB + " for a score of " + comScore;
	var buttonBox = document.getElementById("buttonBox");
	    	if (playerFirst) {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"judgeWin();\">Continue</button>";
	}
	else {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"pRollBothAnimation();\">Roll Both</button>";
	}
}

//Player re-roll functions

function pReRollAAnimation() {
	document.getElementById("diceA").src = "pdiceroll.gif";
	document.getElementById("text-output").innerHTML = "Player Re-Rolled dice A";
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "";
	setTimeout(pReRollA, 2000);
}

function pReRollA() {
	pRollA = (Math.ceil(Math.random() * 6));
	document.getElementById("diceA").src = "pdice" + pRollA + ".png";

	playerScore = values[pRollA] + values[pRollB];
	if (playerScore == 12) {
		playerScore = 0;
	}
	document.getElementById("player-score").innerHTML = "Score: " + playerScore;
	document.getElementById("text-output").innerHTML = "Player rolled " + pRollA + " for a score of " + playerScore;
	var buttonBox = document.getElementById("buttonBox");
	if (playerFirst) {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"cRollBothAnimation();\">Continue</button>";
	}
	else {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"judgeWin();\">Finish Round</button>";
	}
}

function pReRollBAnimation() {
	document.getElementById("diceB").src = "pdiceroll.gif";
	document.getElementById("text-output").innerHTML = "Player Re-Rolled dice B";
	var buttonBox = document.getElementById("buttonBox");
	buttonBox.innerHTML = "";
	setTimeout(pReRollB, 2000);
}

function pReRollB() {
	pRollB = (Math.ceil(Math.random() * 6));
	document.getElementById("diceB").src = "pdice" + pRollB + ".png";

	playerScore = values[pRollA] + values[pRollB];
	if (playerScore == 12) {
		playerScore = 0;
	}
	document.getElementById("player-score").innerHTML = "Score: " + playerScore;
	document.getElementById("text-output").innerHTML = "Player rolled " + pRollB + " for a score of " + playerScore;
	var buttonBox = document.getElementById("buttonBox");	
	if (playerFirst) {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"cRollBothAnimation();\">Continue</button>";
	}
	else {
		buttonBox.innerHTML = "<button class=\"buttons\" onclick=\"judgeWin();\">Finish Round</button>";
	}
}

//Function for judging the results of the round

function judgeWin() {
	if (playerScore < comScore) {
		document.getElementById("text-output").innerHTML = "Player Wins!";
		playerCredits++;
		document.getElementById("player-credits").innerHTML = "Credits: " + playerCredits;
		comCredits--;
		document.getElementById("com-credits").innerHTML = "Credits: " + comCredits;
		if (comCredits == 0) {
			document.getElementById("text-output").innerHTML += " Player wins the whole game!";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"startGame();\">Start Game</button>";
		return;
		}
	}
	else if (playerScore > comScore) {
	   	document.getElementById("text-output").innerHTML = "Computer Wins!";
		playerCredits--;
		document.getElementById("player-credits").innerHTML = "Credits: " + playerCredits;
		comCredits++;
		document.getElementById("com-credits").innerHTML = "Credits: " + comCredits;
		if (playerCredits == 0) {
			document.getElementById("text-output").innerHTML += " Computer wins the whole game!";
			document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"startGame();\">Start Game</button>";
		return;
		}
	}
	else {
		document.getElementById("text-output").innerHTML = "Tie Game!";
		playerFirst ^= 1;
	}

	if (playerFirst) {
		playerFirst ^= 1;
		document.getElementById("text-output").innerHTML += " Next round, Computer goes first";
		document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"cRollBothAnimation();\">Continue</button>";
	}
	else {
		playerFirst ^= 1;
		document.getElementById("text-output").innerHTML += " Next round, Player goes first";
		document.getElementById("buttonBox").innerHTML = "<button class=\"buttons\" onclick=\"pRollBothAnimation();\">Roll Both</button>";
	}
}

function showRules() {
	document.getElementById("rule-box").innerHTML = "The goal of each round is to get the lowest score. On a players turn, they roll both dice. The score is the sum of the two dice. Each dice roll is worth its respective value, except threes are always worth 0, and a pair of sixes are also worth 0 (One six by itself is just worth 6). Once the player rolls, they have to choose one dice to re-roll and adjust their score accordingly, but if the player had rolled a pair of the same number, they can instead choose to keep both. After both players have gotten their scores, they are compared. The lowest score wins, matching scores is a tie. The next round, the player who went second goes first.";
	var ruleButton = document.getElementById("rule-button");
	ruleButton.onclick = hideRules;
	ruleButton.innerHTML = "Hide Rules"; 
}

function hideRules() {
	document.getElementById("rule-box").innerHTML = "";
	var ruleButton = document.getElementById("rule-button");
	ruleButton.onclick = showRules;
	ruleButton.innerHTML = "Show Rules";
}
