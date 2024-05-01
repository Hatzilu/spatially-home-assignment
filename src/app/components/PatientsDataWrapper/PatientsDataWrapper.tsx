import React from 'react';
import { BASE_URL } from '../../../../consts/consts';
import PatientsDataTable from '../PatientsDataTable.tsx/PatientsDataTable';
import { healthBarriersToMap } from '../../../lib/chart-utils';

// Since we're using Next.JS, i'm having this server component fetch the data from the server
// That way the content is statically generated, resulting in really fast loading time, since the content is already fetched at build time.
// the component below this one is a client component that simply takes the props and shows them.
const PatientsDataWrapper = async () => {
	const hbsRes = await fetch(`${BASE_URL}/api/healthBarriers`);
	const patientsRes = await fetch(`${BASE_URL}/api/patients`);

	if (!hbsRes.ok) {
		return (
			<div>
				<p className="text-red-800">{hbsRes.statusText}</p>
			</div>
		);
	}

	if (!patientsRes.ok) {
		return (
			<div>
				<p className="text-red-800">{patientsRes.statusText}</p>
			</div>
		);
	}

	const healthBarriers = await hbsRes.json();
	const patients = await patientsRes.json();

	if ('error' in healthBarriers) {
		return <div className="px-5">{healthBarriers.error}</div>;
	}
	if ('error' in patients) {
		return <div className="px-5">{patients.error}</div>;
	}
	const hbIdToNameMap = healthBarriersToMap(healthBarriers);

	return (
		<div className="flex flex-col gap-5">
			<PatientsDataTable hbs={healthBarriers} patients={patients} hbIdToNameMap={hbIdToNameMap} />
		</div>
	);
};

export default PatientsDataWrapper;
