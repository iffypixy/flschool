export interface Test {
	id: string;
	questions: {
		id: string;
		text: string;
		answers: {
			id: string;
			text: string;
		}[];
	}[];
}

export type TestWithAnswers = {
	text: string;
	answers: string[];
	correctAnswerIndex: number;
}[];
