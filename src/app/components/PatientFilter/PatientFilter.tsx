import React from 'react';
import { HbsEntry } from '@/types/chart';

type Props = {
	readonly healthBarriers: HbsEntry[];
};
const PatientFilter = ({ healthBarriers }: Props) => {
	return (
		<form className="max-w-sm pr-2">
			<label
				htmlFor="countries"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				Filter by Health barrier
			</label>
			<select
				id="countries"
				aria-placeholder="health barrier"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option selected>Choose a health barrier</option>
				{healthBarriers.map((healthBarrier) => (
					<option key={healthBarrier.barrier_id} value={healthBarrier.barrier_id}>
						{healthBarrier.barrier_name}
					</option>
				))}
				<option value="CA">Canada</option>
				<option value="FR">France</option>
				<option value="DE">Germany</option>
			</select>
		</form>
	);
};

export default PatientFilter;
