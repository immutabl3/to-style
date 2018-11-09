import test from 'tape';
import toStyle from '../src';

test('configuration: transform3d', assert => {
	const initialStyle = toStyle({ x: 0 });
	assert.is(initialStyle.transform, 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)', `transforms by "matrix3d" by default`);

	const longToStyle = toStyle.create({ transform3d: false });
	const longStyle = longToStyle({ x: 0 });
	assert.is(longStyle.transform, 'translateX(0)', `transforms by "translateX" when 3d transformations are disabled`);

	assert.end();
});

test('configuration: perc/em/rem/rad', assert => {
	let results;

	results = toStyle({ width: 1 });
	assert.is(results.width, '1px', `"width" defaulted to "px"`);

	const percToStyle = toStyle.create({ units: { width: '%' } });
	results = percToStyle({ width: 1 });
	assert.is(results.width, '1%', `"width" defaulted to "%"`);

	const emToStyle = toStyle.create({ units: { width: 'em' } });
	results = emToStyle({ width: 1 });
	assert.is(results.width, '1em', `"width" defaulted to "em"`);

	const remToStyle = toStyle.create({ units: { width: 'rem' } });
	results = remToStyle({ width: 1 });
	assert.is(results.width, '1rem', `"width" defaulted to "rem"`);

	const degToStyle = toStyle.create({ transform3d: false });
	const degStyle = degToStyle({ rotateX: 1 });
	assert.is(degStyle.transform, 'rotateX(1deg)', `"transform" rotated by "1deg"`);

	const radToStyle = toStyle.create({ transform3d: false, units: { rotateX: 'rad' } });
	const radStyle = radToStyle({ rotateX: 1 });
	assert.is(radStyle.transform, 'rotateX(1rad)', `"transform" rotated by "1rad"`);

	assert.end();
});

test('format', assert => {
	[
		// opacity cannot be tested here as it
		// doesn't coerce to px values
		// see replacement's tests
		// 'opacity',
		'top',
		'right',
		'bottom',
		'left',
		'width',
		'height',
		'perspective',
		// willChange cannot be tested here as it
		// doesn't accept number/px values
		// see replacement's tests
		// 'willChange',
		'margin',
		'padding',
		// size cannot be tested here as it mutates.
		// see mutations' tests
		// 'size',
	].forEach((key, idx, collection) => {
		let result;
		
		result = toStyle({ [key]: 1 });
		assert.is(result[key], '1px', `${key}: formats`);

		const noFormatToStyle = toStyle.create({ format: { [key]: false } });
		result = noFormatToStyle({ [key]: 1 });
		assert.is(result[key], 1, `${key}: does not format`);
		
		result = noFormatToStyle({ [key]: Infinity });
		assert.is(result[key], Infinity, `${key}: can be an invalid type`);
		
		const foo = {};
		result = noFormatToStyle({ [key]: foo });
		assert.is(result[key], foo, `${key}: can pass an invalid type as a reference`);

		const otherKey = collection[idx + 1] || collection[0];
		result = noFormatToStyle({ [otherKey]: 1 });
		assert.is(result[otherKey], '1px', `${key}: "${otherKey}" still formats when "${key}" formatting is disabled`);
	});

	assert.end();
});