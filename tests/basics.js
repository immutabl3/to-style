import test from 'tape';
import toStyle from '../src';
import { isPlainObject, isFunction } from 'lodash-es';

test('function & creation', assert => {
	assert.ok(isFunction(toStyle));
	assert.ok(isFunction(toStyle.create));
	assert.ok(isFunction(toStyle.create()));

	assert.end();
});

test('calling', assert => {
	assert.throws(() => toStyle(), `not passing an object throws an error`);
	assert.doesNotThrow(() => toStyle({}), `can call toStyle with an object`);

	assert.end();
});

test('return value', assert => {
	assert.ok(isPlainObject(toStyle({})));

	assert.end();
});

test('definition mutation', assert => {
	const definition = { width: 1 };
	toStyle(definition);
	assert.is(definition.width, 1, `width has not been mutated`);
	assert.is(Object.keys(definition).length, 1, `no additional keys have been defined`);

	assert.end();
});

test('object mutation', assert => {
	let result;

	const definition = { width: 1 };
	const destination = {};
	result = toStyle(definition, destination);
	assert.is(destination.width, '1px', `added "width" to the destination`);
	assert.is(result, destination, `destination has same reference value as returned result`);
	
	definition.width = 2;
	result = toStyle(definition, destination);
	assert.is(destination.width, '2px', `added "width" to the destination`);
	assert.is(result, destination, `destination has same reference value as returned result`);
	
	assert.end();
});

test('large object', assert => {
	assert.doesNotThrow(() => {
		toStyle({
			content: '',
			display: 'block',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundImage: 'url(https://placehold.it/500x500?text=test)',
			backfaceVisibility: 'hidden',
			transition: 'all 300ms ease',
			opacity: 1.05,
			top: 0.001,
			left: 20.851,
			margin: [1, 1, 1, 1],
			padding: [1, 1, 1, 1],
			x: 1, 
			y: 1500.089,
			z: 20,
			rotateX: 2,
			rotateY: 2,
			rotateZ: 2,
			skewX: 10,
			skewY: 10,
			scaleX: 0,
			scaleY: 1,
			scaleZ: 0.5,
		});
	});

	assert.end();
});