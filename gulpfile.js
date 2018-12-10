const gulp = require('gulp');
const styles = require('./build/styles');
const markdown = require('gulp-markdown');

gulp.task('styles', function() {
	return styles.run({
		source: './styles/index.scss',
		dest: './public',
		map: './maps',
		file: 'site.css',
		watch: './styles/**/*.scss'
	});
});

gulp.task('watch',
	gulp.parallel(
		'styles'
	)
);

gulp.task('convert', function() {
	return gulp.src('README.md').pipe(markdown()).pipe(gulp.dest('public'));
});