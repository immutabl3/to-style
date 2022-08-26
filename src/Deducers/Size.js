import Precision from './Precision.js';
import ToUnit from './ToUnit.js';
import flow from '../utils/flow.js';

export default function Size(precision, unit) {
	const format = flow([Precision(precision), ToUnit(unit)]);
	return function size(style, value) {
		const val = format(value);
		style.width = val;
		style.height = val;
	};
};