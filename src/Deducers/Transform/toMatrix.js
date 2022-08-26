import array from './array.js';
import compose, {
	translate,
	skew,
	scale,
	rotateX as matrixRotateX,
	rotateY as matrixRotateY,
	rotateZ as matrixRotateZ,
} from './Matrix.js';

export default function toMatrix({
	x,
	y,
	z,
	skewX,
	skewY,
	rotateX,
	rotateY,
	rotateZ,
	scaleX,
	scaleY,
	scaleZ,
}) {
	const matricies = array();
	
	if (x || y || z) matricies.push(
		translate(x || 0, y || 0, z || 0)
	);
	
	if (skewX || skewY) matricies.push(
		skew(skewX || 0, skewY || 0)
	);
	
	if (scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) matricies.push(
		scale(
			scaleX === undefined ? 1 : scaleX,
			scaleY === undefined ? 1 : scaleY,
			scaleZ === undefined ? 1 : scaleZ,
		)
	);

	if (rotateX !== undefined) matricies.push(
		matrixRotateX(rotateX)
	);
	if (rotateY !== undefined) matricies.push(
		matrixRotateY(rotateY)
	);
	if (rotateZ !== undefined) matricies.push(
		matrixRotateZ(rotateZ)
	);

	const values = compose(matricies);
	const matrix = `matrix3d(${values.join(',')})`;
	matricies.free();
	values.free();
	return matrix;
};