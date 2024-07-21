import {Course} from "@entities/course";
import {Dto, apiClient} from "@shared/api";

export type GetMyCoursesDto = Dto<
    void,
    {
        courses: {
            inProgress: Array<
                Course & {
                    progress: number;
                    lessons: number;
                }
            >;
            completed: Array<
                Course & {
                    progress: number;
                    lessons: number;
                }
            >;
            available: Array<
                Course & {
                    progress: number;
                    lessons: number;
                }
            >;
        };
    }
>;

export const getMyCourses = () =>
    apiClient.get<GetMyCoursesDto["res"]>("/api/profile/me/courses");
