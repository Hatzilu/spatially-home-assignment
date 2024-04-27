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
		const svg = d3.select(svgRef.current);

		const radius = Math.min(width, height) / 2;

		const formattedData = d3.pie<ChartData>().value((d) => d.value)(data);
		const arcGenerator = d3.arc<ChartData>().innerRadius(0).outerRadius(radius);
		const color = d3.scaleOrdinal<string, string, string>().range(d3.schemeSet2);

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
