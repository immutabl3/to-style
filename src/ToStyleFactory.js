import { isString } from '@immutabl3/utils';
import Transform from './Deducers/Transform/index.js';
import Percentage from './Deducers/Percentage.js';
import Precision from './Deducers/Precision.js';
import ToUnit from './Deducers/ToUnit.js';
import Size from './Deducers/Size.js';
import FormatBox from './Deducers/FormatBox.js';
import willChange from './Deducers/willChange.js';
import applyPrecision from './Deducers/applyPrecision.js';
import applyUnit from './Deducers/applyUnit.js';
import defaults from './defaults.js';
import flow from './utils/flow.js';

const emptyObject = {};

export default function ToStyleFactory(cssStyleDeclaration) {
	return function ToStyle(config = emptyObject) {
		const {
			blacklist,
			transform3d,
		} = Object.assign({}, defaults, config);
		const units = Object.assign({}, defaults.units, config.units || emptyObject);
		const precision = Object.assign({}, defaults.precision, config.precision || emptyObject);
		const format = Object.assign({}, defaults.format, config.format || emptyObject);

		const transform = Transform(precision, units, transform3d);
		
		const replacementMap = new Map([
			format.opacity && ['opacity', Percentage(precision.opacity)],
			format.top && ['top', flow([Precision(precision.top), ToUnit(units.top)])],
			format.right && ['right', flow([Precision(precision.right), ToUnit(units.right)])],
			format.bottom && ['bottom', flow([Precision(precision.bottom), ToUnit(units.bottom)])],
			format.left && ['left', flow([Precision(precision.left), ToUnit(units.left)])],
			format.width && ['width', flow([Precision(precision.width), ToUnit(units.width)])],
			format.height && ['height', flow([Precision(precision.height), ToUnit(units.height)])],
			format.perspective && ['perspective', flow([Precision(precision.perspective), ToUnit(units.perspective)])],
			format.willChange && ['willChange', willChange],
		].filter(Boolean));

		const mutationMap = new Map([
			format.margin && ['margin', FormatBox('margin', precision.margin, units.margin)],
			format.padding && ['padding', FormatBox('padding', precision.padding, units.padding)],
			format.size && ['size', Size(precision.size, units.size)],
		].filter(Boolean));

		const blacklistedKeys = new Set(blacklist);

		return function toStyle(definition, style = {}) {
			if (!definition) throw new Error('to-style: an object is required');

			for (const key in definition) {
				let value = definition[key];

				// if the key has been blacklisted
				if (blacklistedKeys.has(key)) continue;

				// if it's not a valid style, don't add it to the style object
				if (!cssStyleDeclaration.has(key)) continue;
				
				// the key exists, but the value does not...skip
				if (definition[key] === undefined) continue;
				
				// the key has been told NOT to format...pass through
				if (format[key] === false) {
					style[key] = value;
					continue;
				}

				// functions that replace the value
				if (replacementMap.has(key)) {
					const replacementValue = replacementMap.get(key)(value);
					if (replacementValue !== undefined) style[key] = replacementValue;
					continue;
				}

				// functions that mutate the style object
				if (mutationMap.has(key)) {
					mutationMap.get(key)(style, value);
					continue;
				}

				// if a precision is defined for a value
				if (precision[key] !== undefined) value = applyPrecision(value, precision[key]);
				// if a unit is defined for a value
				if (units[key] !== undefined) value = applyUnit(value, units[key]);

				// passthrough
				style[key] = value;
			}
			
			// transformation is special...if it hasn't been
			// defined, take the definition and try to define it
			if (!isString(style.transform)) {
				const transformation = transform(definition);
				if (transformation !== undefined) style.transform = transformation;
			}

			return style;
		};
	};
};