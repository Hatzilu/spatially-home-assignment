import React from 'react';

type Props = {
	readonly index: number;
	readonly label: string;
	readonly fill: string;
	readonly paddingTop: number;
};
const Legend = ({ label, index, fill, paddingTop }: Props) => {
	return (
		<g transform={`translate(10,${paddingTop + 30 * index + 1})`}>
			<circle r={8} fill={fill} />
			<text fontWeight={200} transform="translate(15, 5)" fill="white">
				{label}
			</text>
		</g>
	);
};

export default Legend;
