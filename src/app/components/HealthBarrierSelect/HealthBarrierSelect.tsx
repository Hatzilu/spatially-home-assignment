import React, { ChangeEventHandler } from 'react';
import { HbsEntry } from '@/types/chart';

type Props = {
	readonly options: HbsEntry[];
	readonly onChange: ChangeEventHandler<HTMLSelectElement>;
};

const HealthBarrierSelect = ({ options, onChange }: Props) => {
	return (
		<select
			id="countries"
			aria-placeholder="health barrier"
			onChange={onChange}
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Choose a health barrier</option>
			{options.map((option) => (
				<option key={option.barrier_id} value={option.barrier_id}>
					{option.barrier_name}
				</option>
			))}
		</select>
	);
};

export default HealthBarrierSelect;
