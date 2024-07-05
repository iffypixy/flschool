export const isUndefined = (value: unknown) => typeof value === "undefined";

export const shuffle = <T>(array: T[]): void => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];

		array[i] = array[j];
		array[j] = temp;
	}
};
