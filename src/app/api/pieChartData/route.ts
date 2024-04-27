import path from 'node:path';
import { NextResponse } from 'next/server';
import { spreadsheetToJSON } from '@/lib/xlsx-utils';
import { APIError } from '@/types/error';
import { patientsToPieChartData } from '@/lib/chart-utils';
import { HbsEntry, PatientEntry } from '@/types/chart';

export function GET() {
	try {
		const patients = spreadsheetToJSON<PatientEntry>('patients.xlsx');
		const hbs = spreadsheetToJSON<HbsEntry>('hbs.xlsx');

		const data = patientsToPieChartData(patients, hbs);
		console.log({ p: path.join(process.cwd(), 'src/data/patients.xlsx') });

		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Failed to get patients data, error:', error.message);
			return NextResponse.json<APIError>({ error: 'Internal server error' }, { status: 500 });
		}
	}
}
