import {QueryClientProvider as TanStackQueryClientProvider} from "@tanstack/react-query";

import {queryClient} from "../query-client";

export const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<TanStackQueryClientProvider client={queryClient}>
			{children}
		</TanStackQueryClientProvider>
	);
};
