import {Center, Fullscreen, Loader} from "@shared/ui";
import {useViewer} from "@entities/viewer";

export const ViewerLoader: React.FC<React.PropsWithChildren> = ({children}) => {
	const {isLoading} = useViewer();

	if (isLoading)
		return (
			<Fullscreen>
				<Center>
					<Loader className="w-72" />
				</Center>
			</Fullscreen>
		);

	return <>{children}</>;
};
