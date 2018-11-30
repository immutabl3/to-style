import test from 'tape';
import toStyle from '../src';

test('transformation: default', assert => {
	const ts = toStyle.create({ units: { fontSize: '%' } });

	let result = ts({ fontSize: 12 });
	assert.is(result.fontSize, '12%', `assigning a unit applies the unit to the value`);
	
	result = ts({ fontSize: '12' });
	assert.is(result.fontSize, '12%', `a string can still have a unit applied`);
	
	result = ts({ fontSize: '12px' });
	assert.is(result.fontSize, '12px', `a string value does't get the unit applied`);
	
	assert.end();
});