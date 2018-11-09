import Benchmark from 'benchmark';
import toStyle from '../src';

const suite = new Benchmark.Suite();
const sideEffectsObj = {};

const basic = { opacity: 1 };
const matrix = { x: 1, y: 1500.089 };
const normal = { top: 0.001, left: 20.851, opacity: 1.05 };
const large = {
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
};

suite
	.add('basic', function() {
		toStyle(basic);
	})
	.add('matrix', function() {
		toStyle(matrix);
	})
	.add('no-side-effects', function() {
		toStyle(normal);
	})
	.add('side-effects', function() {
		toStyle(normal, sideEffectsObj);
	})
	.add('no-side-effects#large', function() {
		toStyle(large);
	})
	.add('side-effects#large', function() {
		toStyle(large, sideEffectsObj);
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.run({ async: true });