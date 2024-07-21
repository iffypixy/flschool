import {useMutation} from "@tanstack/react-query";

import {createUser} from "../api";
import {invalidateUserQueries} from "./user.queries";

export const useCreateUser = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            invalidateUserQueries();
        },
    });

    return {
        createUser: mutateAsync,
        ...mutation,
    };
};
