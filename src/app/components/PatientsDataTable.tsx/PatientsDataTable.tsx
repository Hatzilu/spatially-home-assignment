'use client';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { HbsEntry, PatientEntry } from '@/types/chart';

type Props = {
	readonly hbs: HbsEntry[];
	readonly patients: PatientEntry[];
	readonly hbIdToNameMap: Map<string, string>;
};

const PatientsDataTable = ({ hbs, patients, hbIdToNameMap }: Props) => {
	const [selectedHb, setSelectedHb] = useState('');

	const filteredPatients = useMemo(
		() => (selectedHb ? patients.filter((p) => p.barrier_id === selectedHb) : patients),
		[patients, selectedHb],
	);

	console.log(selectedHb);

	const onChangeHb = (e: ChangeEvent<HTMLSelectElement>) => setSelectedHb(e.target.value);

	return (
		<div className="flex flex-col gap-5">
			<select
				id="countries"
				aria-placeholder="health barrier"
				onChange={onChangeHb}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value="">Choose a health barrier</option>
				{hbs.map((option) => (
					<option key={option.barrier_id} value={option.barrier_id}>
						{option.barrier_name}
					</option>
				))}
			</select>
			<table>
				<thead>
					<tr>
						<th scope="col">Patient Name</th>
						<th scope="col">Health Barrier</th>
					</tr>
				</thead>
				<tbody>
					{filteredPatients.map((p) => {
						const barrierName = hbIdToNameMap.get(p.barrier_id);

						return (
							<tr key={p.patient_id}>
								<td>
									{p.first_name} {p.last_name}
								</td>
								<td>{barrierName || 'N/A'}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default PatientsDataTable;
