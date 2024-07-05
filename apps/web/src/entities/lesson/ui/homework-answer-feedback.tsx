import {cx} from "class-variance-authority";

import {HomeworkAnswerFeedback as THomeworkAnswerFeedback} from "@entities/homework";
import {
	AvatarWithFallback,
	Icon,
	Modal,
	ModalContent,
	ModalTrigger,
} from "@shared/ui";

interface HomeworkAnswerFeedbackProps extends React.PropsWithChildren {
	feedback: THomeworkAnswerFeedback;
}

export const HomeworkAnswerFeedback: React.FC<HomeworkAnswerFeedbackProps> = ({
	feedback,
	children,
}) => {
	return (
		<Modal>
			<ModalTrigger>{children}</ModalTrigger>

			<ModalContent className="max-w-[48rem] w-full p-28">
				<div className="flex flex-col space-y-20">
					<div className="flex items-center space-x-16">
						<AvatarWithFallback
							src={feedback.expert.avatar}
							text={feedback.expert.firstName[0]}
							alt="Эксперт"
							className="!size-72 text-24"
						/>

						<h6 className="text-28 font-bold">
							{feedback.expert.firstName}{" "}
							{feedback.expert.lastName}
						</h6>
					</div>

					<div className="flex flex-col space-y-12">
						{feedback.comment && (
							<p className="text-18">{feedback.comment}</p>
						)}

						<div className="flex items-center space-x-4">
							{[1, 2, 3, 4, 5].map((rate) => (
								<Icon.StarOutlined
									className={cx(
										"w-24 xs:w-48 h-auto group-hover:text-[#FCC648]",
										{
											"text-[#FCC648] fill-[#FCC648]":
												feedback.review >= rate,
										},
									)}
								/>
							))}
						</div>
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
};
