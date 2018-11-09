export default function flow(fns) {
	const { length } = fns;
	return function flow(value) {
		let idx = 0;
		let result = value;
		while (idx < length) {
			result = fns[idx](result);
			idx++;
		}
		return result;
	};
};