import {Dto, apiClient} from "@shared/api";
import {Expert} from "@entities/expert";
import {Lesson} from "@entities/lesson";

import {Course} from "../types";

export type GetCourseDto = Dto<
	string,
	{
		course: Course & {
			author: Expert & {
				students: number;
				courses: number;
				rating: number;
			};
			lessons: {
				id: Lesson["id"];
				name: Lesson["name"];
				topics: Lesson["topics"];
				order: Lesson["order"];
			}[];
			preview: string;
			rating: number;
			reviews: number;
			positiveReviews: number;
			isEnrolled: boolean;
			progress?: number;
			currentLessonId?: string;
		};
	}
>;

export const getCourse = (req: GetCourseDto["req"]) =>
	apiClient.get<GetCourseDto["res"]>(`/api/courses/${req}`);
