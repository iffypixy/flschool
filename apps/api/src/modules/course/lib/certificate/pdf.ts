import fs from "fs";
import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import process from "process";

export const generateCertificatePdf = async (name: string, course: string) => {
	const template = fs.readFileSync(
		path.resolve(
			process.cwd(),
			"./src/modules/course/lib/certificate/template.ejs",
		),
		"utf-8",
	);

	const html = ejs.render(template, {
		name,
		course,
	});

	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		headless: true,
	});

	const page = await browser.newPage();

	await page.setContent(html);

	const pdf = await page.pdf({
		width: 660,
		height: 500,
	});

	await browser.close();

	return pdf;
};
