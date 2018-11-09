import isNumber from '../utils/isNumber';
import pre from '../utils/precision';

export default function Precision(num) {
	const round = num === 0 ? 
		// a zero precision is just a round
		x => Math.round(x) :
		// toPrecision requires a number between 
		// 1 and 100...we care that it's > 1
		x => +x.toPrecision(num);

	return function precision(value) {
		// not a valid value, don't touch it
		if (!isNumber(value)) return value;

		// an value with too hight of a precision
		if (pre(value) >= num) return round(value);

		// just return the value
		return value;
	};
};