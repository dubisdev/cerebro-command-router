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

# Initial configuration

### **Import the CerebroRouter utility:**

```jsx
import CerebroRouter from "cerebro-command-router";

//or

const CerebroRouter = require("cerebro-command-router");
```

### **Configure the router by creating an instance with:**

- `command: string` - The main command of your app (one word)
- `term: string` - The complete string query (view Cerebro documentation)
- `display: function` - The cerebro display function (view Cerebro documentation)

```js
const myRouter = new CerebroRouter({
	command: "your_command_here",
	term,
	display,
});
```

### **Create the routes for your subcommands**

```js
/*
CerebroRouter.route(command: string,
			displayElement: see_cerebro_documentation,
			options: object)
*/

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

### The "Options" object.

For now, you can configure one interesting parameter: the autocompletion when you use the `tab key`. By default, when the subcommand is written with subcommand text, if `tab key` is pressed nothing will happen (term = term), but if `autocompleteAll: false` the result when `tab key` is pressed will be only command + subcommand.

#### Example:

#### With autocompleteAll deafult (true):

command + subcommand + some text —> command + subcommand + some text

Text written by user

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/47e99c60-245b-415c-af7a-5a3d6aeab5f5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210817T125731Z&X-Amz-Expires=86400&X-Amz-Signature=fb354f66101a3d36af55b03e07a7703078e2b7a19b44b11304b2b6c9ce87cc9a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

`tab key pressed`
Resultant text

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c0df121f-9fbc-4ddf-9779-6780b57f4927/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210817T133416Z&X-Amz-Expires=86400&X-Amz-Signature=3f2624c5496249f49703d8637230a99a1d98461fc58331a8d15713829889fea8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

#### With autocompleteAll false:

command + subcommand + some text —> command + subcommand

Text written by user

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/47e99c60-245b-415c-af7a-5a3d6aeab5f5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210817T125731Z&X-Amz-Expires=86400&X-Amz-Signature=fb354f66101a3d36af55b03e07a7703078e2b7a19b44b11304b2b6c9ce87cc9a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

`tab key pressed`

Resultant text

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/308a9685-0cc1-4607-b801-dffee674ecf3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210817%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210817T133440Z&X-Amz-Expires=86400&X-Amz-Signature=d7cd0e39b07cc165f570134de0dc1dfe64c5fbb81b9c8da5216d28766b06f947&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### **Invalid subcommand routing**

You can choose whether to show a bad subcommand message or to show nothing. By default, nothing will simply appear. To display a message you can use `CerebroRouter.invalidRoute(displayElement: see_cerebro_documentation)`

```jsx
myRouter.invalidRoute({
	icon: icon,
	title: `Invalid Command :( `,
});
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1cb94e2b-358e-45e7-89d8-5a9b557856b6/Untitled.png)

⚠️ This method must be at the end of the plugin (after all the normal subcommand routes)

### **Get the text of a subcommand so that you can work with it**

Sometimes, to work with a subcommand, you will need to know the rest of the text that the user has written. For example, in the cerebro-todoist plugin, after the command "tds new << rest of text >>", the rest of the text is added to a note. To do this, you can use the "getSubCommandText" function that you can import from the package itself.

```jsx
import { getSubCommandText } from "cerebro-command-router";

//or

const { getSubCommandText } = require("cerebro-command-router");

console.log(getSubCommandText("ex com1 text and emoji 💫")); //"text and emoji 💫"
```

### Full Example

You can consult a complete example in the "Examples" folder.
Another real example can be found in the [cerebro-todoist plugin repository](https://github.com/dubisdev/cerebro-todoist)

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app
- [Cerebro Plugin Documentation](https://github.com/cerebroapp/cerebro/blob/master/docs/plugins.md)

## License

MIT © [Dubisdev](https://dubis.dev)
