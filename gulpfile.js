var gulp = require('gulp');
var Config = require('./gulpfile.config');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var inlineNg2Template = require('gulp-inline-ng2-template');

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true, outFile: "app.js", typescript: require('typescript') });
var config = new Config();

// --- DEV: gulp dev --- //
gulp.task('dev', ['dev:compile', 'dev:lib'], function() {
    gulp.watch(config.allSass, ['dev:sasstocss']);
    gulp.watch([config.allTypeScript, config.allHtml], ['dev:appts']);
});

gulp.task('dev:compile', ['dev:sasstocss', 'dev:appts']);

gulp.task('dev:sasstocss', function () {
    return gulp.src(config.allSass)
        .pipe(sass())
        .pipe(gulp.dest(config.cssOutputPath))
        .on('error', gutil.log);
});

gulp.task('dev:appts', ['ts-lint'], function() {
    var tsResult = gulp.src(config.allTypeScript) // instead of gulp.src(...)
        .pipe(inlineNg2Template({ base: '/app/dev' }))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.tsOutputPath))
        .on('err', gutil.log);
});

gulp.task('dev:lib', function() {
    return gulp.src(config.libFilesJS)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(config.libOutputPath))
        .on('err', gutil.log);
});


// --- PROD: gulp prod --- //
gulp.task('prod', ['prod:compile', 'prod:lib']);

gulp.task('prod:compile', ['prod:sasstocss', 'prod:appts']);

gulp.task('prod:sasstocss', function () {
    return gulp.src(config.allSass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(config.cssOutputPath))
        .on('error', gutil.log);
});

gulp.task('prod:appts', ['ts-lint'], function() {
    var tsResult = gulp.src(config.allTypeScript) // instead of gulp.src(...)
        .pipe(inlineNg2Template({ base: '/app/dev' }))
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(uglify())
        .pipe(gulp.dest(config.tsOutputPath))
        .on('err', gutil.log);
});

gulp.task('prod:lib', function() {
    return gulp.src(config.libFilesJS)
        .pipe(uglify())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(config.libOutputPath))
        .on('err', gutil.log);
});


// --- UTILS --- //
gulp.task('ts-lint', function() {
    return gulp.src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose'))
        .on('err', gutil.log);
});

gulp.task('clean', function() {
    var directories = [
        config.cssOutputPath,
        config.tsOutputPath
    ];

    return gulp.src(directories, {read: false})
        .pipe(vinylPaths(del))
        .on('err', gutil.log);
});