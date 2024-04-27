import { readFileSync } from 'fs';
import { readFile, utils } from 'xlsx';
import * as XLSX from 'xlsx';

export function spreadsheetToJSON(fileName: 'patients.xlsx' | 'hbs.xlsx') {
	const a = readFileSync(`./src/data/${fileName}`);
	// const patientsfile = path.resolve('.', 'src', 'data', 'patients.xlsx');
	// console.log({ patientsfile });
	const workbook = XLSX.read(a);

	// Get the first sheet
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];

	// Convert the sheet to JSON
	const data = XLSX.utils.sheet_to_json(sheet);

	return data;
}
