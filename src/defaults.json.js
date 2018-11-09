const PX = 'px';
const DEG = 'deg';
// by default, pixels should be close to 
// whole values...allow for 1 decimal spot
// as it's faily common for partial top/
// left/margin/etc...
const PX_PRECISION = 2;
// but other properties, like transform and 
// opacity can be more precise
const TRANSFORM_PRECISION = 3;

export default {
	transform3d: true,
	transformSize: true,
	blacklist: ['x', 'y'],
	format: {
		opacity: true,
		top: true,
		right: true,
		bottom: true,
		left: true,
		width: true,
		height: true,
		perspective: true,
		willChange: true,
		margin: true,
		padding: true,
		size: true,
	},
	units: {
		top: PX,
		right: PX,
		bottom: PX,
		left: PX,

		size: PX,

		width: PX,
		height: PX,

		margin: PX,
		padding: PX,

		x: PX,
		y: PX,
		z: PX,

		rotate: DEG,
		rotateX: DEG,
		rotateY: DEG,
		rotateZ: DEG,

		skew: DEG,
		skewX: DEG,
		skewY: DEG,

		perspective: PX,
	},
	precision: {
		opacity: TRANSFORM_PRECISION,
		
		top: PX_PRECISION,
		right: PX_PRECISION,
		bottom: PX_PRECISION,
		left: PX_PRECISION,
		
		size: PX_PRECISION,
		
		width: PX_PRECISION,
		height: PX_PRECISION,
		
		margin: PX_PRECISION,
		padding: PX_PRECISION,
		
		x: TRANSFORM_PRECISION,
		y: TRANSFORM_PRECISION,
		z: TRANSFORM_PRECISION,

		matrix: TRANSFORM_PRECISION,
		matrix3d: TRANSFORM_PRECISION,
		
		scale: TRANSFORM_PRECISION,
		scaleX: TRANSFORM_PRECISION,
		scaleY: TRANSFORM_PRECISION,
		scaleZ: TRANSFORM_PRECISION,
		
		rotate: TRANSFORM_PRECISION,
		rotateX: TRANSFORM_PRECISION,
		rotateY: TRANSFORM_PRECISION,
		rotateZ: TRANSFORM_PRECISION,

		skew: TRANSFORM_PRECISION,
		skewX: TRANSFORM_PRECISION,
		skewY: TRANSFORM_PRECISION,

		rotateX: TRANSFORM_PRECISION,
		rotateY: TRANSFORM_PRECISION,
		rotateZ: TRANSFORM_PRECISION,

		perspective: PX_PRECISION,
	},
};