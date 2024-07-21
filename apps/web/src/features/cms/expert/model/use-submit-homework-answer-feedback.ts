import {useMutation} from "@tanstack/react-query";

import {submitHomeworkAnswerFeedback} from "../api";
import {invalidateCourseQueries} from "./expert.queries";

export const useSubmitHomeworkAnswerFeedback = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationFn: submitHomeworkAnswerFeedback,
        onSuccess: () => {
            invalidateCourseQueries();
        },
    });

    return {
        submitHomeworkAnswerFeedback: mutateAsync,
        ...mutation,
    };
};
