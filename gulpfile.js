var gulp		= require('gulp'),
	util		= require('gulp-util'),
	gulpif		= require('gulp-if'),
	livereload	= require('gulp-livereload'),
	sass		= require('gulp-sass'),
	autoprefix	= require('gulp-autoprefixer'),
	minifycss	= require('gulp-minify-css'),
	csslint		= require('gulp-csslint'),
	jshint		= require('gulp-jshint'),
	gconcat		= require('gulp-concat'),
	uglify		= require('gulp-uglify'),
	watch		= require('gulp-watch');

var config = {
	production: false,
	raw_dir: 'raw',
	public_dir: 'public'
};

function getSrc(path) {
	return './' + config.raw_dir + (path || '');
}

function getDest(path) {
	return './' + config.public_dir + '/assets' + (path || '');
}

/**
 * SASS
 */

gulp.task('sass', function() {
	gulp.src(getSrc('/sass/main.scss'))
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gconcat('main.css'))
		.pipe(gulpif(config.production, minifycss()))
		.pipe(autoprefix('last 2 versions'))
		.pipe(gulp.dest(getDest('/css')));
});

gulp.task('css-lint', ['sass'], function() {
	gulp.src(getDest('/css/*.css'))
		.pipe(csslint({
			'adjoining-classes': false,
			'unique-headings': false,
			'qualified-headings': false,
			'compatible-vendor-prefixes': false,
			'box-sizing': false
		}))
		.pipe(csslint.reporter());
});

gulp.task('css', ['css-lint']);

/**
 * JS
 */

gulp.task('js-lint', function() {
	gulp.src(getSrc('/js/*.js'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', ['js-lint'], function() {
	gulp.src(getSrc('/js/*.js'))
		.pipe(gulpif(config.production, uglify()))
		.pipe(gconcat('main.js'))
		.pipe(gulp.dest(getDest('/js')));
});

/**
 * Watch
 */

gulp.task('watch', ['full'], function() {
	livereload.listen();

	watch(getSrc('/sass/**/*.scss'), function() {
		gulp.start('css');
		console.log('test');
	});

	watch(getSrc('/js/**/*'), function() {
		gulp.start('js');
	});

	watch([
		getDest('/css/**/*'),
		getDest('/js/**/*')
	], function(file) {
		livereload.changed(file.path);
	});
});

gulp.task('default', ['watch']);
gulp.task('full', ['css', 'js']);
