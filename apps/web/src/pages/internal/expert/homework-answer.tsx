import {Controller, useForm} from "react-hook-form";
import {useParams, useLocation} from "wouter";
import toast from "react-hot-toast";

import {
    useHomeworkAnswer,
    ExpertTemplate,
    useSubmitHomeworkAnswerFeedback,
} from "@features/cms/expert";
import {
    Button,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    AvatarWithFallback,
} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";
import {Nullable} from "@shared/lib/types";

export const InternalExpertPendingHomeworkAnswerPage: React.FC = () => {
    const [, navigate] = useLocation();

    const {courseId, answerId} = useParams() as {
        courseId: string;
        answerId: string;
    };
    const {pendingAnswer} = useHomeworkAnswer({courseId, answerId});

    const {submitHomeworkAnswerFeedback} = useSubmitHomeworkAnswerFeedback();

    const {
        control,
        register,
        handleSubmit,
        formState: {isValid},
    } = useForm<{
        rating: Nullable<number>;
        comment: Nullable<string>;
    }>({
        defaultValues: {
            rating: 5,
            comment: null,
        },
    });

    return (
        <ExpertTemplate>
            <div className="flex flex-col space-y-24 text-[#434343]">
                <h3 className="font-bold text-56">Обратная связь</h3>

                <div className="flex flex-col space-y-40 max-w-[76rem] w-full">
                    <div className="flex items-center space-x-24">
                        <AvatarWithFallback
                            text={pendingAnswer?.student.firstName[0]}
                            src={pendingAnswer?.student.avatar}
                        />

                        <div className="flex flex-col">
                            <h6 className="font-semibold text-20">
                                {pendingAnswer?.student.firstName}{" "}
                                {pendingAnswer?.student.lastName}
                            </h6>

                            <span>{pendingAnswer?.student.progress} урок</span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-28">
                        <div className="flex flex-col space-y-12">
                            <h4 className="font-medium text-28">Задание</h4>

                            {pendingAnswer?.homework.type === "TEXT" ? (
                                <p>{pendingAnswer?.homework.text}</p>
                            ) : null}
                        </div>

                        <div className="flex flex-col space-y-28">
                            <h4 className="font-medium text-28">Ответы</h4>

                            <div className="flex flex-col space-y-12">
                                {pendingAnswer?.file && (
                                    <a
                                        className="underline"
                                        href={pendingAnswer.file.url}
                                        target="_blank"
                                    >
                                        {pendingAnswer.file.name}
                                    </a>
                                )}

                                <p>{pendingAnswer?.text}</p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit((form) => {
                            return submitHomeworkAnswerFeedback({
                                courseId,
                                answerId,
                                comment: form.comment!,
                                rating: +form.rating!,
                            }).then(() => {
                                toast.success(
                                    "Обратная связь была успешно отправлена.",
                                );

                                navigate(
                                    ROUTER_PATHS.INTERNAL.EXPERT.COURSE.filled(
                                        courseId,
                                    ),
                                );
                            });
                        })}
                        className="flex flex-col space-y-22"
                    >
                        <div className="flex flex-col space-y-8">
                            <Label>Оценить работу</Label>

                            <Controller
                                name="rating"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <Select
                                        value={String(field.value)}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    <span>
                                                        Выберите оценку работы
                                                    </span>
                                                }
                                            />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {[1, 2, 3, 4, 5].map(
                                                    (value) => (
                                                        <SelectItem
                                                            key={value}
                                                            value={String(
                                                                value,
                                                            )}
                                                        >
                                                            {value}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="flex flex-col space-y-8">
                            <Label>Добавить комментарий</Label>

                            <Textarea
                                {...register("comment")}
                                placeholder="Введите комментарий"
                                className="resize-none p-24 rounded-12 min-h-[22rem] border-2 border-[#eee] bg-transparent outline-none"
                            />
                        </div>

                        <Button disabled={!isValid} className="w-fit">
                            Отправить
                        </Button>
                    </form>
                </div>
            </div>
        </ExpertTemplate>
    );
};
