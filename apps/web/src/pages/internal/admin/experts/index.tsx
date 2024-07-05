import {Link} from "wouter";

import {AdminTemplate, AdminButton, useAllExperts} from "@features/cms/admin";
import {AvatarWithFallback, Center, Fullscreen, Loader} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalAdminExpertsPage: React.FC = () => {
	const {experts, isFetching} = useAllExperts();

	if (isFetching)
		return (
			<Fullscreen>
				<Center>
					<Loader />
				</Center>
			</Fullscreen>
		);

	return (
		<AdminTemplate
			title="Наши эксперты"
			button={
				<Link to={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_EXPERT}>
					<AdminButton>Создать эксперта</AdminButton>
				</Link>
			}
		>
			<div className="flex flex-wrap -m-16">
				{experts?.map((expert) => (
					<Link
						key={expert.id}
						to={ROUTER_PATHS.INTERNAL.ADMIN.EXPERT.filled(
							expert.id,
						)}
						className="w-1/3 p-16"
					>
						<div
							key={expert.id}
							className="flex space-x-16 items-center rounded-12 shadow-even-sm bg-[#fff] p-24"
						>
							<AvatarWithFallback
								src={expert.avatar}
								text={expert.firstName[0]}
							/>

							<span className="font-semibold text-22 text-[#434343]">
								{expert.firstName} {expert.lastName}
							</span>
						</div>
					</Link>
				))}
			</div>
		</AdminTemplate>
	);
};
