import React from "react";

import {Header} from "@widgets/header";
import {Footer} from "@widgets/footer";
import {Container, Icon} from "@shared/ui";

interface ContentTemplateProps extends React.ComponentProps<"div"> {
	showGoBack?: boolean;
}

export const ContentTemplate: React.FC<ContentTemplateProps> = ({
	showGoBack = true,
	...props
}) => {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />

			<main className="flex flex-col flex-1 py-32">
				{showGoBack && (
					<div className="mb-32">
						<Container>
							<GoBack />
						</Container>
					</div>
				)}

				<div {...props} />
			</main>

			<Footer />
		</div>
	);
};

const GoBack: React.FC = () => {
	return (
		<button
			onClick={() => {
				window.history.back();
			}}
			className="flex items-center"
		>
			<Icon.Chevron.Left className="fill-[#909090] w-32 h-auto" />

			<span className="text-[#909090] xs:inline-flex hidden text-22 font-medium ml-8">
				Назад
			</span>
		</button>
	);
};
