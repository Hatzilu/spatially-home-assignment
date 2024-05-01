import { Suspense } from 'react';
import PatientsPieChart from './components/PatientsPieChart/PatientsPieChart';
import PatientsDataWrapper from './components/PatientsDataWrapper/PatientsDataWrapper';

export default function Home() {
	return (
		<div className="px-5">
			<Suspense fallback={<div>loading...</div>}>
				<PatientsPieChart />
			</Suspense>
			<Suspense fallback={<div>loading...</div>}>
				<PatientsDataWrapper />
			</Suspense>
		</div>
	);
}
