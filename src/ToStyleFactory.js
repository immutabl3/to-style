import Transform from './Deducers/Transform';
import Percentage from './Deducers/Percentage';
import Precision from './Deducers/Precision';
import ToUnit from './Deducers/ToUnit';
import Size from './Deducers/Size';
import FormatBox from './Deducers/FormatBox';
import willChange from './Deducers/willChange';
import defaults from './defaults.json';
import isString from './utils/isString';
import flow from './utils/flow';

// TODO: variableize key strings

export default function ToStyleFactory(cssStyleDeclaration) {
	return function ToStyle(config = {}) {
		const {
			blacklist,
			transform3d,
		} = Object.assign({}, defaults, config);
		const units = Object.assign({}, defaults.units, config.units || {});
		const precision = Object.assign({}, defaults.precision, config.precision || {});
		const format = Object.assign({}, defaults.format, config.format || {});
		
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
				// if the key has been blacklisted
				if (blacklistedKeys.has(key)) continue;

				// if it's not a valid style, don't add it to the style object
				if (!cssStyleDeclaration.has(key)) continue;
				
				// the key exists, but the value does not...skip
				if (definition[key] === undefined) continue;

				// functions that replace the value
				if (replacementMap.has(key)) {
					const value = replacementMap.get(key)(definition[key]);
					if (value !== undefined) style[key] = value;
					continue;
				}

				// functions that mutate the style object
				if (mutationMap.has(key)) {
					mutationMap.get(key)(style, definition[key]);
					continue;
				}

				// passthrough
				style[key] = definition[key];
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