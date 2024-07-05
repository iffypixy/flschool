/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx,jsx,ts,js}"],
	theme: {
		extend: {
			fontFamily: {
				tildasans: '"TildaSans", sans-serif',
			},
			backgroundImage: {
				gradient: "linear-gradient(90deg, #03C1CD 0%, #7138E7 100%)",
			},
			colors: {
				primary: {
					DEFAULT: "rgb(113 54 230 / <alpha-value>)",
					contrast: "rgb(251 251 251 / <alpha-value>)",
				},
			},
			boxShadow: {
				"even-sm": "0 0 10px rgb(0 0 0 / 0.1)",
				"even-md": "0 0 25px rgb(0 0 0 / 0.1)",
				"even-lg": "0 0 50px rgb(0 0 0 / 0.1)",
				"border-md": "0 0 0 6px rgb(0 0 0 / 0.1)",
			},
		},
		screens: {
			xl: {max: "1400px"},
			lg: {max: "1280px"},
			md: {max: "1012px"},
			sm: {max: "768px"},
			xs: {max: "544px"},
		},
		spacing: {
			...mapToRem([
				0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
				32, 34, 36, 38, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84,
				88, 92, 96, 100, 116, 132, 148, 164, 180, 196, 260, 324, 388,
			]),
			px: "1px",
		},
		fontSize: {
			...mapToRem([
				0, 8, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32,
				34, 36, 38, 40, 44, 48, 52, 56, 60, 72, 84,
			]),
			xs: "1.2rem",
			sm: "1.4rem",
			md: "1.6rem",
			lg: "1.8rem",
			xl: "2rem",
		},
		borderRadius: {
			...mapToRem([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32]),
			xs: "0.2rem",
			sm: "0.4rem",
			md: "0.8rem",
			lg: "1.2rem",
			xl: "1.6rem",
			full: "99999px",
		},
	},
	plugins: [require("tailwindcss-animate")],
};

function mapToRem(sizes) {
	const REM_FACTOR = 10;

	return sizes.reduce((prev, size) => {
		prev[size] = `${size / REM_FACTOR}rem`;
		return prev;
	}, {});
}
