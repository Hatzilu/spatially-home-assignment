import React from 'react';
import * as d3 from 'd3';
import { DataEntry } from '@/types/chart';

type Props = {
	data: DataEntry[];
	width: number;
	height: number;
	marginTop: number;
	marginRight: number;
	marginBottom: number;
	marginLeft: number;
};
const PieChart = ({ data, width, height, marginTop, marginRight, marginBottom, marginLeft }: Props) => {
	const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
	const ext = d3.extent(data) as [string, string];
	const y = d3.scaleLinear(ext, [height - marginBottom, marginTop]);
	const line = d3.line((d, i) => x(i), y);
	return (
		<svg width={width} height={height}>
			<path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
			<g fill="white" stroke="currentColor" strokeWidth="1.5">
				{data.map((d, i) => (
					<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
				))}
			</g>
		</svg>
	);
};

export default PieChart;
