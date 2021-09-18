const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');

compileSass = () => {
    return gulp.src('./renderer/sass/style.scss')
        .pipe(plumber())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 version'] }))
        .pipe(postcss([
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer'),
        ]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./renderer'))
}

gulp.task('sass', (done) => {
    compileSass()
    done()
});

gulp.task('default', (done) => {
    gulp.watch('./renderer/sass/**/*.scss', ['sass']);
    gulp.watch('./tailwind.config.js', ['sass']);
    done()
});
