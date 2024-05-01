import { Suspense } from 'react';
import PatientsPieChart from './components/PatientsPieChart/PatientsPieChart';

export default function Home() {
	return (
		<div>
			<Suspense fallback={<div>loading...</div>}>
				<PatientsPieChart />
			</Suspense>
		</div>
	);
}
