export type PatientEntry = {
	barrier_id: string;
	patient_id: string;
	tract_fips: number;
	first_name: string;
	last_name: string;
};
export type HbsEntry = {
	barrier_id: string;
	barrier_name: string;
};

export type ChartData = { label: string; value: number; percentage: number };
