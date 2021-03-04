import test from 'tape';
import toStyle from '../src';
import array from '../src/Deducers/Transform/array';
import object from '../src/Deducers/Transform/object';
import range from 'lodash/range';

test('pooling: array', assert => {
	assert.is(Array.prototype.free, undefined, `haven't polluted array prototype`);

	const initialSize = array.size();
	range(5).forEach(idx => {
		const initialSize = array.size();
		toStyle({ x: 1, rotate: 3, scale: 2, skew: 1 });
		assert.is(initialSize, array.size(), `interation ${idx} is stable`);
	});
	assert.is(initialSize, array.size(), `pool is stable`);

	assert.end();
});

test('pooling: object', assert => {
	const initialSize = object.size();
	range(5).forEach(idx => {
		const initialSize = object.size();
		toStyle({ x: 1, rotate: 3, scale: 2, skew: 1 });
		assert.is(initialSize, object.size(), `interation ${idx} is stable`);
	});
	assert.is(initialSize, object.size(), `pool is stable`);

	assert.end();
});