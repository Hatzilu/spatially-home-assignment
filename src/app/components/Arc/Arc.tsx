import { ChartData } from '@/types/chart';
import * as d3 from 'd3';

type Props = {
	data: ChartData;
	index: number;
	createArc: string;
	colors: (index: number) => string;
	format: typeof d3.format;
	arc: ReturnType<typeof d3.arc>;
};

const Arc = ({ data, index, createArc, colors, format, arc }: Props) => (
	<g key={index} className="arc">
		<path className="arc" d={arc} fill={colors(index)} />
		<text
			// transform={`translate(${createArc.centroid(data)})`}
			textAnchor="middle"
			fill="white"
			fontSize="10"
		>
			{d3.format(data.percentage)}
		</text>
	</g>
);

function createArc = (data: )

export default Arc;
