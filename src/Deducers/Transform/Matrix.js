import { degreesToRadians } from '@immutabl3/utils';
import mat from './mat.js';

// matrix transformations can be heavy beasts.
// in our case, we're optimizing for the composition
// step and using an array pool to eliminate what
// would otherwise be a decent amount of garbage
// collection (~10 arrays per matrix)
//
// the tradeoff is slower code in the basic benchmarks
// (still in the hundres of thousands of ops per second),
// but equivalent speed in real-life usage with more
// stable memory...but much messier code. the original
// code is preserved in the methods below in comments
// for understanding the code (and posterity in case
// we ever need to revert)
//
// this can be done because all matrix operations
// are synchronous and non-interactive...they turn
// into strings within toStyle

const { cos, sin, tan } = Math;

const blankMatrix = () => {
	// original code:
	// [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	const matrix = mat();
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};

export const rotateX = function(deg) {
	// original code:
	// return [
	// 	1,       0,        0,     0,
	// 	0,  cos(x),  -sin(x),     0,
	// 	0,  sin(x),   cos(x),     0,
	// 	0,       0,        0,     1,
	// ];
	const matrix = mat();
	const x = degreesToRadians(deg);
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = cos(x);
	matrix[6] = -sin(x);
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = sin(x);
	matrix[10] = cos(x);
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};

export const rotateY = function(deg) {
	const matrix = mat();
	const x = degreesToRadians(deg);
	// original code:
	// return [
	// 	 cos(x),   0, sin(x),   0,
	// 		 0,    1,      0,   0,
	// 	-sin(x),   0, cos(x),   0,
	// 		 0,    0,      0,   1,
	// ];
	matrix[0] = cos(x);
	matrix[1] = 0;
	matrix[2] = sin(x);
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = -sin(x);
	matrix[9] = 0;
	matrix[10] = cos(x);
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};

export const rotateZ = function(deg) {
	const matrix = mat();
	const x = degreesToRadians(deg);
	// original code:
	// return [
	// 	cos(x), -sin(x),    0,    0,
	// 	sin(x),  cos(x),    0,    0,
	// 		 0,       0,    1,    0,
	// 		 0,       0,    0,    1,
	// ];
	matrix[0] = cos(x);
	matrix[1] = -sin(x);
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = sin(x);
	matrix[5] = cos(x);
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};

export const translate = function(x, y, z) {
	const matrix = mat();
	// original code:
	// return [
	// 	1,    0,    0,   0,
	// 	0,    1,    0,   0,
	// 	0,    0,    1,   0,
	// 	x,    y,    z,   1,
	// ];
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = x;
	matrix[13] = y;
	matrix[14] = z;
	matrix[15] = 1;
	return matrix;
};

export const scale = function(x, y, z) {
	const matrix = mat();
	// original code:
	// return [
	//     x,    0,    0,   0,
	//     0,    y,    0,   0,
	//     0,    0,    z,   0,
	//     0,    0,    0,   1,
	// ];
	matrix[0] = x;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = y;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = z;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};

export const skew = function(x, y) {
	const matrix = mat();
	const a1 = degreesToRadians(x);
	const a2 = degreesToRadians(y);
	// original code:
	// return [
	//     1,       tan(a2),    0,   0,
	//     tan(a1),       1,    0,   0,
	//     0,             0,    1,   0,
	//     0,             0,    0,   1,
	// ];
	matrix[0] = 1;
	matrix[1] = tan(a2);
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = tan(a1);
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
	return matrix;
};

const multiply = function(a, b) { // eslint-disable-line
	const result = mat();
	
	// currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337
	const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3], // eslint-disable-line
		a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7], // eslint-disable-line
		a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11], // eslint-disable-line
		a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]; // eslint-disable-line

	// Cache only the current line of the second matrix
	let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3]; // eslint-disable-line
	result[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	result[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	result[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	result[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	result[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	result[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	result[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	result[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	result[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	result[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	result[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	result[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	result[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	result[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	result[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	result[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	// now that we have a new array of the two multiplied 
	// matricies, free the old matricies
	a.free();
	b.free();

	return result;
};

export default function compose(matrices) {
	let result = blankMatrix();

	const length = matrices.length;
	if (!length) return result;

	for (let idx = 0; idx < length; idx++) {
		result = multiply(result, matrices[idx]);
	}

	return result;
};