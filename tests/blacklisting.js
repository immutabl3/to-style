import test from 'tape';
import toStyle from '../src';

test('blacklist: default', assert => {
	assert.is(toString({ x: 1 }).hasOwnProperty('x'), false, `"x" is blacklisted by default`);
	assert.is(toString({ y: 1 }).hasOwnProperty('y'), false, `"y" is blacklisted by default`);

	assert.end();
});

test('blacklist: custom', assert => {
	assert.is(toStyle({ src: '' }).src, '', `"src" is whitelisted`);

	const ts = toStyle.create({ blacklist: ['src'] });
	assert.is(ts({ src: '' }).hasOwnProperty('src'), false, `"src" is blacklisted`);

	assert.end();
});