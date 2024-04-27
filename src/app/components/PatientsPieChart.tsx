'use client';
import React, { useEffect, useState } from 'react';
import { ChartData } from '@/types/chart';
import { getChartData } from '@/lib/fetch-utils';
import PieChart from './PieChart';

const PatientsPieChart = () => {
	const [patients, setPatients] = useState<ChartData[]>([]);
	const [error, setError] = useState('');

	// Normally i would avoid using useEffect, but since this is a small scale application, i opted to use it to save time
	// In a large-scale application i would probably use something like tanstack-query to handle the error and loading states better.
	useEffect(() => {
		getChartData().then((result) => {
			if ('error' in result) {
				// ideally if a request fails i would also log it to an external logging service like SumoLogic.
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

	return <PieChart data={patients} width={400} height={600} />;
};

export default PatientsPieChart;
