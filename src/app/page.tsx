import PatientsPieChart from './components/PatientsPieChart';
import { Suspense } from 'react';

export default function Home() {
	return (
		<div>
			<Suspense fallback={<div>loading...</div>}>
				<PatientsPieChart />
			</Suspense>
		</div>
	);
}
