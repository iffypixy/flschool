import {createRoot} from "react-dom/client";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {QueryClientProvider} from "./providers";
import {ViewerLoader} from "./viewer-loader";
import {Router} from "./router";

import "./css/global.css";

const root = document.getElementById("root")!;

createRoot(root).render(
	<QueryClientProvider>
		<ReactQueryDevtools />

		<ViewerLoader>
			<Router />
		</ViewerLoader>
	</QueryClientProvider>,
);
