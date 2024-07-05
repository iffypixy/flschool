import {Controller, useForm} from "react-hook-form";
import {useParams} from "wouter";

import {Nullable} from "@shared/lib/types";
import {
	Button,
	Icon,
	Label,
	RadioGroup,
	RadioGroupItem,
	Spinner,
} from "@shared/ui";
import {HomeworkAnswerStatus, SubmittedTest} from "@entities/homework";
import {Test} from "@entities/test";

import {useSubmitHomeworkAnswer} from "../model";

interface HomeworkTestProps {
	question: Test;
	answer?: Nullable<SubmittedTest>;
	status?: HomeworkAnswerStatus;
}

export const HomeworkTest: React.FC<HomeworkTestProps> = ({
	question,
	answer,
	status,
}) => {
	const {courseId, lessonId} = useParams() as {
		courseId: string;
		lessonId: string;
	};

	const {control, handleSubmit, formState} = useForm<Record<string, string>>({
		values: answer?.questions
			.map((q) => ({
				qid: q.id,
				aid: q.answers.find((a) => a.isSelected)?.id,
			}))
			.reduce(
				(prev, map) => ({
					...prev,
					[map.qid]: map.aid,
				}),
				{},
			),
	});

	const {submitHomeworkAnswer} = useSubmitHomeworkAnswer();

	const answerProvided = !!answer;
	const disabled = status === HomeworkAnswerStatus.APPROVED;

	return (
		<div className="flex flex-col">
			<form
				onSubmit={handleSubmit((form) => {
					return submitHomeworkAnswer({
						courseId,
						lessonId,
						test: form,
					});
				})}
				className="flex flex-col space-y-20"
			>
				<div className="flex flex-col space-y-12">
					{question.questions.map((q) => {
						const providedAnswer = answer?.questions.find(
							(question) => question.id === q.id,
						);

						const isCorrect = providedAnswer?.isCorrect;

						return (
							<div
								key={q.id}
								className="flex flex-col space-y-12"
							>
								<div className="flex items-center space-x-12">
									{providedAnswer &&
										(isCorrect ? (
											<Icon.Check className="w-14 h-auto fill-green-600" />
										) : (
											<Icon.Cross className="w-12 h-auto fill-red-600" />
										))}

									<span className="text-22 font-medium">
										{q.text}
									</span>
								</div>

								<Controller
									name={q.id}
									control={control}
									render={({field}) => (
										<RadioGroup
											disabled={disabled}
											onValueChange={field.onChange}
											value={field.value}
										>
											{q.answers.map((a) => (
												<div
													key={a.id}
													className="flex items-center space-x-8"
												>
													<RadioGroupItem
														value={a.id}
														id={a.id}
													/>

													<Label htmlFor={a.id}>
														{a.text}
													</Label>
												</div>
											))}
										</RadioGroup>
									)}
								/>
							</div>
						);
					})}
				</div>

				{!disabled &&
					(formState.isSubmitting ? (
						<Spinner className="mx-auto" />
					) : (
						<Button>
							{answerProvided ? "Редактировать" : "Отправить"}
						</Button>
					))}
			</form>
		</div>
	);
};
