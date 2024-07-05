import {Link} from "wouter";

import {AdminTemplate, AdminButton, useAllAlumni} from "@features/cms/admin";
import {AvatarWithFallback} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalAdminAlumniPage: React.FC = () => {
	const {alumni} = useAllAlumni();

	return (
		<AdminTemplate
			title="Наши выпускники"
			button={
				<Link to={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_ALUMNUS}>
					<AdminButton>Создать выпусника</AdminButton>
				</Link>
			}
		>
			<div className="flex flex-wrap -m-28 sm:flex-col">
				{alumni?.map((alumnus, idx) => (
					<Link
						key={idx}
						to={ROUTER_PATHS.INTERNAL.ADMIN.ALUMNUS.filled(
							alumnus.id,
						)}
						className="max-w-1/3 p-28 md:w-1/2 sm:w-full"
					>
						<div className="w-full flex flex-col space-y-10">
							<AvatarWithFallback
								src={alumnus.avatar}
								text={alumnus.firstName[0]}
								alt="Выпускник"
								className="!size-64 rounded-8"
							/>

							<div className="flex flex-col space-y-8">
								<h5 className="text-22 text-[#434343] font-semibold sm:text-28">
									{alumnus.firstName} {alumnus.lastName}
								</h5>

								<div className="flex flex-col space-y-2 sm:text-20">
									<div className="flex space-x-4">
										<span className="text-[#A6ACB8]">
											Компания:{" "}
										</span>

										<span className="text-[#434343]">
											{alumnus.workplace}
										</span>
									</div>

									<div className="flex space-x-4">
										<span className="text-[#A6ACB8]">
											Курс:{" "}
										</span>

										<span className="text-primary">
											{alumnus.course.name}
										</span>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</AdminTemplate>
	);
};
