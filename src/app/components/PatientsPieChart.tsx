'use client';
import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import { ChartData } from '@/types/chart';
import { getChartData } from '@/lib/fetch-utils';

const PatientsPieChart = () => {
	const [patients, setPatients] = useState<ChartData[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		getChartData().then((result) => {
			if ('error' in result) {
				setError(result.error.toString());
				return;
			}
			setError('');
			setPatients(result);
		});
	}, []);
	if (error) {
		return <div>{error}</div>;
	}
	console.log(patients);

	// console.log({ json });
	// return <code>{JSON.stringify(patients, null, 2)}</code>;
	return <PieChart data={patients} width={400} height={600} />;
};

export default PatientsPieChart;
