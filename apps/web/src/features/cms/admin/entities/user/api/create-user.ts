import {Viewer} from "@entities/viewer";
import {apiClient, Dto} from "@shared/api";

export type CreateUserDto = Dto<
    {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        promocode: string;
    },
    {
        user: Viewer;
    }
>;

export const createUser = (req: CreateUserDto["req"]) =>
    apiClient.post<CreateUserDto["res"]>("/api/internal/admin/users", req);
