import {Link} from "wouter";

import {
	employmentTypeToLabel,
	requiredExperienceToLabel,
	modalityTypeToLabel,
} from "@entities/vacancy";
import {AdminTemplate, AdminButton, useAllVacancies} from "@features/cms/admin";
import {Icon} from "@shared/ui";
import {ROUTER_PATHS} from "@app/router/paths";

export const InternalAdminVacanciesPage: React.FC = () => {
	const {vacancies} = useAllVacancies();

	return (
		<AdminTemplate
			title="Наши вакансии"
			button={
				<Link to={ROUTER_PATHS.INTERNAL.ADMIN.CREATE_VACANCY}>
					<AdminButton>Создать вакансию</AdminButton>
				</Link>
			}
		>
			<div className="flex flex-wrap -m-16 md:flex-col">
				{vacancies?.map((vacancy) => (
					<Link
						key={vacancy.id}
						to={ROUTER_PATHS.INTERNAL.ADMIN.VACANCY.filled(
							vacancy.id,
						)}
						className="w-1/3 p-16 lg:w-1/2 md:w-full"
					>
						<div className="bg-[#fff] shadow-even-sm rounded-12 space-y-20 p-28">
							<h6 className="text-22 font-semibold text-[#434343]">
								{vacancy.position}
							</h6>

							<div className="flex flex-col space-y-8">
								<div className="flex">
									<div className="inline-flex items-center bg-primary/20 rounded-12 space-x-8 p-8">
										<Icon.Dollar className="w-20 h-auto fill-primary" />

										<span className="font-semibold text-14 text-primary">
											{vacancy.salary}
										</span>
									</div>
								</div>

								<div className="flex flex-wrap items-center text-14 text-[#434343] -mx-8 -my-4">
									<div className="flex items-center space-x-8 m-8">
										<Icon.Rise className="size-20 text-[#434343]" />

										<div className="flex flex-wrap -m-2">
											{vacancy.employmentType.map(
												(value) => (
													<span className="m-2">
														{employmentTypeToLabel(
															value,
														)}
													</span>
												),
											)}
										</div>
									</div>

									<div className="flex items-center space-x-6 mx-8 my-4">
										<Icon.Suitcase className="size-20 text-[#434343]" />

										<span>
											{requiredExperienceToLabel(
												vacancy.requiredExperience,
											)}
										</span>
									</div>

									<div className="flex items-center space-x-6 mx-8 my-4">
										<Icon.Light className="size-20 fill-[#434343]" />

										<div className="flex flex-wrap -m-2">
											{vacancy.modalityType.map(
												(value) => (
													<span className="m-2">
														{modalityTypeToLabel(
															value,
														)}
													</span>
												),
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="flex items-center space-x-8 text-14 text-[#434343]">
								<span>{vacancy.company}</span>
								<span>|</span>
								<span>
									{new Date(
										vacancy.createdAt,
									).toLocaleDateString()}
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</AdminTemplate>
	);
};
