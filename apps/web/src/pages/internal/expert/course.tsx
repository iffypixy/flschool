import {Link, useParams} from "wouter";

import {ExpertTemplate, usePendingHomeworkAnswers} from "@features/cms/expert";
import {Button, AvatarWithFallback} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalExpertCoursePage: React.FC = () => {
    const {courseId} = useParams() as {courseId: string};
    const {pendingAnswers} = usePendingHomeworkAnswers(courseId);

    return (
        <ExpertTemplate>
            <div className="flex flex-col space-y-44 text-[#000]">
                <div className="flex flex-col space-y-24">
                    <h3 className="font-bold text-56">Обратная связь</h3>

                    <div className="flex flex-col space-y-24">
                        {pendingAnswers?.length === 0 && (
                            <h4 className="text-20 text-[#434343]">
                                Нет домашних заданий на проверке
                            </h4>
                        )}

                        {pendingAnswers?.map((a) => (
                            <div className="w-full flex items-center justify-between bg-[#fbfbfb] rounded-10 text-[#434343] shadow-even-sm p-18">
                                <div className="flex items-center space-x-16">
                                    <AvatarWithFallback
                                        text={a.student.firstName[0]}
                                        src={a.student.avatar}
                                        className="!size-52"
                                    />
                                    <span className="font-semibold text-20">
                                        {a.student.firstName}{" "}
                                        {a.student.lastName}
                                    </span>
                                </div>

                                <Link
                                    to={ROUTER_PATHS.INTERNAL.EXPERT.HOMEWORK_ANSWER.filled(
                                        courseId,
                                        a.id,
                                    )}
                                >
                                    <Button>Проверить задание</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ExpertTemplate>
    );
};
