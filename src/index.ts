import {
	ConstructorParams,
	CerebroScreen,
	routeConfig,
	CerebroDisplayFunction,
	CerebroHideFunction,
} from "./definitions";

export default class CerebroRouter {
	private shownPages;
	private command: string;
	private term: string;
	private display: CerebroDisplayFunction;
	private hide: CerebroHideFunction;

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
			displayArrayGenerator,
		}: routeConfig = {}
	) {
		const autocompleteText = autocompleteAll
			? this.command +
			  " " +
			  subcommand +
			  " " +
			  (getSubCommandText(this.term) || "")
			: this.command + " " + subcommand + " ";

		// si solo coincide el comando principal: mostrar las opciones (a no ser que sea necesario full match)
		// el título de la preview es el de la screen que se le proporciona al inicio

		if (
			this.isMatch(subcommand, this.term) &&
			!this.isFullMatch(subcommand, this.term)
		) {
			if (!showOnlyInFullMatch) {
				this.display({ ...screen, term: autocompleteText });
				++this.shownPages;
			}
			return;
		}

		if (
			this.isMatch(subcommand, this.term) &&
			this.isFullMatch(subcommand, this.term)
		) {
			// if no array generator, just return initial screen
			if (!displayArrayGenerator) {
				this.display({ ...screen, term: autocompleteText });
				++this.shownPages;
				return;
			}

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
				const displayArray = await displayArrayGenerator();
				displayArray.forEach((display) => {
					this.display({ icon, ...display });
					++this.shownPages;
				});

				return;
			}
		}
	}

	invalidRoute(screen: CerebroScreen) {
		if (this.shownPages === 0 && this.term.includes(this.command)) {
			this.display(screen);
		}
	}

	private isMatch(subcommand: string, term: string) {
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

	private isFullMatch(subcommand: string, term: string) {
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
	let words = command.split(" "); //take first word (the command)
	// delete command
	words.shift();
	words.shift();
	let response = words.join(" ");

	//returns undefined so the api can create a _no_content_ task
	if (response === "") return undefined;

	return response;
}
