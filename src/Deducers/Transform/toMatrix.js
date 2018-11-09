import compose, {
	translate,
	skew,
	scale,
	rotateX as matrixRotateX,
	rotateY as matrixRotateY,
	rotateZ as matrixRotateZ,
} from './Matrix';

export default function toMatrix({
	x = 0,
	y = 0,
	z = 0,
	skewX = 0,
	skewY = 0,
	rotateX,
	rotateY,
	rotateZ,
	scaleX = 1,
	scaleY = 1,
	scaleZ = 1,
}) {
	const values = compose([
		(x || y || z) && translate(x, y, z),
		(skewX || skewY) && skew(skewX, skewY),
		(scaleX !== 1 || scaleY !== 1 || scaleZ !== 1) && scale(scaleX, scaleY, scaleZ),
		rotateX !== undefined && matrixRotateX(rotateX),
		rotateY !== undefined && matrixRotateY(rotateY),
		rotateZ !== undefined && matrixRotateZ(rotateZ),
	]);
	return `matrix3d(${values.join(',')})`;
};