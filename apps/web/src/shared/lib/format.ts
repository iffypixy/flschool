export const formatPrice = (n: number) =>
	n.toLocaleString("ru-RU").replace(/,/g, " ");
