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

var money = getCookie(money)
var yes = document.getElementById("help");
const mainp = document.getElementById("mainp")

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

M.registerCommand(new Command('help', 'shows all commands', () => {
    console.push("Available Commands:");
    for (const command of commands) {
      console.push(" - " + command.name + ": " + command.desc);
    }
  }))
M.registerCommand(new Command('work', 'work for money', ()=> {
	console.push("You worked for 10 money.")
	var money = getCookie("money")
	setCookie("money", parseInt(money)+10, 9999)
	
	
}))
M.registerCommand(new Command("balance", "check your balance", ()=>{
	var money =  getCookie("money")
	console.push("You have " + money+" money")
}))
M.registerCommand(new Command("reset", "delete your save file" , ()=>{
	document.cookie = "money=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	console.push("You reset.")
}))
M.registerCommand(new Command("create", "Create a new save" , ()=>{
	document.cookie = "money = 0 ";
	console.push("You created something.")
}))
M.registerCommand(new Command("username", "Set your username" , ()=>{
	thing = prompt("What do you want your username to be?")
	document.cookie = "username = "+thing;
}))
M.registerCommand(new Command("gamble", "do some funny gambling" , ()=>{
	var money =  parseInt(getCookie("money"))
	var thing = parseInt(prompt("How much money to gamble?"))
	if (thing>money || thing <=0){
		console.push("Not enough money, or you tried a negative number")
	}
	else{
		money-=thing
		house = Math.floor(Math.random()*12)+1
		you = Math.floor(Math.random()*12)+1
		console.push("You: "+you+", House: "+house)
		if (you>house){
			money+=thing*2
			console.push("You win!")
		}
		if (you==house){
			money+=thing
			console.push("You tied. Your money has been refunded")
		}
		if (you<house){
			console.push("You lost.")
		}
		setCookie("money", money, 9999)
	}
}))

M.registerCommand(new Command)
document.addEventListener('keydown', (e) => {
  if (e.key == "Enter") runCommand();
	document.getElementById( 'bottom' ).scrollIntoView();
});