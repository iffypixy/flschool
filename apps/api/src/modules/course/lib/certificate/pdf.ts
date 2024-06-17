import fs from "fs";
import ejs from "ejs";
import puppeteer from "puppeteer";

export const generateCertificatePdf = async (name: string, course: string) => {
	const template = fs.readFileSync("./template.ejs", "utf-8");

	const html = ejs.render(template, {
		name,
		course,
	});

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setContent(html, {waitUntil: "networkidle0"});

	const pdf = await page.pdf({
		format: "A4",
	});

	await browser.close();

	return pdf;
};
