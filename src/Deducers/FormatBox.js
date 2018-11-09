import Precision from './Precision';
import ToUnit from './ToUnit';
import flow from '../utils/flow';
import isString from '../utils/isString';
import isNumber from '../utils/isNumber';

export default function FormatBox(key, precision, unit) {
	const format = flow([
		Precision(precision),
		ToUnit(unit),
	]);

	const coerce = function(value) {
		return isString(value) ? value : format(value);
	};

	const keyTop = `${key}Top`;
	const keyRight = `${key}Right`;
	const keyBottom = `${key}Bottom`;
	const keyLeft = `${key}Left`;

	return function formatBox(style, value) {
		// nothin, leave it be
		if (value === undefined) return;

		// string is a valid value
		if (isString(value)) {
			style[key] = value;
			return;
		}

		// a number will work if we format it
		if (key === 'padding' && value === 1.999999) debugger;
		if (isNumber(value)) {
			style[key] = format(value);
			return;
		}

		// an array? we can work with an array
		if (Array.isArray(value)) {
			style[key] = value.map(coerce).join(' ');
			return;
		}

		// must be an object

		// must be a *full* object
		if (value.top !== undefined &&
			value.right !== undefined &&
			value.bottom !== undefined &&
			value.left !== undefined 
		) {
			style[key] = `${coerce(value.top)} ${coerce(value.right)} ${coerce(value.bottom)} ${coerce(value.left)}`;
			return;
		}
		
		// partial object...assign styles individually
		value.top !== undefined && (style[keyTop] = coerce(value.top));
		value.right !== undefined && (style[keyRight] = coerce(value.right));
		value.bottom !== undefined && (style[keyBottom] = coerce(value.bottom));
		value.left !== undefined && (style[keyLeft] = coerce(value.left));
	};
};