import { NextResponse } from 'next/server';
import { spreadsheetToJSON } from '@/lib/xlsx-utils';

export async function GET() {
	try {
		const data = spreadsheetToJSON('hbs.xlsx');

		return NextResponse.json(data);
	} catch (e) {
		if (e instanceof Error) {
			console.error('Failed to get hbs data, error:', e.message);
			// throw new Error(e.message);
			return NextResponse.json({ error: e.message });
		}
	}
}
