import {useAllConsultationRequests, AdminTemplate} from "@features/cms/admin";
import {
	GradientButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";

export const InternalAdminConsultationRequestsPage: React.FC = () => {
	const {consultationRequests} = useAllConsultationRequests();

	return (
		<AdminTemplate title="Заявки на консультацию">
			<Table className="max-w-full w-full">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[10%]">ID</TableHead>
						<TableHead className="w-[35%]">ФИО</TableHead>
						<TableHead className="w-[35%]">
							Номер телефона
						</TableHead>
						<TableHead className="flex justify-end items-center">
							Действие
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{consultationRequests?.map((request, idx) => (
						<TableRow key={request.id}>
							<TableCell className="w-[10%]">{idx + 1}</TableCell>
							<TableCell className="w-[35%]">
								{request.name}
							</TableCell>
							<TableCell className="w-[35%]">
								{request.phone}
							</TableCell>
							<TableCell className="flex justify-end">
								<a
									href={`https://wa.me/${request.phone}`}
									target="_blank"
								>
									<GradientButton className="shadow-even-sm py-8 px-10 !text-14 !rounded-8">
										Связаться
									</GradientButton>
								</a>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</AdminTemplate>
	);
};
