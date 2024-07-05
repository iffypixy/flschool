import {Course} from "@entities/course";
import {Expert} from "@entities/expert";
import {UploadedFile} from "@entities/file";
import {HomeworkType} from "@entities/homework";
import {Lesson} from "@entities/lesson";
import {Dto, apiClient} from "@shared/api";

export type GetCourseDto = Dto<
	string,
	{
		course: Course & {
			preview: UploadedFile;
			author: Expert;
			lessons: Array<
				Lesson & {
					video: UploadedFile;
					homework: {
						id: string;
						type: HomeworkType;
						text: string;
						test: {
							id: string;
							questions: {
								id: string;
								text: string;
								answers: {
									id: string;
									text: string;
									isCorrect: boolean;
								}[];
							}[];
						};
					};
				}
			>;
		};
	}
>;

export const getCourse = (req: GetCourseDto["req"]) =>
	apiClient.get<GetCourseDto["res"]>(`/api/internal/admin/courses/${req}`);
