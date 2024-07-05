import {useQuery} from "@tanstack/react-query";

import {courseQueryKeys} from "./course.queries";
import {GetCourseCertificateDto, getCourseCertificate} from "../api";

export const useCourseCertificate = (req: GetCourseCertificateDto["req"]) => {
	const {data, ...query} = useQuery({
		queryKey: courseQueryKeys["get-course-certificate"](req).queryKey,
		queryFn: async () => {
			const res = await getCourseCertificate(req);

			return res.data;
		},
	});

	return {
		...data,
		...query,
	};
};
