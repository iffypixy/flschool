import {Expert} from "@entities/expert";
import {UploadedFile} from "@entities/file";
import {Test, TestWithAnswers} from "@entities/test";
import {Nullable} from "@shared/lib/types";

export interface Homework {
	id: string;
	test?: Test;
	text?: string;
	type: HomeworkType;
}

export interface HomeworkWithTestAnswers {
	test?: TestWithAnswers;
	text?: string;
	type: HomeworkType;
}

export enum HomeworkType {
	TEST = "TEST",
	TEXT = "TEXT",
}

export interface HomeworkAnswer {
	id: string;
	file?: Nullable<UploadedFile>;
	text?: string;
	submittedTest?: SubmittedTest;
	status: HomeworkAnswerStatus;
	feedback?: HomeworkAnswerFeedback;
}

export enum HomeworkAnswerStatus {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	FAILED = "FAILED",
}

export interface SubmittedTest {
	id: string;
	questions: {
		id: string;
		text: string;
		isCorrect: boolean;
		answers: {
			id: string;
			text: string;
			isSelected: boolean;
		}[];
	}[];
}

export interface HomeworkAnswerFeedback {
	id: string;
	comment: string;
	review: number;
	expert: Expert;
}
