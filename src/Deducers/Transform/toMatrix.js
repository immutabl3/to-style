import array from './array';
import compose, {
	translate,
	skew,
	scale,
	rotateX as matrixRotateX,
	rotateY as matrixRotateY,
	rotateZ as matrixRotateZ,
} from './Matrix';

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
	// original code:
	// const values = compose([
	// 	(x || y || z) && translate(x || 0, y || 0, z || 0),
	// 	(skewX || skewY) && skew(skewX || 0, skewY || 0),
	// 	(scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) && scale(scaleX || 1, scaleY || 1, scaleZ || 1),
	// 	rotateX !== undefined && matrixRotateX(rotateX),
	// 	rotateY !== undefined && matrixRotateY(rotateY),
	// 	rotateZ !== undefined && matrixRotateZ(rotateZ),
	// ]);
	const matricies = array();
	matricies[0] = (x || y || z) ? translate(x || 0, y || 0, z || 0) : undefined;
	matricies[1] = (skewX || skewY) ? skew(skewX || 0, skewY || 0) : undefined;
	matricies[2] = (scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) ? scale(scaleX || 1, scaleY || 1, scaleZ || 1) : undefined;
	matricies[3] = rotateX !== undefined ? matrixRotateX(rotateX) : undefined;
	matricies[4] = rotateY !== undefined ? matrixRotateY(rotateY) : undefined;
	matricies[5] = rotateZ !== undefined ? matrixRotateZ(rotateZ) : undefined;
	const values = compose(matricies);
	const matrix = `matrix3d(${values.join(',')})`;
	matricies.free();
	values.free();
	return matrix;
};