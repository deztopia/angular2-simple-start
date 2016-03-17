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
var cleanCss = require('gulp-clean-css');
var inlineNg2Template = require('gulp-inline-ng2-template');

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true, outFile: "app.js", typescript: require('typescript') });
var config = new Config();

// --- DEV: gulp dev --- //
gulp.task('dev', ['dev:compile', 'dev:lib', 'dev:globalsass'], function() {
    gulp.watch([config.allTypeScript, config.allHtml, config.componentSass], ['dev:appts']);
    gulp.watch(config.globalSass, ['dev:globalsass']);
});

gulp.task('dev:compile', ['dev:appts']);

gulp.task('dev:componentsass', function () {
    return gulp.src(config.componentSass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(cleanCss())
        .pipe(gulp.dest(function(file) {
            return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
        }))
        .on('error', gutil.log);
});

gulp.task('dev:appts', ['dev:componentsass', 'ts-lint'], function() {
    var tsResult = gulp.src(config.allTypeScript) // instead of gulp.src(...)
        .pipe(inlineNg2Template({ base: '/app/dev', useRelativePaths: true }))
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

gulp.task('dev:globalsass', function() {
    return gulp.src(config.globalSass)
        .pipe(sass())
        .pipe(gulp.dest(config.globalCssOutputPath))
        .on('error', gutil.log);
});


// --- PROD: gulp prod --- //
gulp.task('prod', ['prod:compile', 'prod:lib', 'prod:globalsass']);

gulp.task('prod:compile', ['prod:appts']);

gulp.task('prod:componentsass', function () {
    return gulp.src(config.componentSass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(cleanCss())
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
        .on('error', gutil.log);
});

gulp.task('prod:appts', ['prod:componentsass', 'ts-lint'], function() {
    var tsResult = gulp.src(config.allTypeScript) // instead of gulp.src(...)
        .pipe(inlineNg2Template({ base: '/app/dev', useRelativePaths: true }))
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

gulp.task('prod:globalsass', function() {
    return gulp.src(config.globalSass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(cleanCss())
        .pipe(gulp.dest(config.globalCssOutputPath))
        .on('error', gutil.log);
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
        config.componentCssOutputFiles,
        config.tsOutputPath,
        config.globalCssOutputPath
    ];

    return gulp.src(directories, {read: false})
        .pipe(vinylPaths(del))
        .on('err', gutil.log);
});