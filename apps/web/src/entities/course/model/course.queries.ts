import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetCourseCertificateDto, GetCourseDto} from "../api";

export const courseQueryKeys = createQueryKeys("course", {
	"get-freelance-teens-courses": null,
	"get-education-courses": null,
	"get-language-courses": null,
	"get-course": (req: GetCourseDto["req"]) => [req],
	"get-popular-courses": null,
	"get-course-names": null,
	"get-course-certificate": (req: GetCourseCertificateDto["req"]) => [req],
});
