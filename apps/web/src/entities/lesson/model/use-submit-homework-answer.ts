import {useMutation} from "@tanstack/react-query";

import {queryClient} from "@app/query-client";

import {submitHomeworkAnswer, GetLessonDto} from "../api";
import {lessonQueryKeys} from "./lesson.queries";

export const useSubmitHomeworkAnswer = () => {
	const {mutateAsync, ...mutation} = useMutation({
		mutationKey: lessonQueryKeys["submit-homework-answer"].queryKey,
		mutationFn: submitHomeworkAnswer,
		onSuccess: (res, {lessonId, courseId}) => {
			queryClient.setQueryData(
				lessonQueryKeys["get-lesson"]({courseId, lessonId}).queryKey,
				({lesson}: GetLessonDto["res"]): GetLessonDto["res"] => ({
					lesson: {
						...lesson,
						course: {
							...lesson.course,
							progress:
								res.data.answer.status === "APPROVED"
									? Math.max(
											lesson.order + 1,
											lesson.course.progress,
										)
									: lesson.course.progress,
						},
						homework: {
							...lesson.homework,
							answer: res.data.answer,
						},
					},
				}),
			);
		},
	});

	return {
		submitHomeworkAnswer: mutateAsync,
		...mutation,
	};
};
