import {Lesson} from "@prisma/client";

export const lesson = (lesson: Lesson) => ({
	id: lesson.id,
	name: lesson.name,
	topics: lesson.topics,
	order: lesson.order,
});
