import test from 'tape';
import toStyle from '../src';

test('replacement: opacity', assert => {
	let result;

	result = toStyle({ opacity: '1' });
	assert.is(result.opacity, '1', `does not alter strings`);
	
	result = toStyle({ opacity: 0.5 });
	assert.is(result.opacity, 0.5, `a valid number percent is passed through`);

	result = toStyle({ opacity: Infinity });
	assert.is(result.hasOwnProperty('opacity'), false, `"opacity" is not assigned for Inifinity`);

	result = toStyle({ opacity: NaN });
	assert.is(result.hasOwnProperty('opacity'), false, `"opacity" is not assigned for NaN`);

	result = toStyle({ opacity: -1 });
	assert.is(result.opacity, 0, `a negative number becomes 0`);

	result = toStyle({ opacity: 1.1 });
	assert.is(result.opacity, 1, `a percentage over 1 becomes 1`);

	result = toStyle({ opacity: 0.987654321 });
	assert.is(result.opacity, 0.988, `a percentage with too hight of a precision is truncated and rounded`);

	assert.end();
});

test('replacement: px values', assert => {
	[
		'top',
		'right',
		'bottom',
		'left',
		'width',
		'height',
		'perspective',
	].forEach(key => {
		let result;

		result = toStyle({ [key]: 1 });
		assert.is(result[key], '1px', `${key}: number turns into pixel value`);
		
		result = toStyle({ [key]: 1.111 });
		assert.is(result[key], '1.11px', `${key}: pixel values are truncated`);
		
		result = toStyle({ [key]: 1.891 });
		assert.is(result[key], '1.89px', `${key}: pixel values are rouned`);
		
		result = toStyle({ [key]: 0 });
		assert.is(result[key], '0', `${key}: zero is unitless`);
		
		result = toStyle({ [key]: 123456789 });
		assert.is(result[key], '123456789px', `${key}: large values are supported`);
	});

	assert.end();
});

test('replacement: willChange', assert => {
	let result;

	result = toStyle({ willChange: 'transform, opacity' });
	assert.is(result.willChange, 'transform, opacity', `"willChange" does not alter strings`);
	
	result = toStyle({ willChange: 123 });
	assert.is(result.willChange, 123, `"willChange" does not alter value, even if the value is invalid`);

	result = toStyle({ willChange: ['transform', 'opacity'] });
	assert.is(result.willChange, 'transform, opacity', `"willChange" joins an array`);

	result = toStyle({ willChange: ['transform', 1] });
	assert.is(result.willChange, 'transform, 1', `"willChange" joins an array, even if the array has invalid values`);
	
	assert.end();
});