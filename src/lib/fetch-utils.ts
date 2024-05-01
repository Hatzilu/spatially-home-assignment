import { ChartData } from '@/types/chart';
import { APIError } from '@/types/error';
import { BASE_URL } from '../../consts/consts';

// I wrote this wrapper mostly to get type declarations for the data i was retreiving from the server.
export async function getChartData(): Promise<ChartData[] | APIError> {
	const res = await fetch(`${BASE_URL}/api/pieChartData`);
	if (!res.ok) {
		return { error: res.statusText };
	}
	const json = res.json();

	return json;
}
