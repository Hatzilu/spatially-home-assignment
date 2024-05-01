'use client';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { HbsEntry } from '@/types/chart';
import { PatientTableEntry } from '@/types/table.types';
import Table from '../Table/Table';

type Props = {
	readonly hbs: HbsEntry[];
	readonly patients: PatientTableEntry[];
};

const PatientsDataTable = ({ hbs, patients }: Props) => {
	const [selectedBarrierName, setSelectedBarrierName] = useState('');

	const onChangeHb = (e: ChangeEvent<HTMLSelectElement>) => setSelectedBarrierName(e.target.value);

	const filteredPatients = useMemo(
		() =>
			selectedBarrierName ? patients.filter((p) => p.barrier_name === selectedBarrierName) : patients,
		[patients, selectedBarrierName],
	);

	const columns = useMemo<ColumnDef<PatientTableEntry, unknown>[]>(
		() => [
			{
				accessorKey: 'first_name',
				header: 'First name',
			},
			{
				accessorKey: 'last_name',
				header: 'First name',
			},
			{
				accessorKey: 'barrier_name',
				header: 'Health barrier',
			},
		],
		[filteredPatients],
	);

	return (
		<div className="flex flex-col gap-5">
			<h3>Patients ({patients.length})</h3>
			<select
				id="countries"
				aria-placeholder="health barrier"
				onChange={onChangeHb}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value="">Choose a health barrier</option>
				{hbs.map((option) => (
					<option key={option.barrier_id} value={option.barrier_name}>
						{option.barrier_name} (
						{patients.filter((p) => p.barrier_name === option.barrier_name).length})
					</option>
				))}
			</select>
			<Table data={filteredPatients} columns={columns} />
		</div>
	);
};

export default PatientsDataTable;
