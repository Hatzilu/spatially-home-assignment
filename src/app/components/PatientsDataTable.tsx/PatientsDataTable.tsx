'use client';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { HbsEntry } from '@/types/chart';
import { PatientTableEntry } from '@/types/table.types';

type Props = {
	readonly hbs: HbsEntry[];
	readonly patients: PatientTableEntry[];
};

const PatientsDataTable = ({ hbs, patients }: Props) => {
	const [selectedHb, setSelectedHb] = useState('');

	console.log(selectedHb);

	const onChangeHb = (e: ChangeEvent<HTMLSelectElement>) => setSelectedHb(e.target.value);

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
		[patients],
	);

	const table = useReactTable({
		data: patients,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

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
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>{header.column.columnDef.header?.toString()}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				=
			</table>
		</div>
	);
};

export default PatientsDataTable;
