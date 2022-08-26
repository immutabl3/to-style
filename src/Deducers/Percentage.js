import { isString } from '@immutabl3/utils';
import pre from '../utils/precision.js';

export default function Percentage(precision) {
	return function percentage(value) {
		// don't alter strings
		if (isString(value)) return value;
		
		// not a valid value, don't touch it
		if (!Number.isFinite(value)) return undefined;
		// value is a percentage, so it has to be 
		// between 0 and 1
		if (value <= 0) return 0;
		if (value > 1) return 1;

		// an value with too hight of a precision
		if (pre(value) > precision) return +value.toPrecision(precision);

		// just return the value
		return value;
	};
};