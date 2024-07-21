import {createRoot} from "react-dom/client";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import {QueryClientProvider, ViewerLoader, Toaster} from "./providers";
import {Router} from "./router";

import "./css/global.css";

const root = document.getElementById("root")!;

createRoot(root).render(
    <QueryClientProvider>
        <ReactQueryDevtools />
        <Toaster />

        <ViewerLoader>
            <Router />
        </ViewerLoader>
    </QueryClientProvider>,
);
