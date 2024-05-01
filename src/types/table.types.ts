import { PatientEntry } from './chart';

export type PatientTableEntry = Omit<PatientEntry, 'barrier_id'> & {
	barrier_name: string;
};
