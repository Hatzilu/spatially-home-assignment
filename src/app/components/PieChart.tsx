'use client';
import React, { LegacyRef, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ChartData } from '@/types/chart';
import Arc from './Arc/Arc';
import { pieGenerator } from '@/lib/chart-utils';

type Props = {
	data: ChartData[];
	width: number;
	height: number;
};
const PieChart = ({ data, width, height }: Props) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	// .sort(/null);

	useEffect(() => {
		const svg = d3
			.select(svgRef.current)
			.attr('width', width)
			.attr('height', height)
			.style('overflow', 'visible')
			.style('margin-top', '400px')
			.style('margin-left', '400px');

		svg.selectAll('path')
			.data(formattedData)
			.join('path')
			.attr('d', arcGenerator)
			.attr('fill', (d) => color(d.value));

		svg.selectAll('text')
			.data(formattedData)
			.enter()
			.append('text')
			.attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
			.attr('text-anchor', 'middle');
	}, [data]);

	return (
		<svg width={width} height={height} ref={svgRef}>
			{/* {data.map((entry, i) => (
				<Arc entry={entry} key={entry.label} />
			))} */}
		</svg>
	);
};

export default PieChart;
