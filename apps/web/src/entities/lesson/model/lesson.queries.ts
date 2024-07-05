import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetLessonDto} from "../api";

export const lessonQueryKeys = createQueryKeys("lesson", {
	"get-lesson": (req: GetLessonDto["req"]) => [req.courseId, req.lessonId],
	"review-lesson": null,
	"submit-homework-answer": null,
	"edit-homework-answer": null,
});
