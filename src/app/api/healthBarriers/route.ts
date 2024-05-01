import { NextResponse } from 'next/server';
import { spreadsheetToJSON } from '@/lib/xlsx-utils';
import { APIError } from '@/types/error';
import { HbsEntry } from '@/types/chart';

export function GET() {
	try {
		const hbs = spreadsheetToJSON<HbsEntry>('hbs.xlsx');

		return NextResponse.json(hbs);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Failed to get health barriers data, error:', error.message);
			return NextResponse.json<APIError>({ error: 'Internal server error' }, { status: 500 });
		}
	}
}
