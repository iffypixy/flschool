/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx,jsx,ts,js}"],
	theme: {
		extend: {
			colors: {
				white: "#FBFBFB",
				black: "#151515",
				primary: {
					DEFAULT: "#7136E6",
				},
			},
		},
	},
	plugins: [],
};
