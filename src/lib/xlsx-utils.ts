import { readFileSync } from 'fs';
import path from 'path';
import { readFile, utils } from 'xlsx';
import * as XLSX from 'xlsx';

export function spreadsheetToJSON<T>(fileName: 'patients.xlsx' | 'hbs.xlsx') {
	const p = path.join(process.cwd(), `src/data/${fileName}`);

	const a = readFileSync(p);
	const workbook = XLSX.read(a);

	// Get the first sheet
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];

	// Convert the sheet to JSON
	const data = XLSX.utils.sheet_to_json<T>(sheet);

	return data;
}
