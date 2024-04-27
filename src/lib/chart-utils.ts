import { ChartData, HbsEntry, PatientEntry } from '@/types/chart';

/**
 * Generate a map that maps a barrier ID to it's name
 * Convert the Health barrier array into a map, since fetching from an array would take O(n) time while map.get is O(1).
 * @param hbs - health barrier entries
 */
function healthBarriersToMap(hbs: HbsEntry[]) {
	const map = new Map<string, string>();
	hbs.forEach((barrier) => {
		map.set(barrier.barrier_id, barrier.barrier_name);
		console.log(barrier.barrier_id, 'is', barrier.barrier_name);
	});
	return map;
}

export function patientsToPieChartData(patients: PatientEntry[], hbs: HbsEntry[]) {
	const barrierToCountObject: Record<string, number> = {};
	const hbsMap = healthBarriersToMap(hbs);

	// use maps to assign the count to each barrier name, since map.get is faster
	// than iterating over an array inside an array.
	patients.forEach((patient) => {
		// For patients with no barrier ID, i will simply ignore them for now since no instructions were specified about their usage.
		let barrierName;
		if (!hbsMap.has(patient.barrier_id)) {
			// barrierName = 'Other';
			return;
		} else {
			barrierName = hbsMap.get(patient.barrier_id)!;
		}

		if (!barrierToCountObject[barrierName]) {
			barrierToCountObject[barrierName] = 1;
		} else {
			barrierToCountObject[barrierName] = barrierToCountObject[barrierName] + 1;
		}
	});

	const array: ChartData[] = [];

	Object.entries(barrierToCountObject).forEach(([barrierName, count]) => {
		const percentage = (count / patients.length) * 100;
		array.push({ label: barrierName, value: count, percentage });
	});

	return array;
}
