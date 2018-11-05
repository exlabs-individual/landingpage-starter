const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');
const reload = browserSync.reload;

gulp.task('sass',['vendorCss', 'sass_lint'], function() {
    return gulp.src("src/scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('serve', ['sass', 'fileinclude'], function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('sass_lint', lintCssTask = () => {
    const gulpStylelint = require('gulp-stylelint');
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
});

gulp.task('fileinclude', function() {
    gulp.src('src/*.html')
        .pipe(fileinclude())
        .pipe(gulp.dest('./dist'));
});

gulp.task('vendorCss', function () {
    return gulp
        .src([
            './src/scss/vendor/*.*'
        ])
        .pipe(gulp.dest('./dist/css/vendor/'));

});

gulp.task('dev', ['serve'], function(){
    gulp.watch('src/**/*.html', ['fileinclude', reload]);
    gulp.watch('src/**/*.scss', ['sass', reload]);
    gulp.watch('src/js/**/*.js', reload);
});

gulp.task('build',['sass','fileinclude']);

gulp.task('default', ['serve']);
