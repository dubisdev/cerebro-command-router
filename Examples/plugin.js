import icon from "./icons";
import CerebroRouter from "cerebro-command-router";

if (!Notification.permission) Notification.requestPermission();

function fn({ term, display }) {
	const myRouter = new CerebroRouter({ command: "example", term, display });

	myRouter.route("com1", {
		icon: icon,
		title: `Example Plugin command 1`,
		getPreview: () => <h2>This is command 1 :)</h2>,
		onSelect: () => new Notification("You selected subcommand 1"),
	});

	myRouter.route("com2", {
		icon: icon,
		title: `Example Plugin command 2`,
		getPreview: () => <h2>This is command 2 :)</h2>,
	});

	myRouter.invalidRoute({
		icon: icon,
		title: `Invalid Example Command`,
	});
}

// ----------------- Plugin settings --------------------- //
const name = "Example Plugin";
const keyword = "example";
// ----------------- END Plugin settings --------------------- //

export { icon, name, keyword, fn };
