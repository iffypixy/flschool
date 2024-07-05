import {defineConfig} from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr()],
	resolve: {
		alias: {
			"@fonts": path.resolve(__dirname, "./src/shared/assets/fonts"),
		},
	},
});
