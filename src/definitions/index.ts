export type ConstructorParams = {
	command: string;
	term: string;
	display: CerebroDisplayFunction;
	hide: CerebroHideFunction;
};

export type routeConfig = {
	isAsyncArrayGenerator?: boolean;
	autocompleteAll?: boolean;
	showOnlyInFullMatch?: boolean;
} & (routeConfigSync | routeConfigAsync);

type routeConfigSync = {
	loadingMessage?: undefined;
	isAsyncArrayGenerator?: false;
	displayArrayGenerator: () => CerebroScreen[];
};

type routeConfigAsync = {
	isAsyncArrayGenerator: true;
	loadingMessage?: string;
	displayArrayGenerator: () => Promise<CerebroScreen[]>;
};

export declare function getSubCommandText(command: string): any;
export {};

import { ReactElement } from "react";

/**
 * Result objects
 */
export declare type CerebroScreen = {
	/**
	 * Title of your result
	 */
	title?: string;

	/**
	 * Subtitle of your result
	 */
	subtitle?: string;

	/**
	 * Icon, that is shown near your result. It can be absolute URL to external image, absolute path to local image or base64-encoded [data-uri](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
	 *
	 * For local icons you can use path to some `.app` file, i.e. `/Applications/Calculator.app` will render default icon for Calculator application
	 */
	icon?: string;

	/**
	 * Use this field when you need to update your result dynamically. Check id [example](https://github.com/cerebroapp/cerebro/blob/master/docs/plugins/examples.md#using-id)
	 */
	id?: string;

	/**
	 * Autocomplete for your result. So, user can update search term using `tab` button.
	 */
	term?: string;

	/**
	 * Text, that will be copied to clipboard using `cmd+c`, when your result is focused.
	 */
	clipboard?: string;

	/**
	 * Function that returns preview for your result. Preview can be an html string or React component
	 */
	getPreview?: () => HTMLElement | ReactElement;

	/**
	 * Action, that should be executed when user selects your result.
	 */
	onSelect?: (event: Event) => any;

	/**
	 * Handle keyboard events when your result is focused, so you can do custom actions
	 */
	onKeyDown?: (event: Event) => any;
};

/**
 * Display your result
 */
export interface CerebroDisplayFunction {
	(result: CerebroScreen | CerebroScreen[]): void;
}

/**
 * Update your previously displayed result.
 * This action **updates only passed fields**, so if you displayed result
 * `{id: 1, title: 'Result'}` and call `update(1, {subtitle: 'Subtitle'})`,
 * you will have merged result:
 * `{id: 1, title: 'Result', subtitle: 'Subtitle'}`
 */
export type CerebroUpdateFunction = {
	(id: string, result: CerebroScreen): void;
};

/**
 * Hide result from results list by id. You can use it to remove temporar results, like "loading..." placeholder.
 */
export type CerebroHideFunction = {
	(id: string): void;
};

/**
 * Object with main actions, provided for cerebro plugins
 */
export type CerebroActions = {
	/**
	 * Open external URL in browser or open local file
	 */
	open: (path: string) => void;
	/**
	 * Reveal file in finder
	 */
	reveal: (path: string) => void;
	/**
	 * Copy text to clipboard
	 */
	copyToClipboard: (text: string) => void;
	/**
	 * Replace text in main Cerebro input
	 */
	replaceTerm: (text: string) => void;
	/**
	 * Hide main Cerebro window
	 */
	hideWindow: () => void;
};

/**
 * Contains user provided values of all specified settings keys
 */
//export module CerebroSettings {}
