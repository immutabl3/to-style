import test from 'tape';
import toStyle from '../src';

test('transformation: default', assert => {
	let result;
	
	result = toStyle({ transform: 'foo' });
	assert.is(result.transform, 'foo', `an assigned transform isn't altered`);
	
	result = toStyle({ transform: 'foo', x: 1 });
	assert.is(result.transform, 'foo', `an assigned transform isn't altered, even when conflicting with other properties`);

	result = toStyle({ translateX: 1 });
	assert.is(result.transform, 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1)', `transforming longhand results in a matrix transformation`);
	
	result = toStyle({ matrix: '1' });
	assert.is(result.transform, 'matrix(1)', `"matrix" is treated as a transform`);
	
	result = toStyle({ matrix: [1, 2, 3, 4, 5, 6] });
	assert.is(result.transform, 'matrix(1,2,3,4,5,6)', `passing an array as "matrix" formats the value`);

	result = toStyle({ matrix3d: '1' });
	assert.is(result.transform, 'matrix3d(1)', `"matrix3d" is treated as a transform`);
	
	result = toStyle({ matrix3d: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] });
	assert.is(result.transform, 'matrix3d(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)', `passing an array as "matrix3d" formats the value`);

	result = toStyle({ x: 1 });
	assert.is(result.transform, 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1)', `transforming shorthand results in a matrix transformation`);
	
	result = toStyle.create({ transform3d: false })({ x: 1 });
	assert.is(result.transform, 'translateX(1px)', `transforming shorthand works with transform3d = false`);
	
	result = toStyle.create({ transform3d: false })({ rotate: 2, x: 1, y: 1 });
	assert.is(result.transform, 'rotate(2deg) translateX(1px) translateY(1px)', `with transform3d = false, multiple properties are added to transform`);

	assert.end();
});

test('transformation: verbose', assert => {
	const ts = toStyle.create({ transform3d: false });

	[
		['rotate', 'rotate(1deg)'],
		['rotateX', 'rotateX(1deg)'],
		['rotateY', 'rotateY(1deg)'],
		['rotateZ', 'rotateZ(1deg)'],
		['skew', 'skew(1deg)'],
		['skewX', 'skewX(1deg)'],
		['skewY', 'skewY(1deg)'],
		['scale', 'scale(1)'],
		['scaleX', 'scaleX(1)'],
		['scaleY', 'scaleY(1)'],
		['scaleZ', 'scaleZ(1)'],
		['x', 'translateX(1px)'],
		['translateX', 'translateX(1px)'],
		['y', 'translateY(1px)'],
		['translateY', 'translateY(1px)'],
		['z', 'translateZ(1px)'],
		['translateZ', 'translateZ(1px)'],
	].forEach(([key, desiredResult]) => {
		const result = ts({ [key]: 1 });
		assert.is(result.transform, desiredResult);
	});

	assert.end();
});

test('transformation: zero-sum matrix scale', assert => {
	[
		['scale', 'matrix3d(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1)'],
		['scaleX', 'matrix3d(0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)'],
		['scaleY', 'matrix3d(1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1)'],
		['scaleZ', 'matrix3d(1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1)'],
	].forEach(([key, desiredResult]) => {
		const result = toStyle({ [key]: 0 });
		assert.is(result.transform, desiredResult);
	});

	assert.end();
});