import {createQueryKeys} from "@lukemorales/query-key-factory";

import {GetHomeworkAnswerDto, GetPendingHomeworkAnswersDto} from "../api";
import {queryClient} from "@app/query-client";

export const courseQueryKeys = createQueryKeys("cms/expert", {
    "get-my-courses": null,
    "get-pending-homework-answers": (
        req: GetPendingHomeworkAnswersDto["req"],
    ) => [req],
    "get-homework-answer": (req: GetHomeworkAnswerDto["req"]) => [
        req.courseId,
        req.answerId,
    ],
});

export const invalidateCourseQueries = () => {
    queryClient.invalidateQueries({
        queryKey: courseQueryKeys._def,
    });
};
