import {Link} from "wouter";

import {Container, Logo, AvatarWithFallback} from "@shared/ui";
import {useViewer} from "@entities/viewer";
import {ROUTER_PATHS} from "@app/router/paths";

export const ExpertTemplate: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const {viewer} = useViewer();

	return (
		<div className="flex flex-col">
			<header className="bg-[#fbfbfb] shadow-even-sm py-24">
				<Container>
					<div className="flex items-center justify-between">
						<Logo className="size-56" />

						<Link to={ROUTER_PATHS.PROFILE}>
							<div className="flex items-center space-x-12">
								<AvatarWithFallback
									text={viewer?.firstName[0]}
									src={viewer?.avatar}
									alt="Аватар"
								/>

								<span className="text-18 font-bold text-[#434343]">
									{viewer?.firstName}
								</span>
							</div>
						</Link>
					</div>
				</Container>
			</header>

			<main className="py-68">
				<Container>{children}</Container>
			</main>
		</div>
	);
};
