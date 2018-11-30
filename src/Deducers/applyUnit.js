import isNumber from '../utils/isNumber';
import isString from '../utils/isString';

export default function applyUnit(value, unit) {
	// already has a unit (as it doesn't convert)
	if (isString(value) && Number.isNaN(+value)) return value;
	// is a number, but isn't a valid number to add a unit to
	if (isNumber(value) && !Number.isFinite(value)) return value;
	// apply the unit
	return `${value}${unit}`;
};