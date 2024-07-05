import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {Tag} from "emblor";
import {zodResolver} from "@hookform/resolvers/zod";
import {useParams} from "wouter";

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
import {HomeworkWithTestAnswers} from "@entities/homework";
import {Nullable} from "@shared/lib/types";
import {UploadZone, fileSchema} from "@features/upload";

import {HomeworkForm} from "./homework-form";
import {useCreateLesson} from "../model";

const schema = z.object({
	name: z.string().min(1),
	videoFile: fileSchema.required(),
	topics: z.array(z.object({})).min(1),
	homework: z.object({}).required(),
});

export const CreateLesson: React.FC<React.PropsWithChildren> = ({children}) => {
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
		videoFile: Nullable<UploadedFile>;
		topics: Tag[];
		homework: Nullable<HomeworkWithTestAnswers>;
	}>({
		mode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			name: null,
			videoFile: null,
			topics: [],
			homework: null,
		},
	});

	const [homework, videoFile] = watch([
		"homework",
		"videoFile",
		"topics",
		"name",
	]);

	const {createLesson} = useCreateLesson();

	return (
		<Modal>
			<ModalTrigger asChild>{children}</ModalTrigger>

			<ModalContent className="max-w-[72rem] max-h-[80%] w-full overflow-auto">
				<ModalHeader className="mb-24">
					<ModalTitle className="text-left !text-32 !font-bold">
						Создание урока
					</ModalTitle>

					<Hidden>
						<ModalDescription>
							Вы можете создать урок для выбранного курса введя
							данные ниже.
						</ModalDescription>
					</Hidden>
				</ModalHeader>

				<form
					onSubmit={handleSubmit(() => {
						const form = getValues();

						createLesson({
							courseId,
							name: form.name!,
							topics: form.topics.map((t) => t.text),
							videoFileId: form.videoFile!.id,
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
						fileName={videoFile?.name}
						onUpload={(file) => {
							setValue("videoFile", file, {
								shouldValidate: true,
							});
						}}
					>
						Выберите видео-файл урока
					</UploadZone>

					<div className="flex flex-col space-y-8">
						<Label>Топики урока</Label>

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
							Создать
						</Button>
					</div>
				</form>
			</ModalContent>
		</Modal>
	);
};
