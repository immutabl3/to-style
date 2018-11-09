const pool = [];

const free = function(obj) {
	for (const key in obj) {
		obj[key] = undefined;
	}
	pool.push(obj);
};

const object = function(obj) {
	if (obj) return free(obj);
	if (pool.length) return pool.pop();
	return {};
};

object.size = () => pool.length;

// priming the pool
let idx = 1;
while (idx--) pool.push({});

export default object;