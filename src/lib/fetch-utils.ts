import { ChartData } from '@/types/chart';
import { APIError } from '@/types/error';
import { BASE_URL } from '../../consts/consts';

export async function GETChartData(): Promise<ChartData[] | APIError> {
	const res = await fetch(`${BASE_URL}/api/pieChartData`);

	const json = res.json();

	return json;
}
