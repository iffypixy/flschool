import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@shared/ui";

export const CoursesPage: React.FC = () => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbItem>
					<BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbSeparator />

				<BreadcrumbPage>
					<BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
				</BreadcrumbPage>
			</BreadcrumbList>
		</Breadcrumb>
	);
};
