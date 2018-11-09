import test from 'tape';
import toStyle from '../src';

test('value inclusion', assert => {
	assert.is(toStyle({ src: 'foo' }).src, 'foo', `css key src is included`);
	assert.is(toStyle({ animation: undefined }).hasOwnProperty('animation'), false, `undefined css value does not create a key`);

	assert.end();
});

test('value exclusion', assert => {
	assert.is(toStyle({ foo: '' }).foo, undefined, `non-css key "foo" is excluded`);
	assert.is(toStyle({ Width: 1 }).Width, undefined, `Pascal-case key "Width" is excluded`);
	assert.is(toStyle({ 'block-size': 1 })['block-size'], undefined, `kebab-case key "blockSize" is excluded`);

	assert.end();
});