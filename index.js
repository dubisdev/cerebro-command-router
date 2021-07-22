export default class CerebroRouter {
	constructor({ command, term, display }) {
		this.command = command;
		this.term = term;
		this.display = display;
		this.shownPages = 0;
	}

	route(subcommand, screen) {
		if (this.isMatch(subcommand, this.term)) {
			this.display({
				...screen,
				term: this.command + " " + subcommand,
			});
			++this.shownPages;
		}
	}

	invalidRoute(screen) {
		if (this.shownPages === 0 && this.term.includes("tds")) {
			this.display(screen);
		}
	}

	isMatch(command, term) {
		let match = this.command.toLowerCase() === getCommand(term).toLowerCase();
		if (match) {
			return (
				!getSubCommand(term) ||
				command.toLowerCase().startsWith(getSubCommand(term))
			);
		}
	}
}

/**
 *Method for getting comand from all the console
 */
function getCommand(longString) {
	return longString.split(" ")[0]; //take second word (the command)
}

/**
 *Method for getting subcomand from all the console
 */
function getSubCommand(longString) {
	return longString.split(" ")[1]; //take second word (the command)
}

export function getSubCommandText(command) {
	let response = command.split(" "); //take first word (the command)
	response.shift();
	response.shift();
	response = response.join(" ");

	//returns undefined so the api can create a _no_content_ task
	if (response === "") return undefined;

	return response;
}
