import { NextResponse } from 'next/server';
import { spreadsheetToJSON } from '@/lib/xlsx-utils';
import { APIError } from '@/types/error';

export async function GET() {
	try {
		const data = spreadsheetToJSON('hbs.xlsx');

		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Failed to get patients data, error:', error.message);
			return NextResponse.json<APIError>({ error: 'Internal server error' }, { status: 500 });
		}
	}
}
