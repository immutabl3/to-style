import { isNumber } from '@immutabl3/utils';
import pre from '../utils/precision.js';

export default function Precision(num) {
	const round = num === 0 ? 
		// a zero precision is just a round
		x => Math.round(x) :
		// toFixed requires a number between 
		// 1 and 100...we care that it's > 1
		x => +x.toFixed(num);

	return function precision(value) {
		// not a valid value, don't touch it
		if (!isNumber(value)) return value;

		// an value with too hight of a precision
		if (pre(value) >= num) return round(value);

		// just return the value
		return value;
	};
};