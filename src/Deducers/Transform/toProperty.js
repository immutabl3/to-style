export default function ToProperty(prefix) {
	return function toProperty(value) {
		return `${prefix}(${value})`;
	};
};