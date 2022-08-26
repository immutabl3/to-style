import test from 'tape';
import toStyle from '../src/index.js';

test('precision application', assert => {
	const ts = toStyle.create({ precision: { fontSize: 2 } });

	const result = ts({ fontSize: 12.123 });
	assert.is(result.fontSize, '12.12px', `assigning a precision applies the precision to the value`);
	
	assert.end();
});