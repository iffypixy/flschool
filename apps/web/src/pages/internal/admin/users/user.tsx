import {useEffect, useState} from "react";
import {useParams} from "wouter";
import toast from "react-hot-toast";

import {
    AdminTemplate,
    useUser,
    useAllLanguageCourses,
    useGrantCoursesToUser,
    useGrantCoursePackToUser,
} from "@features/cms/admin";
import {Button, Checkbox} from "@shared/ui";
import {CourseType, courseTypeToLabel} from "@entities/course";

export const InternalAdminUserPage: React.FC = () => {
    const {userId} = useParams() as {userId: string};
    const {user} = useUser(userId);

    const {courses} = useAllLanguageCourses();

    const {grantCoursesToUser, isPending: isGrantCourseToUserPending} =
        useGrantCoursesToUser();
    const {grantCoursePacksToUser, isPending: isGrantCoursePackToUserPending} =
        useGrantCoursePackToUser();

    const isSubmitting =
        isGrantCoursePackToUserPending || isGrantCourseToUserPending;

    const [enrolledCourses, setEnrolledCourses] = useState({
        packs: user?.courses.packs || [],
        ids: user?.courses.ids || [],
    });

    useEffect(() => {
        if (user)
            setEnrolledCourses({
                packs: user.courses.packs,
                ids: user.courses.ids,
            });
    }, [user?.courses]);

    return (
        <AdminTemplate>
            <div className="flex flex-col space-y-64 text-[#434343]">
                <div className="flex flex-col space-y-38">
                    <div className="flex flex-col space-y-16">
                        <h5 className="font-semibold text-32">
                            {user?.firstName} {user?.lastName}
                        </h5>

                        <div className="w-fit min-w-[46rem] flex flex-col p-20 rounded-8 shadow-even-sm bg-[#fff]">
                            <div className="flex items-center">
                                <span className="font-medium text-[#A6ACB8] min-w-[7rem]">
                                    Почта
                                </span>

                                <span className="font-medium text-[#434343] text-18">
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();

                            Promise.all([
                                grantCoursePacksToUser({
                                    userId,
                                    packs: enrolledCourses.packs,
                                }),

                                grantCoursesToUser({
                                    userId,
                                    courseIds: enrolledCourses.ids,
                                }),
                            ]).then(() => {
                                toast.success("Редактирование успешно.");
                            });
                        }}
                        className="flex flex-col"
                    >
                        <h6 className="font-medium text-20 mb-16">
                            Курсы пользователя
                        </h6>

                        <div className="w-fit min-w-[34rem] flex flex-col space-y-8 p-20 rounded-8 font-medium shadow-even-sm bg-[#fff]">
                            {Object.values(CourseType)
                                .filter((pack) => pack !== CourseType.LANGUAGE)
                                .map((pack) => (
                                    <div
                                        key={pack}
                                        className="flex items-center space-x-12"
                                    >
                                        <Checkbox
                                            id={pack}
                                            checked={enrolledCourses.packs.includes(
                                                pack,
                                            )}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setEnrolledCourses({
                                                        ...enrolledCourses,
                                                        packs: [
                                                            ...enrolledCourses.packs,
                                                            pack,
                                                        ],
                                                    });
                                                } else {
                                                    setEnrolledCourses({
                                                        ...enrolledCourses,
                                                        packs: enrolledCourses.packs.filter(
                                                            (type) =>
                                                                type !== pack,
                                                        ),
                                                    });
                                                }
                                            }}
                                        />

                                        <label htmlFor={pack}>
                                            {courseTypeToLabel(pack)}
                                        </label>
                                    </div>
                                ))}

                            {courses?.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center space-x-12"
                                >
                                    <Checkbox
                                        id={`course:${course.id}`}
                                        checked={enrolledCourses.ids.includes(
                                            course.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setEnrolledCourses({
                                                    ...enrolledCourses,
                                                    ids: [
                                                        ...enrolledCourses.ids,
                                                        course.id,
                                                    ],
                                                });
                                            } else {
                                                setEnrolledCourses({
                                                    ...enrolledCourses,
                                                    ids: enrolledCourses.ids.filter(
                                                        (id) =>
                                                            id !== course.id,
                                                    ),
                                                });
                                            }
                                        }}
                                    />

                                    <label htmlFor={`course:${course.id}`}>
                                        {course.name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <Button
                            disabled={isSubmitting}
                            className="w-fit rounded-8 min-w-[20rem] mt-32"
                        >
                            Сохранить
                        </Button>
                    </form>
                </div>
            </div>
        </AdminTemplate>
    );
};
