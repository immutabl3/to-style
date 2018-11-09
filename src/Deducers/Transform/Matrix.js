import toRadians from '../../utils/toRadians';

const { cos, sin, tan } = Math;

const blankMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

export const rotateX = function(deg) {
	const x = toRadians(deg);
	return [
		1,       0,        0,     0, // eslint-disable-line
		0,  cos(x),  -sin(x),     0, // eslint-disable-line
		0,  sin(x),   cos(x),     0, // eslint-disable-line
		0,       0,        0,     1, // eslint-disable-line
	];
};

export const rotateY = function(deg) {
	const x = toRadians(deg);
	return [
		 cos(x),   0, sin(x),   0, // eslint-disable-line
			 0,    1,      0,   0, // eslint-disable-line
		-sin(x),   0, cos(x),   0, // eslint-disable-line
			 0,    0,      0,   1, // eslint-disable-line
	];
};

export const rotateZ = function(deg) {
	const x = toRadians(deg);
	return [
		cos(x), -sin(x),    0,    0, // eslint-disable-line
		sin(x),  cos(x),    0,    0, // eslint-disable-line
			 0,       0,    1,    0, // eslint-disable-line
			 0,       0,    0,    1, // eslint-disable-line
	];
};

export const translate = function(x, y, z) {
	return [
		1,    0,    0,   0, // eslint-disable-line
		0,    1,    0,   0, // eslint-disable-line
		0,    0,    1,   0, // eslint-disable-line
		x,    y,    z,   1, // eslint-disable-line
	];
};

export const scale = function(x, y, z) {
	return [
	    x,    0,    0,   0, // eslint-disable-line
	    0,    y,    0,   0, // eslint-disable-line
	    0,    0,    z,   0, // eslint-disable-line
	    0,    0,    0,   1, // eslint-disable-line
	];
};

export const skew = function(x, y) {
	const a1 = toRadians(x);
	const a2 = toRadians(y);
	return [
	    1,       tan(a2),    0,   0, // eslint-disable-line
	    tan(a1),       1,    0,   0, // eslint-disable-line
	    0,             0,    1,   0, // eslint-disable-line
	    0,             0,    0,   1, // eslint-disable-line
	];
};

const multiply = function(a, b) { // eslint-disable-line
	const result = [];
	
	// currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337
	let a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3], // eslint-disable-line
		a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7], // eslint-disable-line
		a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11], // eslint-disable-line
		a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]; // eslint-disable-line

	// Cache only the current line of the second matrix
	let b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3]; // eslint-disable-line
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

	return result;
};

export default function compose(matrices) {
	let result = blankMatrix;

	for (let idx = 0; idx < matrices.length; idx++) {
		if (!matrices[idx]) continue;
		result = multiply(result, matrices[idx]);
	}

	return result;
};