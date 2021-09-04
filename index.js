export default class CerebroRouter {
	constructor({ command, term, display, hide }) {
		this.command = command;
		this.term = term;
		this.display = display;
		this.shownPages = 0;
		this.hide = hide;
	}

	route(
		subcommand,
		screen,
		{
			autocompleteAll = true,
			showOnlyInFullMatch = false,
			isAsyncArrayGenerator = false,
			loadingMessage = "Getting Async Screens...",
			displayArrayGenerator = () => [],
		} = {}
	) {
		if (this.isMatch(subcommand, this.term)) {
			const autocompleteText = autocompleteAll
				? this.command +
				  " " +
				  subcommand +
				  " " +
				  (getSubCommandText(this.term) || "")
				: this.command + " " + subcommand + " ";

			if (showOnlyInFullMatch !== true) {
				this.display({
					...screen,
					term: autocompleteText,
				});
				++this.shownPages;
				return;
			}

			if (
				showOnlyInFullMatch === true &&
				!this.isFullMatch(subcommand, this.term)
			) {
				const { icon, title } = screen;

				this.display({
					icon,
					title,
					term: autocompleteText,
				});
				++this.shownPages;
				return;
			}

			if (
				showOnlyInFullMatch === true &&
				this.isFullMatch(subcommand, this.term)
			) {
				const id = Math.random() * 10;
				const { icon } = screen;
				if (isAsyncArrayGenerator === true) {
					this.display({
						id: `${id}`,
						icon,
						title: loadingMessage,
					});
					++this.shownPages;

					(async () => {
						const displayArray = await displayArrayGenerator();
						this.hide(`${id}`);
						displayArray.map((display) => {
							this.display({
								icon,
								...display,
							});
							++this.shownPages;
						});

						return;
					})();
				} else {
					const displayArray = displayArrayGenerator();
					displayArray.map((display) => {
						this.display({ icon, ...display });
						++this.shownPages;
					});

					return;
				}
			}
		}
	}

	invalidRoute(screen) {
		if (this.shownPages === 0 && this.term.includes(this.command)) {
			this.display(screen);
		}
	}

	isMatch(subcommand, term) {
		let match = this.command.toLowerCase() === getCommand(term).toLowerCase();
		if (match) {
			return (
				!getSubCommand(term) ||
				subcommand.toLowerCase().startsWith(getSubCommand(term))
			);
		}
	}

	isFullMatch(subcommand, term) {
		if (!this.isMatch(subcommand, term)) return false;
		if (!getSubCommand(term)) return false;

		return getSubCommand(term).toLowerCase() === subcommand;
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
