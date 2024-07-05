import {Prisma} from "@prisma/client";

export const course = (
	course: Prisma.CourseGetPayload<{
		include: {
			previewFile: true;
		};
	}>,
) => ({
	id: course.id,
	name: course.name,
	hook: course.hook,
	description: course.description,
	audience: course.audience,
	preview: course.previewFile && course.previewFile.url,
	language: course.language,
	type: course.type,
	price: course.price,
	duration: course.duration,
});
