//this is still a test LMAO

var yes = document.getElementById("help");
const mainp = document.getElementById("mainp")

const commands = [

];
const console = [

];

function runCommand() {
	var input = document.getElementById("frm1").value;
	document.getElementById("frm1").value = "";
	console.push("totoeevee@Munzgame:~$ " + input);
	for (const command of commands) {
		if (command.name == input) command.run();
	}
	if (!commands.includes(input)) console.push("Unreconized command, use 'help' for available commands.");
	var consoleString = "";
	for (var i = 0; i < console.length; i++) {
		if (i != 0) consoleString += "<br>";
		consoleString += console[i];
	}
	document.getElementById("mainp").innerHTML = consoleString;
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

M
	.registerCommand(new Command('help', 'shows all commands', () => {
		console.push("Available Commands:");
		for (const command of commands) {
			console.push(" - " + command.name + ": " + command.desc);
		}
	}))

document.addEventListener('keydown', (e) => {
	if (e.key == "Enter") runCommand();
});