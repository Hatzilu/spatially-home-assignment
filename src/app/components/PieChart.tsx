'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { ChartData } from '@/types/chart';
import { PIE_CHART_COLOR_RANGE } from '../../../consts/chart.consts';
import PieText from './PieText/PieText';
import Legend from './Legend/Legend';

// i usually tend to mark props as readonly in the codebases i work with to ensure me and other people won't accidentally directlyt mutate the props.
type Props = {
	readonly data: ChartData[];
	readonly width: number;
	readonly height: number;
};

const color = d3.scaleOrdinal<string, string, string>().range(PIE_CHART_COLOR_RANGE);

const PieChart = ({ data, width, height }: Props) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	const radius = useMemo(() => Math.min(width, height) / 2, [width, height]);

	const formattedData = useMemo(() => {
		const generator = d3.pie<ChartData>().value((d) => d.value);

		return generator(data).sort((a, b) => a.data.label.localeCompare(b.data.label));
	}, [data]);

	const arcGenerator = useMemo(
		() => d3.arc<d3.PieArcDatum<ChartData>>().innerRadius(0).outerRadius(radius),
		[width],
	);

	// I'm not sure if this is the best approach for writing d3.js within a React application, but the only
	// library i found with react bindings for d3.js was very outdated and had no type declarations, so i opted to
	// write the code myself
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
				{formattedData.map((entry) => (
					<PieText
						arcGenerator={arcGenerator}
						fill={color(entry.data.value.toString())}
						group={entry}
						radius={radius}
						key={entry.value}
					/>
				))}
			</g>
			<g transform={`translate(${width / 2 + 300}, ${height / 4 - 125})`}>
				<text fontWeight={600} fill="white">
					Health Barrier
				</text>
				{formattedData.map((entry, i) => (
					<Legend
						key={entry.value}
						index={i}
						fill={color(entry.data.value.toString())}
						label={entry.data.label}
						paddingTop={20}
					/>
				))}
			</g>
		</svg>
	);
};

export default PieChart;
