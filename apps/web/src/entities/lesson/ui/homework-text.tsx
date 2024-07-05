import {useForm} from "react-hook-form";
import {useParams} from "wouter";

import {UploadedFile} from "@entities/file";
import {Nullable} from "@shared/lib/types";
import {Button, Icon, Spinner, Textarea} from "@shared/ui";
import {Upload} from "@shared/lib/upload";
import {useUploadFile} from "@features/upload";
import {HomeworkAnswerStatus} from "@entities/homework";

import {useSubmitHomeworkAnswer} from "../model";
import {cx} from "class-variance-authority";

interface HomeworkTextAnswer {
	text?: Nullable<string>;
	file?: Nullable<UploadedFile>;
}

interface HomeworkTextProps {
	question: string;
	answer?: Nullable<HomeworkTextAnswer>;
	status?: HomeworkAnswerStatus;
}

export const HomeworkText: React.FC<HomeworkTextProps> = ({
	question,
	answer,
	status,
}) => {
	const {courseId, lessonId} = useParams() as {
		courseId: string;
		lessonId: string;
	};

	const {register, handleSubmit, formState, watch, setValue} = useForm<{
		file: Nullable<HomeworkTextAnswer["file"]>;
		text: Nullable<HomeworkTextAnswer["text"]>;
	}>({
		values: {
			file: answer?.file || null,
			text: answer?.text || null,
		},
	});

	const [file, text] = watch(["file", "text"]);

	const {uploadFile} = useUploadFile();
	const {submitHomeworkAnswer} = useSubmitHomeworkAnswer();

	const answerProvided = !!answer;
	const disabled = status === HomeworkAnswerStatus.APPROVED;

	return (
		<div className="flex flex-col space-y-28">
			<p className="text-lg">{question}</p>

			<form
				onSubmit={handleSubmit((form) => {
					return submitHomeworkAnswer({
						courseId,
						lessonId,
						fileId: form.file?.id || undefined,
						text: form.text || undefined,
					});
				})}
				className="flex flex-col space-y-20"
			>
				<div className="flex flex-col space-y-12">
					<div className="flex justify-between items-center">
						<h6 className="text-[#434343] font-medium text-20">
							Ответ
						</h6>

						{!disabled && (
							<Upload
								onUpload={(file) => {
									uploadFile({file}).then(({url, fileId}) => {
										setValue(
											"file",
											{
												id: fileId,
												name: file.name,
												url,
											},
											{
												shouldValidate: true,
											},
										);
									});
								}}
							>
								<Icon.Clip className="text-[#03C1CD] w-18 h-auto" />
							</Upload>
						)}
					</div>

					{file && (
						<div
							className={cx(
								"border rounded-lg py-12 px-18 flex items-center justify-between",
								{
									"opacity-50": disabled,
								},
							)}
						>
							<span>{file.name}</span>

							{!disabled && (
								<button
									onClick={() => {
										setValue("file", null, {
											shouldValidate: true,
										});
									}}
								>
									<Icon.Cross className="w-10 h-auto fill-[#434343]" />
								</button>
							)}
						</div>
					)}

					<Textarea
						disabled={disabled}
						placeholder="Введите ответ"
						{...register("text")}
					/>
				</div>

				{!disabled &&
					(formState.isSubmitting ? (
						<Spinner className="mx-auto" />
					) : (
						<Button disabled={!(text || file)}>
							{answerProvided ? "Редактировать" : "Отправить"}
						</Button>
					))}
			</form>
		</div>
	);
};
