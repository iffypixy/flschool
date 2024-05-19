/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx,jsx,ts,js}"],
	theme: {
		extend: {
			fontFamily: {
				gotham: '"Gotham", sans-serif',
				manrope: '"Manrope", sans-serif',
				gilroy: '"Gilroy", sans-serif',
			},
			backgroundImage: {
				gradient: "linear-gradient(90deg, #03C1CD 0%, #7138E7 100%)",
				"gradient-1":
					"linear-gradient(103.4deg, #6844E4 16.1%, #23A8D5 91.54%)",
				"gradient-2":
					"linear-gradient(77.02deg, #957CED 24.34%, #37A3D9 94.66%)",
				"gradient-3":
					"linear-gradient(100.77deg, #0DB8D0 22.93%, #A9A2F2 57.51%)",
			},
			colors: {
				white: "#FBFBFB",
				black: "#151515",
				primary: {
					DEFAULT: "#7136E6",
				},
			},
		},
		screens: {
			xl: {max: "1400px"},
			lg: {max: "1280px"},
			md: {max: "1012px"},
			sm: {max: "768px"},
			xs: {max: "544px"},
		},
		spacing: mapToRem([
			0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
			36, 38, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96,
			100, 116, 132, 148, 164, 180, 196, 260, 324, 388,
		]),
		fontSize: mapToRem([
			0, 8, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
			36, 38, 40, 44, 48, 52, 56, 60, 72, 84,
		]),
		borderRadius: {
			...mapToRem([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32]),
			full: "99999px",
		},
	},
	plugins: [],
};

function mapToRem(sizes) {
	return sizes.reduce((prev, size) => {
		prev[size] = `${size / 10}rem`;

		return prev;
	}, {});
}
