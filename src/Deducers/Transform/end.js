export default function end(values) {
	return !values.length ? undefined : values.join(' ');
};