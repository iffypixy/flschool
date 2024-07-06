import {createQueryKeys} from "@lukemorales/query-key-factory";

import {queryClient} from "@app/query-client";

import {GetLessonDto} from "../api";

export const lessonQueryKeys = createQueryKeys("cms/admin/lesson", {
	"get-lesson-metrics": null,
	"get-lesson": (req: GetLessonDto["req"]) => [req.courseId, req.lessonId],
});

export const invalidateLessonQueries = () => {
	queryClient.invalidateQueries({
		queryKey: lessonQueryKeys._def,
	});
};
