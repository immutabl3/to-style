import { isString } from '@immutabl3/utils';

export default function ToUnit(unit) {
	return function toUnit(num) {
		if (isString(num)) return num;
		if (num === 0) return `0`;
		return `${num}${unit}`;
	};
};