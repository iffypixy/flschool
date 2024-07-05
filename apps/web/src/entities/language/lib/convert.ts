import {Language} from "../types";

export const languageToLabel = (key: Language) => {
	const values: Record<Language, string> = {
		KZ: "Қазақ",
		RU: "Русский",
		EN: "English",
	};

	return values[key];
};
