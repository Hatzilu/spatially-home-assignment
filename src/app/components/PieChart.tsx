'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { ChartData } from '@/types/chart';
import PieText from './PieText/PieText';
import Legend from './Legend/Legend';

type Props = {
	data: ChartData[];
	width: number;
	height: number;
};

const color = d3.scaleOrdinal<string, string, string>().range(d3.schemeSet2);

const PieChart = ({ data, width, height }: Props) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	const radius = useMemo(() => Math.min(width, height) / 2, [width, height]);
	const formattedData = useMemo(() => {
		const generator = d3.pie<ChartData>().value((d) => d.value);
		return generator(data);
	}, [data]);

	const arcGenerator = useMemo(
		() => d3.arc<d3.PieArcDatum<ChartData>>().innerRadius(0).outerRadius(radius),
		[width],
	);

	useEffect(() => {
		const svg = d3
			.select(svgRef.current)
			.attr('width', width)
			.attr('height', height)
			.style('overflow', 'visible')
			.style('margin-top', '150px')
			.style('margin-left', '200px');

		svg.selectAll('path')
			.data(formattedData)
			.join('path')
			.attr('d', arcGenerator)
			.attr('fill', (d) => color(d.value.toString()));
	}, [data]);

	return (
		<svg width={width} height={height} ref={svgRef}>
			<g transform={`translate(${width / 2}, ${height / 2})`}>
				{formattedData.map((entry, i) => (
					<PieText
						arcGenerator={arcGenerator}
						fill={color(entry.data.value.toString())}
						group={entry}
						index={i}
						radius={radius}
						key={entry.value}
					/>
				))}
			</g>
			<g transform={`translate(${width / 2 + 300}, ${height / 4 - 125})`}>
				<text fontWeight={500} fill="white">
					Health Barriers
				</text>
				{formattedData.map((entry, i) => (
					<Legend
						key={entry.data.label}
						index={i}
						fill={color(entry.data.value.toString())}
						label={entry.data.label}
						paddingTop={30}
					/>
				))}
			</g>
		</svg>
	);
};

export default PieChart;
