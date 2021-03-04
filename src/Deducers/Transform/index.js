// https://developer.mozilla.org/en-US/docs/Web/CSS/transform

// transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
// transform: translate(12px, 50%);
// transform: translateX(2em);
// transform: translateY(3in);
// transform: scale(2, 0.5);
// transform: scaleX(2);
// transform: scaleY(0.5);
// transform: rotate(0.5turn);
// transform: skew(30deg, 20deg);
// transform: skewX(30deg);
// transform: skewY(1.07rad);
// transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
// transform: translate3d(12px, 50%, 3em);
// transform: translateZ(2px);
// transform: scale3d(2.5, 1.2, 0.3);
// transform: scaleZ(0.3);
// transform: rotate3d(1, 2.0, 3.0, 10deg);
// transform: rotateX(10deg);
// transform: rotateY(10deg);
// transform: rotateZ(10deg);

import Precision from '../Precision';
import ToUnit from '../ToUnit';
import flow from '../../utils/flow';
import toRadians from '../../utils/toRadians';
import toProperty from './toProperty';
import end from './end';
import toMatrix from './toMatrix';
import array from './array';
import object from './object';

export default function Transform(precision, units, accelerate) {
	const matrixTransform = function(definition) {
		// using an object pool for this as well, gotta keep it stable
		const values = object();

		if (definition.rotate !== undefined) {
			values.rotateX = values.rotateY = values.rotateZ = definition.rotate;
		} else {
			definition.rotateX !== undefined && (values.rotateX = definition.rotateX);
			definition.rotateY !== undefined && (values.rotateY = definition.rotateY);
			definition.rotateZ !== undefined && (values.rotateZ = definition.rotateZ);
		}

		if (definition.skew !== undefined) {
			values.skewX = values.skewY = definition.skew;
		} else {
			definition.skewX !== undefined && (values.skewX = toRadians(definition.skewX));
			definition.skewY !== undefined && (values.skewY = toRadians(definition.skewY));
		}

		if (definition.scale !== undefined) {
			values.scaleX = values.scaleY = values.scaleZ = definition.scale;
		} else {
			definition.scaleX !== undefined && (values.scaleX = definition.scaleX);
			definition.scaleY !== undefined && (values.scaleY = definition.scaleY);
			definition.scaleZ !== undefined && (values.scaleZ = definition.scaleZ);
		}

		definition.x !== undefined ? 
			(values.x = definition.x) : 
			definition.translateX !== undefined ?
				(values.x = definition.translateX) :
				undefined;

		definition.y !== undefined ? 
			(values.y = definition.y) : 
			definition.translateY !== undefined ?
				(values.y = definition.translateY) :
				undefined;

		definition.z !== undefined ? 
			(values.z = definition.z) : 
			definition.translateZ !== undefined ?
				(values.z = definition.translateZ) :
				undefined;

		const matrix = toMatrix(values);
		// freeing the object
		object(values);
		return matrix;
	};

	const formatRotate = flow([Precision(precision.rotate), ToUnit(units.rotate), toProperty('rotate')]);
	const formatRotateX = flow([Precision(precision.rotateX), ToUnit(units.rotateX), toProperty('rotateX')]);
	const formatRotateY = flow([Precision(precision.rotateY), ToUnit(units.rotateY), toProperty('rotateY')]);
	const formatRotateZ = flow([Precision(precision.rotateZ), ToUnit(units.rotateZ), toProperty('rotateZ')]);
	
	const formatSkew = flow([Precision(precision.skew), ToUnit(units.skew), toProperty('skew')]);
	const formatSkewX = flow([Precision(precision.skewX), ToUnit(units.skewX), toProperty('skewX')]);
	const formatSkewY = flow([Precision(precision.skewY), ToUnit(units.skewX), toProperty('skewY')]);

	const formatScale = flow([Precision(precision.scale), toProperty('scale')]);
	const formatScaleX = flow([Precision(precision.scaleX), toProperty('scaleX')]);
	const formatScaleY = flow([Precision(precision.scaleY), toProperty('scaleY')]);
	const formatScaleZ = flow([Precision(precision.scaleZ), toProperty('scaleZ')]);
	
	const formatX = flow([Precision(precision.x), ToUnit(units.x), toProperty('translateX')]);
	const formatY = flow([Precision(precision.y), ToUnit(units.y), toProperty('translateY')]);
	const formatZ = flow([Precision(precision.z), ToUnit(units.z), toProperty('translateZ')]);

	const verboseTransform = function(definition) {
		const values = array();

		if (definition.rotate !== undefined) {
			values.push(formatRotate(definition.rotate));
		} else {
			definition.rotateX !== undefined && values.push(formatRotateX(definition.rotateX));
			definition.rotateY !== undefined && values.push(formatRotateY(definition.rotateY));
			definition.rotateZ !== undefined && values.push(formatRotateZ(definition.rotateZ));
		}

		if (definition.skew !== undefined) {
			values.push(formatSkew(definition.skew));
		} else {
			definition.skewX !== undefined && values.push(formatSkewX(definition.skewX));
			definition.skewY !== undefined && values.push(formatSkewY(definition.skewY));
		}

		if (definition.scale !== undefined) {
			values.push(formatScale(definition.scale));
		} else {
			definition.scaleX !== undefined && values.push(formatScaleX(definition.scaleX));
			definition.scaleY !== undefined && values.push(formatScaleY(definition.scaleY));
			definition.scaleZ !== undefined && values.push(formatScaleZ(definition.scaleZ));
		}

		definition.x !== undefined ? values.push(formatX(definition.x)) : definition.translateX !== undefined && values.push(formatX(definition.translateX));
		definition.y !== undefined ? values.push(formatY(definition.y)) : definition.translateY !== undefined && values.push(formatY(definition.translateY));
		definition.z !== undefined ? values.push(formatZ(definition.z)) : definition.translateZ !== undefined && values.push(formatZ(definition.translateZ));

		const result = end(values);
		values.free();
		return result;
	};

	return function tranform(definition) {
		// matrix and matrix 3d are capable of short-circuiting
		// the rest of the logic
		if (definition.matrix !== undefined) {
			return Array.isArray(definition.matrix) ?
				`matrix(${definition.matrix.join(',')})` : 
				`matrix(${definition.matrix})`;
		}
		if (definition.matrix3d !== undefined) {
			return Array.isArray(definition.matrix3d) ?
				`matrix3d(${definition.matrix3d.join(',')})` : 
				`matrix3d(${definition.matrix3d})`;
		}

		return accelerate ? 
			matrixTransform(definition) : 
			verboseTransform(definition);		
	};
};