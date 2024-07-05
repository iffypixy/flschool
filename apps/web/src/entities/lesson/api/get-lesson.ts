import {Dto, apiClient} from "@shared/api";

import {Homework, HomeworkAnswer} from "@entities/homework";
import {Nullable} from "@shared/lib/types";

import {Lesson} from "../types";

export type GetLessonDto = Dto<
	{
		courseId: string;
		lessonId: string;
	},
	{
		lesson: Lesson & {
			homework: Homework & {
				answer?: Nullable<HomeworkAnswer>;
			};
			isReviewed: boolean;
			course: {
				id: string;
				name: string;
				lessons: {
					id: Lesson["id"];
					name: Lesson["name"];
					topics: Lesson["topics"];
					order: Lesson["order"];
				}[];
				progress: number;
			};
		};
	}
>;

export const getLesson = (req: GetLessonDto["req"]) =>
	apiClient.get<GetLessonDto["res"]>(
		`/api/courses/${req.courseId}/lessons/${req.lessonId}`,
	);
