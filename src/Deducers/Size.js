import Precision from './Precision';
import ToUnit from './ToUnit';
import flow from '../utils/flow';

export default function Size(precision, unit) {
	const format = flow([Precision(precision), ToUnit(unit)]);
	return function size(style, value) {
		const val = format(value);
		style.width = val;
		style.height = val;
	};
};