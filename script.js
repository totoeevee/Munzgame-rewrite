//this is still a test LMAO
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var money = getCookie("money")
var yes = document.getElementById("help");
const mainp = document.getElementById("mainp")
var multi = getCookie("multiplier")

const commands = [

];
const console = [

];

function runCommand() {
  var input = document.getElementById("commandInput").value;
  document.getElementById("commandInput").value = "";
	usernm = getCookie("username")
  console.push(usernm+"@Munzgame:~$ " + input);
  for (const command of commands) {
    if (command.name == input) command.run();
  }
  var consoleString = "";
  for (var i = 0; i < console.length; i++) {
    if (i != 0) consoleString += "<br>";
    consoleString += console[i];
  }
  document.getElementById("console").innerHTML = consoleString;


	var money = getCookie("money")
	if (money == NaN){
		money = 0
	}
	
//xp gain
	var xp = parseInt(getCookie("XP"))
	var level = parseInt(getCookie("level"))
	var multi = parseFloat(getCookie("multiplier"))
	xp++
	setCookie("XP", xp, 9999)
	if (xp>=100+((level-1)*50)){
		multi+=0.1
		xp = 0
		level++
		setCookie("multiplier", multi, 9999)
		setCookie("level", level, 9999)
		setCookie("XP", xp, 9999)
		console.push("You leveled up!")
	}

	document.getElementById( 'bottom' ).scrollIntoView();
}

class Command {
  constructor(name, desc, run) {
    this.name = name;
    this.desc = desc;
    this.run = run;
  }
}

const M = {};
M.registerCommand = function(command) {
  commands.push(command);
  return this;
}

//dev
M.registerCommand(new Command("reset", "delete your save file" , ()=>{
	document.cookie = "money=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	console.push("You reset.")
}))

//create
M.registerCommand(new Command("create", "Create a new save" , ()=>{
	document.cookie = "money = 0";
	document.cookie = "username = " ;
	document.cookie = "multiplier = 1 ";
	document.cookie = "level = 1";
	document.cookie = "XP = 0";
	document.cookie = "prestige = 0";
	document.cookie = "path=/;";
	console.push("You created something.")
}))


//stuff

//help
M.registerCommand(new Command('help', 'shows all commands', () => {
    console.push("Available Commands:");
    for (const command of commands) {
      console.push(" - " + command.name + ": " + command.desc);
    }
  }))

//work
M.registerCommand(new Command('work', 'work for money', ()=> {
	var multi = parseFloat(getCookie("multiplier"));
	var money = parseInt(getCookie("money"))
	console.push("You worked for "+parseInt(50*multi)+ " money.")
	setCookie("money", parseInt(money+(50*multi)), 9999)
}))

//balance
M.registerCommand(new Command("balance", "check your balance", ()=>{
	var money =  getCookie("money")
	console.push("You have " + money+" money")
}))

//username
M.registerCommand(new Command("username", "Set your username" , ()=>{
	thing = prompt("What do you want your username to be?")
	document.cookie = "username = "+thing;
}))

//gamble
M.registerCommand(new Command("gamble", "do some funny gambling" , ()=>{
	var multi = parseFloat(getCookie("multiplier"));
	var money =  parseInt(getCookie("money"))
	var prestige = parseInt(getCookie("prestige"))
	var thing = prompt("How much money to gamble?")
	if (thing == "all"){
			thing = money
	}
	else if (thing == "half"){
		thing  = Math.round(parseInt(money)/2)
	}

	else if (thing == "quarter"){
		thing  = Math.round(parseInt(money)/4)
	}

	
	if (parseInt(thing)>money || parseInt(thing) <=0){
		console.push("Not enough money, or you tried a negative number")
	}
	else if (parseInt(thing) == "NaN"){
		console.push("oy!")
	}
	else{
		money-=thing
		house = Math.floor(Math.random()*12)+1
		you = Math.floor(Math.random()*12)+1
		console.push("You: "+you+", House: "+house)
		if (you>house){
			var winnings=thing*2*multi/(prestige+1)
			if (winnings>1000000){
				winnings = 1000000
			}
			money+=winnings
			
			console.push("You won "+ parseInt(winnings)+"!")
		}
		if (you==house){
			money+=thing
			console.push("You tied. Your money has been refunded")
		}
		if (you<house){
			console.push("You lost.")
		}
		setCookie("money", parseInt(money), 9999)
	}
}))


//guess
M.registerCommand(new Command("guess", "do a guessing game to earn some money", ()=>{
	var multi = parseFloat(getCookie("multiplier"));
	const number = Math.floor(Math.random()*10)+1;
	guess = prompt("Guess a number between 1 and 10");
	if (guess == number){
		console.push("You won "+ parseInt(5000*multi)+" money.")
		money +=parseInt(7500*multi)
	}
	if (guess!=number){
		console.push("You lost.")
		console.push("The number was "+number+".")
	}
}))


//prestige
M.registerCommand(new Command("prestige", "get enough money to prestige for a multi bonus", ()=>{
	var prestige = getCookie("prestige")
	var pcoin = parseInt(10000*( (prestige+1) *1.792674));;
	var money =  parseInt(getCookie("money"))
	var multi = parseFloat(getCookie("multiplier"));
	if (pcoin<=money){
		c =confirm("Are you sure you want to prestige?")
		if (c == true){
			money = 0
			prestige ++
			multi+=2*prestige
			setCookie("multiplier", multi, 9999)
			setCookie("prestige", prestige, 9999)
			setCookie("money", money, 9999)
			console.push("<br><br> You prestiged! You lost all your coins, but in exchange, you acquire a much higher multiplier. (Other rewards later)")
		}
	}
	else{
		console.push("Not enough money! Collect "+(pcoin-money)+" more coins to prestige.")
	}
}))

//level
M.registerCommand(new Command("level", "shows you XP, your level, and more", ()=>{
	var prestige = getCookie("prestige");
	var pcoin = parseInt(10000*( (prestige+1) *1.792674));
	var money =  parseInt(getCookie("money"));
	var xp = parseInt(getCookie("XP"));
	var level = parseInt(getCookie("level"));
	var needed = 100+((level-1)*50)
	
	var multi = Math.round((parseFloat(getCookie("multiplier"))*1000))     /1000
	
	
	console.push("Prestige "+prestige)
	console.push("Coins needed to prestige: "+pcoin)
	console.push("Level "+level)
	console.push("XP:  "+xp+"/"+needed)
	console.push("Multiplier: "+multi)
	console.push("Money: "+ money)
}))

//event listeners
document.addEventListener('keydown', (e) => {
  if (e.key == "Enter") runCommand();
});