import test from 'tape';
import toStyle from '../src';

test('mutation: margin/padding', assert => {
	[
		'margin',
		'padding',
	].forEach(key => {
		let result;
		
		result = toStyle({ [key]: '1px 1px 1px 1px' });
		assert.is(result[key], '1px 1px 1px 1px', `${key}: does not mutate a string`);
		
		result = toStyle({ [key]: 1 });
		assert.is(result[key], '1px', `${key}: number to pixel value`);

		result = toStyle({ [key]: 987654321 });
		assert.is(result[key], '987654321px', `${key}: large values are allowed`);

		result = toStyle({ [key]: 1.8777 });
		assert.is(result[key], '1.9px', `${key}: values are rounded`);

		result = toStyle({ [key]: [1, 2, 3, 4] });
		assert.is(result[key], '1px 2px 3px 4px', `${key}: full array is turned into a series of values`);

		result = toStyle({ [key]: [0] });
		assert.is(result[key], '0', `${key}: length = 1 array is turned into a series of values`);

		result = toStyle({ [key]: [0, 1] });
		assert.is(result[key], '0 1px', `${key}: length = 2 array is turned into a series of values`);
		
		result = toStyle({ [key]: [0, 1, 2] });
		assert.is(result[key], '0 1px 2px', `${key}: length = 3 array is turned into a series of values`);
		
		result = toStyle({ [key]: [0, 1, 2, '3%'] });
		assert.is(result[key], '0 1px 2px 3%', `${key}: array with mixed values properly formats`);

		result = toStyle({ [key]: {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1,
		} });
		assert.is(result[key], '1px 1px 1px 1px', `${key}: an object is turned into a series of values`);

		result = toStyle({ [key]: {
			top: 1,
			right: '1%',
			bottom: '1%',
			left: 1,
		} });
		assert.is(result[key], '1px 1% 1% 1px', `${key}: an object is width mixed values propery formats`);

		result = toStyle({ [key]: {
			top: 1,
		} });
		assert.is(result[`${key}Top`], '1px', `${key}: partial object is turned into single value => "${key}Top"`);
	});

	assert.end();
});

test('mutation: size', assert => {
	const initialStyle = toStyle({ size: 1 });
	assert.is(initialStyle.hasOwnProperty('size'), false, `"size" key is not defined`);
	assert.is(initialStyle.width, '1px', `populated "width"`);
	assert.is(initialStyle.height, '1px', `populated "height"`);

	assert.end();
});
