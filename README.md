# Cerebro-Command-Router

> A tool for CerebroApp developers

## What's cerebro-command-router?

This is a utility for developing cerebro plugins.

## Install & Use

### Install the package in your project:

```sh
npm install cerebro-command-router

or

yarn add cerebro-command-router
```

#### Import the CerebroRouter utility:

```js
import CerebroRouter from "cerebro-command-router";

//or

const CerebroRouter = require("cerebro-command-router");
```

### Configure the router by creating a instance with:

- command: string - The main command of your app (one word)
- term: string - The complete string query (view Cerebro documentation)
- display: function - The cerebro display function (view Cerebro documentation)

```js
const myRouter = new CerebroRouter({
	command: "your_command_here",
	term,
	display,
});
```

### Create the routes for your subcommands

```js
//CerebroRouter.route(command: string, displayElement: see_cerebro_documentation)

myRouter.route("your_first_subcommand", {
	icon: icon,
	title: `Your title here`,
	getPreview: () => <OneGreatReactComponent />,
});

myRouter.route("your_second_subcommand", {
	icon: icon,
	title: `Other title here too :)`,
	getPreview: () => <OtherGreatReactComponent />,
});
```

### Invalid subcommand routing

You can choose whether to show a bad subcommand message or to show nothing.
By default, nothing will simply appear.
To display a message you can use `CerebroRouter.invalidRoute(displayElement: see_cerebro_documentation)`

```js
myRouter.invalidRoute({
	icon: icon,
	title: `Invalid Command :( `,
});
```

⚠️ This method must be at the end of the plugin (after all the normal subcommand routes)

### Get the text of a subcommand so that you can work with it

Sometimes, to work with a subcommand, you will need to know the rest of the text that the user has written. For example, in the cerebro-todoist plugin, after the command "tds new << rest of text >>", the rest of the text is added to a note.
To do this, you can use the "getSubCommandText" function that you can import from the package itself.

```js
import { getSubCommandText } from "cerebro-command-router";

//or

const { getSubCommandText } = require("cerebro-command-router");

console.log(getSubCommandText("example com1 text an emoji 💫")); //"text an emoji 💫"
```

### Full Example

You can consult a complete example in the "Examples" folder.
Another real example can be found in the [cerebro-todoist plugin repository](https://github.com/dubisdev/cerebro-todoist)

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app
- [Cerebro Plugin Documentation](https://github.com/cerebroapp/cerebro/blob/master/docs/plugins.md)

## License

MIT © [Dubisdev](https://dubis.dev)
