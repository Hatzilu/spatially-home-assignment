import React from 'react';

import * as d3 from 'd3';
import { ChartData, PieCoordinate } from '@/types/chart';
import { LINE_PADDING } from '../../../../consts/chart.consts';

type Props = {
	readonly radius: number;
	readonly index: number;
	readonly group: d3.PieArcDatum<ChartData>;
	readonly arcGenerator: d3.Arc<any, d3.PieArcDatum<ChartData>>;
	readonly fill: string;
};

const PieText = ({ radius, index, group, arcGenerator, fill }: Props) => {
	const sliceInfo = {
		...group,
		innerRadius: 0,
		outerRadius: radius,
		startAngle: group.startAngle,
		endAngle: group.endAngle,
	};

	const centroid = arcGenerator.centroid(sliceInfo);
	const slicePath = arcGenerator(sliceInfo)?.toString();

	const label = group.data.percentage.toFixed(2) + '%';

	// Multiply the x and y coordinates of the centeroid by 2 to get the coordinates for the edge of the pie
	// then add some padding so it looks good.
	const circleEdgePoint: PieCoordinate = [
		centroid[0] * (2 + LINE_PADDING),
		centroid[1] * (2 + LINE_PADDING),
	];

	const line1: PieCoordinate = [circleEdgePoint[0] * 1.2, circleEdgePoint[1] * 1.2];

	const isRightLabel = line1[0] > 0;
	const textAnchor = isRightLabel ? 'start' : 'end';

	const line2 = [line1[0] + (radius * (isRightLabel ? 1 : -1)) / 10, line1[1]];

	return (
		<g>
			<path d={slicePath} fill={fill} />

			<circle cx={circleEdgePoint[0]} cy={circleEdgePoint[1]} r={1.5} fill="white" />
			<line
				x1={circleEdgePoint[0]}
				y1={circleEdgePoint[1]}
				x2={line1[0]}
				y2={line1[1]}
				stroke={'white'}
				fill={'white'}
			/>
			<line x1={line1[0]} y1={line1[1]} x2={line2[0]} y2={line2[1]} stroke={'white'} fill={'white'} />
			<text
				x={line2[0] + 5 * (isRightLabel ? 2 : -2)}
				y={line2[1]}
				textAnchor={textAnchor}
				dominantBaseline="middle"
				fontSize={14}
				fill="white"
			>
				{label}
			</text>
		</g>
	);
};

export default PieText;
