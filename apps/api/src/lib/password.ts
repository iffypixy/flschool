export const generatePassword = (length: number): string => {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

	let password = "";

	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * charset.length);

		password += charset[index];
	}

	return password;
};
