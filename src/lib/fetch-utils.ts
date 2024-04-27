import { ChartData, HbsEntry, PatientEntry } from '@/types/chart';
import { BASE_URL } from '../../consts/consts';
import { APIError } from '@/types/error';

export async function getChartData(): Promise<ChartData | APIError> {
	const res = await fetch(`${BASE_URL}/api/pieChartData`);

	const json = res.json();

	return json;
}
