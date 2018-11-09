export default function willChange(value) {
	// can't handle it if it's not an array
	if (!Array.isArray(value)) return value;
	
	return value.join(', ');
};