import {
	CerebroDisplayFunction,
	CerebroScreen,
} from "definitions/cerebro_types";

type ConstructorParams = {
	command: string;
	term: string;
	display: CerebroDisplayFunction;
	hide: Function;
};

export default class CerebroRouter {
	private shownPages: number;
	command: string;
	term: string;
	display: CerebroDisplayFunction;
	hide: Function;

	constructor({ command, term, display, hide }: ConstructorParams) {
		this.command = command;
		this.term = term;
		this.display = display;
		this.shownPages = 0;
		this.hide = hide;
	}

	async route(
		subcommand: string,
		screen: CerebroScreen,
		{
			autocompleteAll = true,
			showOnlyInFullMatch = false,
			isAsyncArrayGenerator = false,
			loadingMessage = "Getting Async Screens...",
			displayArrayGenerator = (): CerebroScreen[] => [{}],
		} = {}
	) {
		if (this.isMatch(subcommand, this.term)) {
			// generate autocompleted text (depends on config option autocompleteAll)
			const autocompleteText = autocompleteAll
				? this.command +
				  " " +
				  subcommand +
				  " " +
				  (getSubCommandText(this.term) || "")
				: this.command + " " + subcommand + " ";

			// if not show only in full match then show just now, no more checks needed ;)
			if (!showOnlyInFullMatch) {
				this.display({ ...screen, term: autocompleteText });
				++this.shownPages;
				return;
			}

			// if is not full match and full match is needed
			if (!this.isFullMatch(subcommand, this.term)) {
				// const { icon, title } = screen;

				// this.display({ icon, title, term: autocompleteText });
				// ++this.shownPages;
				return;
			}

			// if is full match and full match is needed
			if (this.isFullMatch(subcommand, this.term)) {
				const { icon } = screen;
				if (isAsyncArrayGenerator) {
					// show a loading display while displays are being generated
					const id = Math.random() * 10;
					this.display({ id: `${id}`, icon, title: loadingMessage });
					++this.shownPages;

					const displayArray = await displayArrayGenerator();
					this.hide(`${id}`);
					--this.shownPages;

					displayArray.forEach((display) => {
						this.display({ icon, ...display });
						++this.shownPages;
					});
				} else {
					const displayArray = displayArrayGenerator();
					displayArray.forEach((display) => {
						this.display({ icon, ...display });
						++this.shownPages;
					});

					return;
				}
			}
		}
	}

	invalidRoute(screen: CerebroScreen) {
		if (this.shownPages === 0 && this.term.includes(this.command)) {
			this.display(screen);
		}
	}

	isMatch(subcommand: string, term: string) {
		let match = this.command.toLowerCase() === getCommand(term).toLowerCase();
		if (match) {
			// if not subcommand introduced, all subcommands are valid
			const noSubcommandIntroduced = !getSubCommand(term);

			// match if not subcommand introduced or if subcommand starts by introduced subcommand
			const isValidMatch =
				noSubcommandIntroduced ||
				subcommand.toLowerCase().startsWith(getSubCommand(term));

			return isValidMatch;
		}
	}

	isFullMatch(subcommand: string, term: string) {
		if (!this.isMatch(subcommand, term)) return false;
		if (!getSubCommand(term)) return false;
		return getSubCommand(term).toLowerCase() === subcommand;
	}
}

/**
 *Method for getting comand from all the console
 */
const getCommand = (longString: string) => longString.split(" ")[0]; //take second word (the command)

/**
 *Method for getting subcomand from all the console
 */
const getSubCommand = (longString: string) => longString.split(" ")[1]; //take second word (the command)

export function getSubCommandText(command: string) {
	let response: any = command.split(" "); //take first word (the command)
	response.shift();
	response.shift();
	response = response.join(" ");

	//returns undefined so the api can create a _no_content_ task
	if (response === "") return undefined;

	return response;
}
