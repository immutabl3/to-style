// https://stackoverflow.com/questions/9553354/how-do-i-get-the-decimal-places-of-a-floating-point-number-in-javascript
export default function precision(num) {
	let exp = 1;
	let count = 0;
	while (Math.round(num * exp) / exp !== num) {
		exp *= 10;
		count++;
	}
	return count;
};