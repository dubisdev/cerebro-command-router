export type CerebroScreen = {
	id?: string | number;
	icon?: any;
	title?: string;
	term?: string;
};

export type CerebroDisplayFunction = {
	(screen: CerebroScreen): void;
};
