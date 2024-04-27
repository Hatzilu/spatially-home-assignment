import React from 'react';
import PieChart from './PieChart';

const PatientsPieChart = async () => {
	const data = await fetch('http://localhost:3000/api/patients');

	// const json = data.json();
	// console.log({ json });
	return <div>{JSON.stringify(data)}</div>;
	// return <PieChart />;
};

export default PatientsPieChart;
