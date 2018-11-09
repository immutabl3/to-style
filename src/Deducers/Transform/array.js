const pool = [];

const free = function() {
	this.length = 0;
	pool.push(this);
};

const create = function() {
	const arr = [];
	arr.free = free;
	return arr;
};

const array = function() {
	if (pool.length) return pool.pop();
	
	return create();
};

array.size = () => pool.length;

// priming the pool
let idx = 9;
while (idx--) pool.push(create());

export default array;