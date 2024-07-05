import {useQuery} from "@tanstack/react-query";

import {profileQueryKeys} from "./profile.queries";
import {getMyCourses} from "../api";

export const useMyCourses = () => {
	const {data, ...query} = useQuery({
		queryKey: profileQueryKeys["get-my-courses"].queryKey,
		queryFn: getMyCourses,
		select: (res) => res.data,
	});

	return {
		...data,
		...query,
	};
};
