import { isNumber } from '@immutabl3/utils';
import pre from '../utils/precision.js';

// NOTE: this is much like Precision.js, but for values that
// aren't streamlined

export default function applyPrecision(value, num) {
	// not a valid value, don't touch it
	if (!isNumber(value)) return value;

	// an value with too hight of a precision
	if (pre(value) >= num) {
		return num === 0 ? 
			// a zero precision is just a round
			Math.round(value) :
			// toFixed requires a number between 
			// 1 and 100...we care that it's > 1
			+value.toFixed(num);
	}

	// just return the value
	return value;
};