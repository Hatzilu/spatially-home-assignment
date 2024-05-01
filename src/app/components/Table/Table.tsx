'use client';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type Props<T> = {
	readonly data: T[];
	readonly columns: ColumnDef<T, unknown>[];
};

function Table<T>({ data, columns }: Props<T>) {
	const table = useReactTable({
		data,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const currentPage = table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1;

	return (
		<div className="flex justify-between min-h-96 flex-col w-full">
			<table className="min-w-full" width={table.getTotalSize()}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th className="text-start underline" key={header.id}>
									{header.column.columnDef.header?.toString()}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="min-w-9 max-w-9">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex  items-center justify-center gap-5 px-5">
				<button
					onClick={table.previousPage}
					disabled={!table.getCanPreviousPage()}
					className="border-2 px-2 py-1 rounded border-gray-50 border-solid border-w disabled:text-gray-600 disabled:border-gray-600"
				>
					Previous
				</button>
				<p>
					{currentPage}/{table.getPageCount()}
				</p>
				<button
					onClick={table.nextPage}
					disabled={!table.getCanNextPage()}
					className="border-2 px-2 py-1 rounded border-gray-50 border-solid border-w disabled:text-gray-600 disabled:border-gray-600"
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default Table;
