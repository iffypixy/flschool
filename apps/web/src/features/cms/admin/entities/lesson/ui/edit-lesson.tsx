import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {Tag} from "emblor";
import {zodResolver} from "@hookform/resolvers/zod";
import {useParams} from "wouter";
import toast from "react-hot-toast";

import {
    Button,
    Hidden,
    Input,
    Label,
    Modal,
    ModalContent,
    ModalDescription,
    ModalHeader,
    ModalTitle,
    ModalTrigger,
    TagInput,
} from "@shared/ui";
import {UploadedFile} from "@entities/file";
import {HomeworkType, HomeworkWithTestAnswers} from "@entities/homework";
import {Lesson} from "@entities/lesson";
import {Nullable} from "@shared/lib/types";
import {UploadZone} from "@features/upload";

import {HomeworkForm} from "./homework-form";
import {useEditLesson} from "../model";

const schema = z.object({
    name: z.string().min(1),
    video: z.object({}).required(),
    topics: z.array(z.object({})).min(1),
    homework: z
        .object({
            test: z.array(
                z.object({
                    text: z.string().min(1),
                    answers: z.array(z.string().min(1)).min(1),
                    correctAnswerIndex: z.number(),
                }),
            ),
            text: z.string(),
            type: z.nativeEnum(HomeworkType),
        })
        .required()
        .refine(
            (data) => {
                if (data.type === HomeworkType.TEST)
                    data.test && data.test.length > 0;

                return true;
            },
            {
                message: "Test homework must have at least one test item",
                path: ["test"],
            },
        )
        .refine(
            (data) => {
                if (data.type === HomeworkType.TEXT)
                    return data.text && data.text.length > 0;

                return true;
            },
            {
                message: "Reading homework must have text",
                path: ["text"],
            },
        ),
});

interface EditLessonProps extends React.PropsWithChildren {
    lesson?: Omit<Lesson, "video"> & {
        video: UploadedFile;
        homework: HomeworkWithTestAnswers;
    };
}

export const EditLesson: React.FC<EditLessonProps> = ({lesson, children}) => {
    const {id: courseId} = useParams() as {id: string};

    const {
        control,
        register,
        handleSubmit,
        formState,
        setValue,
        watch,
        getValues,
    } = useForm<{
        name: Nullable<string>;
        video: Nullable<UploadedFile>;
        topics: Tag[];
        homework: Nullable<HomeworkWithTestAnswers>;
    }>({
        resolver: zodResolver(schema),
        values: {
            name: lesson?.name || null,
            video: lesson?.video || null,
            homework: lesson?.homework || null,
            topics: (lesson?.topics || []).map((tag, idx) => ({
                id: String(idx),
                text: tag,
            })),
        },
    });

    const [homework, video] = watch(["homework", "video"]);

    const {editLesson} = useEditLesson();

    return (
        <Modal>
            <ModalTrigger asChild>{children}</ModalTrigger>

            <ModalContent className="max-w-[72rem] max-h-[80%] w-full overflow-auto">
                <ModalHeader className="mb-24">
                    <ModalTitle className="text-left !text-32 !font-bold">
                        Редактирование урока
                    </ModalTitle>

                    <Hidden>
                        <ModalDescription>
                            Вы можете редактировать урок выбранного курса введя
                            данные ниже.
                        </ModalDescription>
                    </Hidden>
                </ModalHeader>

                <form
                    onSubmit={handleSubmit(() => {
                        const form = getValues();

                        editLesson({
                            courseId,
                            lessonId: lesson!.id,
                            name: form.name!,
                            topics: form.topics.map((t) => t.text),
                            videoFileId: form.video!.id,
                            homework: {
                                text: form.homework?.text,
                                test: form.homework?.test?.map((q) => ({
                                    text: q.text,
                                    answers: q.answers.filter(
                                        (_, idx) =>
                                            idx !== q.correctAnswerIndex,
                                    ),
                                    correctAnswer:
                                        q.answers[q.correctAnswerIndex],
                                })),
                            },
                        }).then(() => {
                            toast.success("Редактирование успешно.");
                        });
                    })}
                    className="flex flex-col space-y-24"
                >
                    <div className="flex flex-col space-y-8">
                        <Label>Название урока</Label>

                        <Input
                            type="text"
                            placeholder="Введите название урока"
                            {...register("name")}
                        />
                    </div>

                    <UploadZone
                        accept="video/mp4,video/x-m4v,video/*"
                        fileName={video?.name}
                        onUpload={(file) => {
                            setValue("video", file, {
                                shouldValidate: true,
                            });
                        }}
                    >
                        Выберите видео-файл урока
                    </UploadZone>

                    <div className="flex flex-col space-y-8">
                        <Label>
                            Топики урока{" "}
                            <span className="text-[0.75em] text-[#434343]">
                                (добавлять через Enter)
                            </span>
                        </Label>

                        <Controller
                            name="topics"
                            control={control}
                            render={({field}) => (
                                <TagInput
                                    placeholder="Введите топики урока"
                                    tags={field.value}
                                    setTags={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <HomeworkForm
                        homework={homework || undefined}
                        onChange={(homework) => {
                            setValue("homework", homework, {
                                shouldValidate: true,
                            });
                        }}
                    />

                    <div className="flex justify-end items-center">
                        <Button
                            disabled={
                                !(
                                    formState.isValid &&
                                    (homework?.test?.length !== 0 ||
                                        homework?.text)
                                )
                            }
                        >
                            Редактировать
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
};
